const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const usuario = require('./models/Usuario');
const veiculo = require('./models/Veiculo');
const destino = require('./models/Destino');

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.json());

// Rotas
app.get("/", async(req, res) => {
    res.render('login');
});

app.get("/dashboard", function(req, res) {
    res.render('dashboard');
});

app.get("/cad-usuario", function(req, res) {
    res.render('cad-usuario');
});

app.get("/cad-veiculo", function(req, res) {
    res.render('cad-veiculo');
});

app.get("/cad-destino", function(req, res) {
    res.render('cad-destino');
});

app.post("/add-usuario", function(req, res) {
    // res.send("Nome: " + req.body.nome + 
    //          "<br>Tipo: " + req.body.tipo + 
    //          "<br>Login: " + req.body.login + 
    //          "<br>Senha: " + req.body.senha + 
    //          "<br>")
    usuario.create({
        nome: req.body.nome,
        tipo: req.body.tipo,
        login: req.body.login,
        senha: req.body.senha
    }).then(function(){
        // res.send("Usuário cadastrado com sucesso!")
        res.redirect('/dashboard')
    }).catch(function(erro){
        res.send("Erro: Usuário não cadastrado com sucesso!" + erro)
    })
});

app.post("/add-veiculo", function(req, res) {
    veiculo.create({
        descricao: req.body.descricao,
        ocupacao_max: req.body.ocupacao_max
    }).then(function(){
        // res.send("Veículo cadastrado com sucesso!")
        res.redirect('/dashboard')
    }).catch(function(erro){
        res.send("Erro: Veículo não cadastrado com sucesso!" + erro)
    })
});

app.post("/add-destino", function(req, res) {
    destino.create({
        nome: req.body.nome,
        sigla: req.body.sigla
    }).then(function(){
        // res.send("Destino cadastrado com sucesso!")
        res.redirect('/dashboard')
    }).catch(function(erro){
        res.send("Erro: Destino não cadastrado com sucesso!" + erro)
    })
});

app.listen(8090, () => {
    console.log("Servidor iniciado na porta 8090: http://localhost:8090")
});