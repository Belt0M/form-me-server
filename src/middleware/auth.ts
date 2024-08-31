import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export interface AuthenticatedRequest extends Request {
	userId?: number
}

export const authenticateToken = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization
	const token = authHeader && authHeader.split(' ')[1]

	if (!token) {
		return res.sendStatus(401)
	}

	jwt.verify(token, JWT_SECRET, (err, user: any) => {
		if (err) {
			return res.sendStatus(403)
		}

		req.userId = user.userId
		next()
	})
}
