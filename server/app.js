import chalk from 'chalk';
import express from 'express';
import { connectDb, Todo } from './db/index.js';
import cors from 'cors';
import 'dotenv/config';

function verifyArgs() {
    const environment = process.env.ENVIRONMENT;

    if (!(environment === 'local' || environment === 'prod')) {
        console.error(chalk.red("Please specify either 'local' or 'prod'"));
        process.exit(1);
    }
}

async function startApp() {
    await connectDb();

    const app = express();
    app.use(cors());
    app.use(express.json({ limit: '5000kb' }));

    app.get('/todos', async (req, res) => {
        const todos = await Todo.findAll();

        // Doing this because I'm too lazy to modify the client to use id instead of _id which was designed for MongoDB
        const data = todos.map(todo => {
            return {
                _id: todo.id,
                name: todo.name,
                completed: todo.completed,
            }
        })

        res.status(200).send({ message: 'OK', data: data });
    });

    app.post('/todos/create', async (req, res) => {
        console.log(chalk.green('Request Received: Create\n'));

        const data = req.body;

        const result = await Todo.create(data);

        res.status(201).send({ message: 'OK', data: result });
    });

    app.patch('/todos/update', async (req, res) => {
        console.log(chalk.green('Request Received: Update\n'));

        const data = req.body;
        const todoId = data._id;

        delete data._id;

        const result = await Todo.update(data, { where: { id: todoId }});

        res.status(201).send({ message: 'OK', data: result });
    });

    app.delete('/todos/delete/:todoId', async (req, res) => {
        console.log(chalk.green('Request Received: Delete\n'));

        const todoId = req.params.todoId;

        const result = await Todo.destroy({ where: { id: todoId } });

        res.status(201).send({ message: 'OK', data: result });
    });

    app.listen(3000, () => {
        console.log(chalk.bgGreen.black('\nApp Started: http://localhost:3000\n'));
    });
}


verifyArgs();
startApp();
