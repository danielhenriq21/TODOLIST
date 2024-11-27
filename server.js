const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Banco de dados simples (em memória)
let tasks = [];

// Rotas
// Obter todas as tarefas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Adicionar uma nova tarefa
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (title) {
        const newTask = { id: Date.now(), title, completed: false };
        tasks.push(newTask);
        res.status(201).json(newTask);
    } else {
        res.status(400).json({ error: 'Título é obrigatório' });
    }
});

// Atualizar tarefa
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    const task = tasks.find(task => task.id == id);
    if (task) {
        if (title !== undefined) task.title = title; // Atualiza o título
        if (completed !== undefined) task.completed = completed; // Atualiza o status
        res.json(task);
    } else {
        res.status(404).json({ error: 'Tarefa não encontrada' });
    }
});

// Excluir uma tarefa
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id != id);
    res.status(204).send();
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
