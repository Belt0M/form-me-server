# Webowy Konstruktor Formularzy - Serwer (Back-End)

Ten projekt stanowi część mojej pracy dyplomowej, której celem było stworzenie narzędzia do bezkodowego tworzenia formularzy internetowych. Serwerowa aplikacja została stworzona z użyciem Node.js, Express oraz bazy danych PostgreSQL.

## Funkcje aplikacji

- **API RESTful**: Aplikacja serwerowa oferuje zestaw endpointów API do zarządzania formularzami, w tym tworzenie, aktualizowanie, usuwanie i pobieranie formularzy.
- **Baza danych PostgreSQL**: Dane formularzy są przechowywane w relacyjnej bazie danych PostgreSQL, co zapewnia wydajność i integralność danych.
- **Bezpieczeństwo danych**: Aplikacja implementuje podstawowe mechanizmy uwierzytelniania i autoryzacji, aby chronić dostęp do danych użytkowników.
- **Obsługa walidacji**: Serwer zapewnia walidację danych przed zapisaniem ich w bazie, co zwiększa jakość i spójność danych.

## Technologia

Projekt ten wykorzystuje następujące technologie:

- **Node.js**: Środowisko uruchomieniowe JavaScript na serwerze.
- **Express**: Framework do budowania aplikacji webowych w Node.js.
- **PostgreSQL**: Relacyjna baza danych używana do przechowywania danych formularzy.
- **Sequelize**: ORM (Object-Relational Mapping) do łatwego zarządzania bazą danych PostgreSQL w aplikacjach Node.js.
- **JWT (JSON Web Tokens)**: Mechanizm autoryzacji do bezpiecznego przesyłania danych między klientem a serwerem.
- **Dotenv**: Narzędzie do zarządzania zmiennymi środowiskowymi.

## Instalacja

Aby uruchomić aplikację serwerową lokalnie:

```
git clone https://github.com/Belt0M/form-me-server.git
cd form-me-server
code .
npm i
```

Utworz baze danych PostgreSQL za pomocą pgAdmin 4
Następnie dodaj .env plik do folder serwera wraz z następującą informacją

```
DATABASE_URL = "postgresql://username:password@localhost:5432/db-name?schema=public"
JWT_SECRET = 'your_jwt_secret_key'
```

Dalej wpisz w terminal:

```
npx prisma migrate dev --name init
npx ts-node src/index.ts
```




