# controle-traslado-alunos
~~Controle de Traslado de Alunos entre Campus da Faculdade.~~

O mesmo deverá possuir:

- "cadastro de usuários" ('nome', 'login', 'senha' e 'tipo de usuário' {enum: 'administração', 'aluno'});
- "cadastro de veículos" ('descrição' e 'ocupação máxima');
- "cadastro de destinos" (nome e sigla); e
- "solicitação de traslado" ('data desejada', 'turno desejado', 'destino desejado' e 'veículo').

O projeto deverá permitir que os usuários cadastrados se conectem ao sistema.

Ao conectar, caso o tipo de usuário seja "administração", o mesmo poderá acessar as telas de "cadastro de usuários", "cadastro de veículos" e "cadastro de destinos".

Ao conectar, caso o tipo de usuário seja "aluno", o mesmo poderá acessar a tela de "solicitação de traslado", preencher/selecionar os campos (todos obrigatórios) e clicar em CONFIRMAR.

O sistema não deverá permitir mais solicitações do que o veículo suporte para um destino, data e turno.  Caso o veículo já esteja lotado para a data, turno e destino selecionados, o tal veículo não deverá aparecer para ser selecionado/escolhido.

O sistema não deverá permitir solicitações em duplicidade de usuário/aluno para o mesmo dia, turno e destino.  Não deverá permitir que o usuário/aluno realize duas solicitações para destinos diferentes na mesma data e turno.

Estes são os requisitos mínimos.  Qualquer conteúdo além disto será considerado um diferencial.
