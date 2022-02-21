const express = require('express');
const mysql = require('mysql');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const usuario = require('./models/Usuario');
const veiculo = require('./models/Veiculo');
const destino = require('./models/Destino');

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
const encoder = bodyParser.urlencoded();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.json());
app.use("/assets",express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "controle_traslado_alunos"
});

// Conectar ao banco de dados
connection.connect(function(error){
    if (error) throw error
    else console.log("Conexão com o banco de dados realizada com sucesso!")
});

// Rotas
app.post("/log-admin", encoder, function(req, res) {
    var login_admin = req.body.login;
    var senha_admin = req.body.senha;

    connection.query("select * from usuarios where login = ? and senha = ?",[login_admin, senha_admin], function(error, results, fields){
        if (results.length > 0) {
            res.redirect("/dashboard-admin");
        } else {
    var login = req.body.login;
            res.redirect("/login-admin");
        }
        res.end();
    })
})

app.post("/log-aluno", encoder, function(req, res) {
    var login_aluno = req.body.login;
    var senha_aluno = req.body.senha;

    connection.query("select * from usuarios where login = ? and senha = ?",[login_aluno, senha_aluno], function(error, results, fields){
        if (results.length > 0) {
            res.redirect("/dashboard-aluno");
        } else {
    var login = req.body.login;
            res.redirect("/login-aluno");
        }
        res.end();
    })
})

app.get("/", function(req, res) {
    res.render("inicio");
});

app.get("/sol-translado", function(req, res) {
    res.render("sol-translado");
});

app.get("/login-admin", function(req, res) {
    res.render('login-admin');
});

app.get("/login-aluno", function(req, res) {
    res.render('login-aluno');
});

app.get("/dashboard-aluno", function(req, res) {
    res.render('dashboard-aluno');
});

app.get("/dashboard-admin", function(req, res) {
    res.render('dashboard-admin');
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

app.get("/teste", function(req, res) {
    res.render('teste');
});

app.post("/add-traslado", function(req, res) {
    // ???
});

app.post("/add-usuario", function(req, res) {
    usuario.create({
        nome: req.body.nome,
        tipo: req.body.tipo,
        login: req.body.login,
        senha: req.body.senha
    }).then(function(){
        res.redirect('/dashboard-admin')
    }).catch(function(erro){
        res.send("Erro: Usuário não cadastrado com sucesso!" + erro)
    })
});

app.post("/add-veiculo", function(req, res) {
    veiculo.create({
        descricao: req.body.descricao,
        ocupacao_max: req.body.ocupacao_max
    }).then(function(){
        res.redirect('/dashboard-admin')
    }).catch(function(erro){
        res.send("Erro: Veículo não cadastrado com sucesso!" + erro)
    })
});

app.post("/add-destino", function(req, res) {
    destino.create({
        nome: req.body.nome,
        sigla: req.body.sigla
    }).then(function(){
        res.redirect('/dashboard-admin')
    }).catch(function(erro){
        res.send("Erro: Destino não cadastrado com sucesso!" + erro)
    })
});

app.listen(8090, () => {
    console.log("Servidor iniciado na porta 8090: http://localhost:8090")
});