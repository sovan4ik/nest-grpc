# NestJS gRPC Client–Server

## Overview
This repository contains two NestJS microservices that demonstrate basic **gRPC client–server communication**.

- **Producer Service** — gRPC server implementation  
- **Consumer Service** — gRPC client implementation  

Both services share the same `users.proto` contract.

---

## Services

### Producer Service
- Implements a gRPC server
- Exposes `UsersService`
- Listens for incoming gRPC requests

### Consumer Service
- Implements a gRPC client
- Connects to the Producer service
- Invokes gRPC methods and logs the response to the console

---

## Running the Services

### Install dependencies
```bash
npm ci
npm run start:dev
```
## Environment Configuration

The application uses environment variables for configuration.

An `.env.example` file is provided in the root of each service.  
It can be copied and used as a local development environment file.

```bash
cp .env.example .development.env
```

The application automatically loads this file in development mode.

## Environment typing

All environment variables are typed and extend the NodeJS namespace.
See _typings.d.ts_.

## Design Constraints

- The project is built around a schema-first and functional architecture.

- All request and domain types are derived from Zod schemas, and validation is enforced at the middleware layer before any business logic is executed.

- Business logic is implemented using pure functions and explicit data flow.

- MongoDB is accessed directly via the native driver without using an ORM.

---

## Modular Architecture

Both services follow a **modular NestJS architecture**.

Each module is isolated and self-contained, responsible for a single concern  
(e.g. gRPC client, gRPC server, transport configuration).

Modules typically expose:

- gRPC contracts and constants
- service implementations (business logic)
- transport bindings (gRPC client or server setup)

This approach makes it easy to:

- share gRPC contracts between services
- replace or extend transport layers without affecting core logic
- keep service boundaries clear and predictable
---

## Endpoints

### Consumer Service
- `GET /users` — invokes the gRPC client and returns the response from the Producer service

### Producer Service
- gRPC service is exposed on the main gRPC endpoint  
- No HTTP endpoints are provided

---

## Tech Stack

- Node.js
- NestJS
- gRPC
- TypeScript
- Joi