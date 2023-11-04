import express from "express";
import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.TOKEN
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/types', async (req, res) => {
    const categories = await client.execute("SELECT distinct type FROM signs");
    const types = categories.rows.map((row) => row.type);
    res.json(types);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
