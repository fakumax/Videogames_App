# Videogames App

<p align="right">
  <img height="200" src="./videogame.png" />
</p>

## Stack

- **Frontend**: React 19, Redux, React Router v7, Vite
- **Backend**: Node.js 22, Express
- **Database**: PostgreSQL (Neon)
- **ORM**: Sequelize

## Setup

### Requisitos

- Node.js 22+
- pnpm
- Cuenta en [Neon](https://neon.tech)
- API Key de [RAWG](https://rawg.io/apidocs)

### Instalación

```bash
pnpm install
```

### Variables de entorno

Crear archivos `.env` en `api/` y `client/` basados en los `.env.example`.

### Desarrollo

```bash
cd api && pnpm dev
cd client && pnpm dev
```

El cliente corre en `http://localhost:3000` y el API en `http://localhost:3001`.
