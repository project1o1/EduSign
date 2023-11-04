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
    const categories = await client.execute("SELECT * FROM types");
    // const types = categories.rows.map((row) => row.type);
    res.json(categories.rows);
});

app.get('/progress',async (req, res) => {
    //get params
    // params: { username: "pavanmanishd", type: category.type },
    const { username, type } = req.query;
    const progress = await client.execute({
        sql: "SELECT * FROM learn_progress WHERE username = ? AND type = ? AND completed = 1",
        args: [username, type],
    });
    res.json(progress.rows);
}
);

app.get('/signs/:type', async (req, res) => {
    const { type } = req.params;
    //upper case first letter
    const Upper = type.charAt(0).toUpperCase() + type.slice(1);
    const signs = await client.execute({
        sql: "SELECT * FROM signs WHERE type = ?",
        args: [Upper],
    });
    res.json(signs.rows);
}
);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
