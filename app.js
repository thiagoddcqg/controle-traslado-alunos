const express = require('express');
const app = express();

const Usuario = require('./models/Usuario');

app.use(express.json());

app.get("/", async(req, res) => {
    res.send("Página inicial - Controle de Traslado de Alunos");
});

app.post("/cadastrar", async(req, res) => {
    // console.log(req.body);

    await Usuario.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso!"
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não cadastrado com sucesso!"
        })
    });
});

app.listen(8090, () => {
    console.log("Servidor iniciado na porta 8090: http://localhost:8090")
});