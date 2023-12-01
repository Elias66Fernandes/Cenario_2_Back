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

//rota para criar os usuário
app.post("/user", async (req, res) => {
  try {
    const itemData = req.body;

    const novoItem = await prisma.user.create({
      data: {
        nome: itemData.nome, 
      },
    });
    res.send(novoItem);
  } catch (erro) {
    console.error("Erro ao criar item:", erro);
  }
});


// rota para listar todos os usuários
app.get("/user", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    //res.send(users);
    if (users.length > 0) return res.send(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
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
    if (user.length > 0) return res.send(user);
    return res.send("Usuário não encontrado");
  }catch (error) {
    console.error("Erro ao buscar um usuário pelo nome:", error);
  }
});

// Inicie o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});