import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import express from 'express'
import jwt from 'jsonwebtoken'
import {AuthenticatedRequest, authenticateToken} from './middleware/auth'

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
	throw new Error('JWT_SECRET is not defined in the environment variables.')
}

app.post('/register', async (req, res) => {
	const {username, password} = req.body
	const hashedPassword = await bcrypt.hash(password, 10)
	try {
		const user = await prisma.user.create({
			data: {
				username,
				password: hashedPassword,
			},
		})
		const token = jwt.sign({userId: user.id}, JWT_SECRET)
		res.status(201).json({username: user.username, token})
	} catch (error) {
		res.status(400).json({error: 'Username already exists'})
	}
})

app.post('/login', async (req, res) => {
	const {username, password} = req.body
	const user = await prisma.user.findUnique({where: {username}})
	if (!user) {
		return res.status(404).json({error: 'User not found'})
	}
	const isPasswordValid = await bcrypt.compare(password, user.password)
	if (!isPasswordValid) {
		return res.status(401).json({error: 'Invalid password'})
	}
	const token = jwt.sign({userId: user.id}, JWT_SECRET)
	res.json({username: user.username, token})
})

app.post(
	'/forms',
	authenticateToken,
	async (req: AuthenticatedRequest, res) => {
		const {title, description, content} = req.body
		const userId = req.userId

		if (!userId) {
			return res.status(401).json({error: 'Unauthorized'})
		}

		const form = await prisma.form.create({
			data: {
				title,
				description,
				content,
				userId,
			},
		})
		res.status(201).json(form)
	}
)

app.get('/forms', authenticateToken, async (req: AuthenticatedRequest, res) => {
	const forms = await prisma.form.findMany({
		where: {
			userId: req.userId,
		},
	})
	res.json(forms)
})

app.get(
	'/forms/:id',
	authenticateToken,
	async (req: AuthenticatedRequest, res) => {
		const {id} = req.params
		const form = await prisma.form.findUnique({
			where: {id: Number(id), userId: req.userId},
		})
		if (!form) {
			return res.status(404).json({error: 'Form not found'})
		}
		res.json(form)
	}
)

app.put('/forms/:id', async (req, res) => {
	const {id} = req.params
	const {title, description, content} = req.body
	const form = await prisma.form.update({
		where: {id: Number(id)},
		data: {
			title,
			description,
			content,
		},
	})
	res.json(form)
})

app.delete('/forms/:id', async (req, res) => {
	const {id} = req.params
	await prisma.form.delete({where: {id: Number(id)}})
	res.status(204).end()
})

app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000')
})
