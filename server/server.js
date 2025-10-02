import express from "express"
import path from "path"
import cors from "cors"
import pkg from "pg"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

let loggedInUser = null;

dotenv.config({path: './client.env'});

const _dirname = path.resolve();

const app = express();
const port = process.env.PORT || 3300;

app.use(cors());
app.use(express.json());

const {Client} = pkg;

// salt generate
const saltRounds = 10;
bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
        console.error(err)
        return;
    }
    console.log('Successfully generated salt count.');
})

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
    const {username, password} = req.body;

    try {
        const result = await client.query(
            'SELECT * FROM users WHERE name = $1 OR email = $1',
            [username]
        );

        if (result.rows.length === 0) return res.status(401).json({error: 'INVALID_CREDENTIALS '});

        const user = result.rows[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.json({error: 'INVALID_CREDENTIALS'});
        }

        loggedInUser = user;
        console.log(loggedInUser);
        res.json([{message: 'LOGIN_SUCCESS'}, {user: loggedInUser}]);
    } catch (e) {
        console.error(e);
        res.json({error: 'INTERNAL_ERROR '});
    }
})

app.post('/api/registration', async (req, res) => {
    const {u, e, p} = req.body;
    try {
        const check = await client.query('SELECT * FROM users WHERE name = $1 OR email = $2', [u, e]);

        if (check.rows.length > 0) {
            const existing = check.rows[0];

            if (existing.name === u) {
                return res.status(409).json({error: 'USERNAME_EXISTS'});
            }
            if (existing.email === e) {
                return res.status(409).json({error: 'EMAIL_EXISTS'});
            }

        }
        const passhash = await bcrypt.hash(p, saltRounds);


        await client.query(
            'INSERT INTO users (name, password, email) VALUES ($1, $2, $3)',
            [u, passhash, e]
        );

        res.status(201).json({message: 'USER_CREATED'});

    } catch (e) {
        console.error(e);
        res.status(500).json({error: 'INTERNAL_ERROR'});
    }
})

app.post('/api/webshop/logout', (req, res) => {
    loggedInUser = null;
    console.log("sikeres törlés");
    res.json({message: 'Logged out successfully!'});
})

app.get('/api/webshop/user/login', (req, res) => {
    res.send([loggedInUser, 1]);
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})

// admin registration

app.post('/api/registration/admin', async (req, res) => {
    const {u, e, p, admin} = req.body;
    try {
        const check = await client.query('SELECT * FROM users WHERE name = $1 OR email = $2', [u, e]);

        if (check.rows.length > 0) {
            const existing = check.rows[0];

            if (existing.name === u) {
                return res.status(409).json({error: 'USERNAME_EXISTS'});
            }
            if (existing.email === e) {
                return res.status(409).json({error: 'EMAIL_EXISTS'});
            }

        }
        const passhash = await bcrypt.hash(p, saltRounds);


        await client.query(
            'INSERT INTO users (name, password, email, admin) VALUES ($1, $2, $3, $4)',
            [u, passhash, e, admin]
        );

        res.status(201).json({message: 'USER_CREATED'});

    } catch (e) {
        console.error(e);
        res.status(500).json({error: 'INTERNAL_ERROR'});
    }
})


// admin API

//users count
app.get('/api/admin/users/count', async (req, res) => {
    try {
        const result = await client.query('SELECT count(*) AS user_count FROM users');
        res.json({count: result.rows[0].user_count});
    } catch (e) {
        console.error(e)
        res.send('INTERNAL ERROR!');
    }
})