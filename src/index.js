//importações necessárias para o projeto
require('dotenv').config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

//configurações para o servidor
app.use(bodyParser.json());
app.use(cors());

//rota para criar um item
app.post("/user", async (req, res) => {
  const data = req.body;
  await prisma.user.create({
    data: {
      nome: data.nome,
    },
  });
  return res.sendStatus(201);
});

// rota para listar todos os usuários
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).send("Erro interno do servidor");
  }
});

// rota para buscar um usuário pelo nome
app.get("/user/:nome", async (req, res) => {
  const { nome } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { nome },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("Usuário não encontrado");
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).send("Erro interno do servidor");
  }
});

// Inicie o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});