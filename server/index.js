//PERN stack todo list demo -- Postgres, Express, React and Node.js
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");
const port = 5000;


//middleware
app.use(cors());
app.use(express.json()); // allows to ger json data

// Routes //

app.get('/', (req, res) => {
    res.sendFile('pages/index.html', { root: __dirname });
})

// Create todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );
        res.json(newTodo);
        console.log(req.body)

    } catch (err) {
        console.error(err.message);
    }
})
// Read todo
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
        console.log(req.body)
    } catch (err) {
        console.error(err.message);
    }
})
//Get todo by ID
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todoById = await pool.query("SELECT * FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json(todoById.rows[0]);
        console.log(req.body)
    } catch (err) {
        console.error(err.message);
    }
})
// Update todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );
        res.json("Todo was updated");

    } catch (error) {
        console.log(err)
    }
})
// Delete todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json("Todo was deleted");
    } catch (error) {
        console.error(err.message);
    }
})





app.listen(port, () => {
    console.log("server listening on port " + port);
});


