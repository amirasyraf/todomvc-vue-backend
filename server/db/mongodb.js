import { MongoClient } from 'mongodb';
import 'dotenv/config';

const connectDb = async () => {
    const mongoUri = 'mongodb://${DB_HOST}';
    const client = new MongoClient(mongoUri);

    try {
        await client.connect();
        console.log('\nMongoDB: Connected to todomvc');

        return client.db('todomvc');
    } catch (e) {
        console.error(chalk.red(e));
        process.exit(1);
    }
};

export default connectDb;
