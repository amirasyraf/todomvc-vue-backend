import chalk from 'chalk';
import express from 'express';
import connectDb from './db/mongodb.js';
import { ObjectId } from 'mongodb';
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
    const db = await connectDb();
    const Todo = db.collection('todos');

    const app = express();
    app.use(cors());
    app.use(express.json({ limit: '5000kb' }));

    app.get('/todos', async (req, res) => {
        const todos = await Todo.find({}).toArray();

        res.status(200).send({ message: 'OK', data: todos });
    });

    app.post('/todos/create', async (req, res) => {
        console.log(chalk.green('Request Received: Create\n'));

        const data = req.body;

        const result = await Todo.insertOne(data);

        res.status(201).send({ message: 'OK', data: result });
    });

    app.patch('/todos/update', async (req, res) => {
        console.log(chalk.green('Request Received: Update\n'));

        const data = req.body;
        const todoId = new ObjectId(data._id);

        delete data._id;

        const result = await Todo.findOneAndUpdate({ _id: todoId }, {
            $set: data,
        });

        res.status(201).send({ message: 'OK', data: result });
    });

    app.delete('/todos/delete/:todoId', async (req, res) => {
        console.log(chalk.green('Request Received: Delete\n'));

        const todoId = new ObjectId(req.params.todoId);

        const result = Todo.findOneAndDelete({ _id: todoId });

        res.status(201).send({ message: 'OK', data: result });
    });

    app.listen(3000, () => {
        console.log(chalk.bgGreen.black('\nApp Started: http://localhost:3000\n'));
    });
}


verifyArgs();
startApp();
