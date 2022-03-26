import { Sequelize, DataTypes } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: process.env.DB_ADAPTER,
    host: process.env.DB_HOST,
});

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('\nMySQL: Connected to todomvc');
    } catch (e) {
        console.error(chalk.red(e));
        process.exit(1);
    }
};

const Todo = sequelize.define('todo', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    timestamps: false,
});

export {
    connectDb,
    Todo,
};
