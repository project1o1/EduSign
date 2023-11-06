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

// route to get the test questions of random signs of particular number
app.get('/test/:type/:number', async (req, res) => {    
    const { type, number } = req.params;
    const Upper = type.charAt(0).toUpperCase() + type.slice(1);
    const signs = await client.execute({
        sql: "SELECT * FROM signs WHERE type = ? ORDER BY RANDOM() LIMIT ?",
        args: [Upper, number],
    });
    res.json(signs.rows);
}
);

app.get('/test_progress', async (req, res) => {
    const { username, type, test_date, testResults, difficulty } = req.query;
    const Upper = type.charAt(0).toUpperCase() + type.slice(1);
    for (const [name, percentage] of Object.entries(testResults)) {
        const progress = await client.execute({
            sql: "INSERT INTO test_progress(username,type,test_date,name,accuracy,difficulty) VALUES(?,?,?,?,?,?)",
            args: [username, Upper, test_date, name, percentage, difficulty],
        });
    }
    res.json({ status: "success" });
});

app.get('/stats/test/:username', async (req, res) => {
    const { username } = req.params;
    const stats = await client.execute({
        sql: "SELECT test_date,difficulty,accuracy,type FROM test_progress WHERE username = ?",
        args: [username],
    });
    const rows = stats.rows;
    // for each difficulty store the total number of tests taken and the average accuracy, all the cases with the same test date are considered as one test
    const difficultyStats = {};
    rows.forEach((row) => {
        if (row.difficulty in difficultyStats) {
            difficultyStats[row.difficulty].tests += 1;
            difficultyStats[row.difficulty].accuracy += row.accuracy;
        } else {
            difficultyStats[row.difficulty] = { tests: 1, accuracy: row.accuracy };
        }
    });
    // for each difficulty calculate the average accuracy
    for (const [difficulty, stats] of Object.entries(difficultyStats)) {
        stats.accuracy = stats.accuracy / stats.tests;
    }

    // for each test date store the total number of tests taken and the average accuracy, all the cases with the same test date are considered as one test
    const dateStats = {};
    rows.forEach((row) => {
        if (row.test_date in dateStats) {
            dateStats[row.test_date].tests += 1;
            dateStats[row.test_date].accuracy += row.accuracy;
        } else {
            dateStats[row.test_date] = { tests: 1, accuracy: row.accuracy ,type: row.type};
        }
    });
    // for each test date calculate the average accuracy
    for (const [date, stats] of Object.entries(dateStats)) {
        stats.accuracy = stats.accuracy / stats.tests;
    }
    const dates = Object.keys(dateStats);
    console.log({ difficultyStats, dateStats,dates });
    res.json({ difficultyStats, dateStats, dates });
}
);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
