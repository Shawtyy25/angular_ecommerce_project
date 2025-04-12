import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const app = express();
const PORT = process.env.PORT || 3300;

const angularPath = path.join(_dirname, '../ecommerce/src');

app.use(express.static(angularPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(angularPath, 'index.html'));
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})