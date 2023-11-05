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

app.get('/progress', async (req, res) => {
    //get params
    // params: { username: "pavanmanishd", type: category.type },
    const { username, type } = req.query;
    const progress = await client.execute({
        sql: "SELECT * FROM learn_progress WHERE username = ? AND type = ? AND completed = 1",
        args: [username, type],
    });
    //check the rows and only send the rows with distinct names
    const names = [];
    const rows = [];
    progress.rows.forEach((row) => {
        if (!names.includes(row.name)) {
            names.push(row.name);
            rows.push(row);
        }
    });
    res.json(rows);
}
);

app.get('/update_progress', async (req, res) => {
    const { username, type, name } = req.query;
    const UpperType = type.charAt(0).toUpperCase() + type.slice(1);
    var progress = await client.execute({
        sql: "INSERT INTO learn_progress(username,type,name,completed) VALUES(?,?,?,1)",
        args: [username, UpperType, name],
    });
    res.json(progress.rows);
}
);

app.get('/completed', async (req, res) => {
    //get params
    // params: { username: "pavanmanishd", type: category.type,name: name },
    const { username, type, name } = req.query;
    const UpperType = type.charAt(0).toUpperCase() + type.slice(1);
    const progress = await client.execute({
        sql: "SELECT * FROM learn_progress WHERE username = ? AND type = ? AND name = ?",
        args: [username, UpperType, name],
    });
    let completed = false;
    progress.rows.forEach((row) => {
        if (row.completed === 1) {
            completed = true;
            return;
        }
    });
    res.json({ completed });
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
