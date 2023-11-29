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
app.post("/public/user", async (req, res) => {
  try {
    const itemData = req.body;

    const novoItem = await prisma.user.create({
      data: {
        nome: itemData.nome, 
      },
    });
    res.json(novoItem);
  } catch (erro) {
    console.error("Erro ao criar item:", erro);
    res.status(500).send("Erro interno do servidor"); 
  }
});

/*
// rota para listar todos os usuários
app.get("/user", async (res) => {
  try {
    const users = await prisma.user.findMany();
    if (users.length > 0) return res.status(200).send(users);
    return res.send("Usuários não encontrados");
  } catch (error) {
    console.error("Erro ao listar todos os usuários:", error);
    res.status(500).send("Erro interno do servidor");
  }
});

// rota para buscar um usuário pelo nome
app.get("/user/:nome", async (req, res) => {
  try{
    const nome = req.params.nome;
    const user = await prisma.user.findMany({
      where: {
        nome: nome,
      },
    });
    if (user.length > 0) return res.status(200).send(user);
    return res.send("Usuário não encontrado");
  }catch (error) {
    console.error("Erro ao buscar um usuário pelo nome:", error);
    res.status(500).send("Erro interno do servidor");
  }
}); */

// Inicie o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});