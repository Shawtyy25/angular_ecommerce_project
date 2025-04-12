import express from "express"
import path from "path"
import cors from "cors"
import pkg from "pg"
import dotenv from "dotenv"

dotenv.config({path: './client.env'});

const _dirname = path.resolve();

const app = express();
const port = process.env.PORT || 3300;

app.use(cors());
app.use(express.json());

const { Client } = pkg;

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: `${process.env.DB_PASSWORD}`,
    port: process.env.DB_PORT,
});

async function connectToDB() {
    try {
        await client.connect();
        console.log('Successfully connected to database!');
    } catch (e) {
        console.error('Error connecting to database!', e);
        process.exit(1);
    }
}

connectToDB();

const angularPath = path.join(_dirname, '../ecommerce/src');
app.use(express.static(angularPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(angularPath, 'index.html'));
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})