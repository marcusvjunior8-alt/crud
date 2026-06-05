/* Importa o Express, que cria o servidor. */
const express = require("express")
/* Importa a lista de alunos do arquivo dados.js. */
const alunos = require("./dados")
/* Cria a aplicação Express. */
const app = express()
/* Define a porta do servidor. */
const PORT = 5000
/* Permite receber dados em formato JSON */
app.use(express.json())
/* Libera os arquivos da pasta public para o navegador. */
app.use(express.static("public"))

/* READ - Listar alunos */
/* Quando alguém acessar /alunos, retorna a lista de alunos. */
app.get("/alunos", (req, res) => {
    res.json(alunos)
})
/* CREATE - cadastrar alunos */
/* Cria um novo aluno. */
app.post("/alunos", (req, res) => {
    const novoAluno = {
        /* Gera um ID único usando a data e hora atual. */
        id: Date.now(),
        /* Recebe os dados enviados pelo usuário. */
        nome: req.body.nome,
        curso: req.body.curso,
        idade: req.body.idade
    }
    /* Adiciona o aluno na lista. */
    alunos.push(novoAluno)
    /* Retorna o aluno criado. */
    res.json(novoAluno)
})
/* UPDATE - atualizar alunos */
app.put("/alunos/:id", (req, res) => {
    /* Pega o ID da URL. */
    const id = Number(req.params.id)
    /* Procura o aluno na lista. */
    const aluno = alunos.find(a => a.id === id)
    /* Verifica se o aluno existe. */
    if (!aluno) {
        return res.status(404).json({ mensagem: "Aluno não encontrado" })
    }
    /* Atualiza os dados. */
    aluno.nome = req.body.nome
    aluno.curso = req.body.curso
    aluno.idade = req.body.idade
    /* Retorna o aluno atualizado. */
    res.json(aluno)
})
/* DELETE - excluir aluno */
/* Exclui um aluno pelo ID. */
app.delete("/alunos/:id", (req, res) => {
    const id = Number(req.params.id)
    /* Procura a posição do aluno na lista */
    const indice = alunos.findIndex(a => a.id === id)

    if (indice === -1) {
        return res.status(404).json({ mensagem: "Aluno não encontrado" })
    }
    /* Remove o aluno da lista. */
    alunos.splice(indice, 1)
    /* Retorna uma mensagem de sucesso. */
    res.json({ mensagem: "Aluno excluído com sucesso" })
})
/* Inicia o servidor na porta 3000. */
app.listen(PORT, () => {
    /* Mostra no terminal que o servidor está funcionando. */
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})