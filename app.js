const express = require('express');
const mysql = require('mysql');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const moment = require('moment')
const usuario = require('./models/Usuario');
const veiculo = require('./models/Veiculo');
const destino = require('./models/Destino');
const solicitacao = require('./models/Solicitacao');
const encoder = bodyParser.urlencoded();

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    }
}));
app.set('view engine', 'handlebars');
app.use('/favicon.ico', express.static('assets/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.json());
app.use("/assets", express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "controle_traslado_alunos"
});

// Conectar ao banco de dados
connection.connect(function (error) {
    if (error) throw error
    else console.log("Conexão com o banco de dados realizada com sucesso!")
});

// Rotas
app.get("/lis-solicitacoes", function (req, res) {
    solicitacao.findAll({ order: [['id', 'DESC']] }).then(function (solicitacoes) {
        res.render('lis-solicitacoes', { solicitacoes });
    })
});

app.get("/lis-veiculos", function (req, res) {
    veiculo.findAll({ order: [['id', 'DESC']] }).then(function (veiculos) {
        res.render('lis-veiculos', { veiculos });
    })
});

// Administrador = tipo 1
app.post("/log-admin", encoder, function (req, res) {
    var login_admin = req.body.login;
    var senha_admin = req.body.senha;

    connection.query("select * from controle_traslado_alunos.usuarios where tipo = 1 and login = ? and senha = ?;",
        [login_admin, senha_admin], function (error, results, fields) {
            if (results.length > 0) {
                res.redirect("/dashboard-admin");
            } else {
                res.redirect("/login-admin");
            }
            res.end();
        })
})

// Aluno = tipo 2
app.post("/log-aluno", encoder, function (req, res) {
    var login_aluno = req.body.login;
    var senha_aluno = req.body.senha;

    connection.query("select * from controle_traslado_alunos.usuarios where tipo = 2 and login = ? and senha = ?;", [login_aluno, senha_aluno], function (error, results, fields) {
        if (results.length > 0) {
            res.redirect("/dashboard-aluno");
        } else {
            res.redirect("/login-aluno");
        }
        res.end();
    })
})

app.get("/", function (req, res) {
    res.render("inicio");
});

app.get("/login-admin", function (req, res) {
    res.render('login-admin');
});

app.get("/login-aluno", function (req, res) {
    res.render('login-aluno');
});

app.get("/dashboard-aluno", function (req, res) {
    res.render('dashboard-aluno');
});

app.get("/dashboard-admin", function (req, res) {
    res.render('dashboard-admin');
});

app.get("/cad-usuario", function (req, res) {
    res.render('cad-usuario');
});

app.get("/cad-veiculo", function (req, res) {
    res.render('cad-veiculo');
});

app.get("/cad-destino", function (req, res) {
    res.render('cad-destino');
});

app.get("/cad-solicitacao", function (req, res) {
    res.render("cad-solicitacao");
});

app.post("/add-solicitacao", function (req, res) {
    var usuarioId = req.body.usuarioId;
    var data = req.body.data;
    var turno = req.body.turno;
    var destinoId = req.body.destinoId;
    var veiculoId = req.body.veiculoId;

    // Usuário duplicado
    connection.query("select * from controle_traslado_alunos.solicitacoes where usuarioId = ? and data = ? and turno = ?;",
        [usuarioId, data, turno], function (error1, results1, fields1) {
            if (results1.length > 0) {
                // Não prossegue
                res.send("Erro: Usuário duplicado! " + error1)
                // res.redirect('/cad-solicitacao')
            } else {
                // Prosseguir com o cadastro
                connection.query("select * from controle_traslado_alunos.solicitacoes where data = ? and turno = ? and destinoId = ? and veiculoId = ?;", [data, turno, destinoId, veiculoId], function (error2, results2, fields2) {
                    connection.query("select ocupacao_max from controle_traslado_alunos.veiculos where id = ?;", [veiculoId], function (error3, results3, fields3) {
                        if (results2.lenght < results3.ocupacao_max) {
                            solicitacao.create({
                                usuarioId: req.body.usuarioId,
                                data: req.body.data,
                                turno: req.body.turno,
                                destinoId: req.body.destinoId,
                                veiculoId: req.body.veiculoId
                            }).then(function () {
                                res.redirect('/dashboard-aluno')
                            }).catch(function (erro) {
                                res.send("Erro: Solicitação não cadastrada com sucesso! " + erro)
                            })
                        } else {
                            res.redirect('/cad-solicitacao')
                        }
                    })
                })
            }
        })
});

app.post("/add-usuario", function (req, res) {
    usuario.create({
        nome: req.body.nome,
        tipo: req.body.tipo,
        login: req.body.login,
        senha: req.body.senha
    }).then(function () {
        res.redirect('/dashboard-admin')
    }).catch(function (erro) {
        res.send("Erro: Usuário não cadastrado com sucesso!" + erro)
    })
});

app.post("/add-veiculo", function (req, res) {
    veiculo.create({
        descricao: req.body.descricao,
        ocupacao_max: req.body.ocupacao_max
    }).then(function () {
        res.redirect('/dashboard-admin')
    }).catch(function (erro) {
        res.send("Erro: Veículo não cadastrado com sucesso!" + erro)
    })
});

app.post("/add-destino", function (req, res) {
    destino.create({
        nome: req.body.nome,
        sigla: req.body.sigla
    }).then(function () {
        res.redirect('/dashboard-admin')
    }).catch(function (erro) {
        res.send("Erro: Destino não cadastrado com sucesso!" + erro)
    })
});

app.listen(8090, () => {
    console.log("Servidor iniciado na porta 8090: http://localhost:8090")
});