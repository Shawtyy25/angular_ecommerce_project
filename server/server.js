import express from "express"
import path from "path"
import cors from "cors"
import pkg from "pg"
import dotenv from "dotenv"

let loggedInUser;

dotenv.config({path: './client.env'});

const _dirname = path.resolve();

const app = express();
const port = process.env.PORT || 3300;

app.use(cors());
app.use(express.json());

const {Client} = pkg;

const client = new Client({
    user: process.env.DB_USER,
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

const angularPath = path.join(_dirname, '../ecommerce/dist/ecommerce/browser');
app.use(express.static(angularPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(angularPath, 'index.html'));
})

// API ALAP KÉRÉSEK

app.get('/api/users', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM users');
        res.json(result.rows);

    } catch (e) {
        res.status(500).send(e.message);
    }
})

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await client.query('SELECT * FROM users WHERE (name = $1 OR email = $1) AND password = $2', [username, password]);
        res.json(result.rows);

        if (result.rows.length) {
            loggedInUser = result.rows[0];
        }

    } catch (e) {
        res.status(500).send(e.message);
    }
})

app.get('/api/webshop/user/login', (req, res) => {
    res.send(loggedInUser);
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})