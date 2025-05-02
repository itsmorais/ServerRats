# 🐭 ServerRats
## StudyRats API Backend - ENG

> ✨ Official backend API for StudyRats.
> A social platform that turns your study routine into a collaborative game.
> 🔒 Implements JWT authentication, study groups, session logs, and leaderboard rankings.

---

## 🚀 Technologies and Tools

* **Node.js** (ESM)
* **TypeScript**
* **Express**
* **Prisma ORM** + **PostgreSQL**
* **Zod** (validation)
* **JWT** (authentication)
* **Cloudinary** (image upload)
* **Vitest** (unit testing)
* **Tsup** (optimized ESM build)
* **PM2** (production with optional Docker)
* **Winston** (logger)

---

## 🧱 Project Architecture

```
src/
├── http/
│   ├── controllers/
│   ├── routes/
│   └── middlewares/
├── repositories/
│   ├── PrismaXRepository.ts
│   ├── InMemoryXRepository.ts
│   └── interfaces
├── use-cases/
│   ├── factories/
│   └── errors/
├── services/
├── database/
├── env/
├── utils/
├── validators/
└── server.ts
```

> 💡 Layered architecture focused on SOLID principles: controllers, use-cases, repositories, services.

---

## ☁️ Deployment (Railway or other platforms)

This project is ready for deployment on:

* **Railway**
* **Render**
* **Fly.io**
* **Docker (optional)**

> The ESM build and `.env` structure make it easy to deploy with managed databases (e.g., Railway PostgreSQL).

---

## 🧑‍💻 Author

Developed with ☕ by [Michael Morais](https://github.com/itsmorais)

---
# 🐭 ServerRat
## StudyRats API Backend: PR-BR

> ✨ API backend oficial do StudyRats – uma plataforma social para transformar sua rotina de estudos em um jogo colaborativo.
> 🔒 Implementa autenticação com JWT, grupos de estudo, logs de sessões e ranking de participantes.

---

## 🚀 Tecnologias e Ferramentas

* **Node.js** (ESM)
* **TypeScript**
* **Express**
* **Prisma ORM** + **PostgreSQL**
* **Zod** (validações)
* **JWT** (autenticação)
* **Cloudinary** (upload de imagens)
* **Vitest** (testes unitários)
* **Tsup** (build ESM otimizado)
* **PM2** (produção com Docker opcional)
* **Winston** (logger)

---

## 🧱 Arquitetura

```
src/
├── http/
│   ├── controllers/
│   ├── routes/
│   └── middlewares/
├── repositories/
│   ├── PrismaXRepository.ts
│   ├── InMemoryXRepository.ts
│   └── interfaces
├── use-cases/
│   ├── factories/
│   └── errors/
├── services/
├── database/
├── env/
├── utils/
├── validators/
└── server.ts
```

> 💡 Estrutura em **camadas separadas** com foco em SOLID: controllers, use-cases, repositories, services.

---

## ☁️ Deploy no Railway (ou outra plataforma)

Este projeto está pronto para deploy com:

* **Railway**
* **Render**
* **Fly.io**
* **Docker (opcional)**

> O build ESM e a estrutura de variáveis `.env` facilitam o deploy contínuo com banco gerenciado (ex: PostgreSQL no Railway).

## 🧑‍💻 Autor

Desenvolvido com ☕ por [Michael Morais](https://github.com/itsmorais)

---
