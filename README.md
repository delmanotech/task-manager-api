# Task Manager API

## Descrição

A **Task Manager API** é uma API RESTful construída com Node.js, Express, e MongoDB, que permite criar, atualizar, deletar e listar projetos e tarefas. A API é protegida por autenticação JWT e é documentada utilizando Swagger.

## Funcionalidades

- Registro e autenticação de usuários
- CRUD de projetos
- CRUD de tarefas
- Documentação interativa da API com Swagger

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Swagger para documentação
- Jest e Supertest para testes

## Instalação

### Pré-requisitos

- Node.js v20.x
- MongoDB

### Passos para Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/task-manager-api.git
cd task-manager-api
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Execute a aplicação em modo de desenvolvimento:

```bash
npm start
```

5. Acesse a documentação da API:
   Abra o navegador e vá para http://localhost:5000/api-docs para acessar a documentação interativa da API.

Scripts Disponíveis

    start: Inicia a aplicação em modo de desenvolvimento.
    build: Compila o código TypeScript para JavaScript.
    serve: Inicia a aplicação usando o código compilado.
    test: Executa os testes unitários e de integração.
    test:watch: Executa os testes em modo de observação.
