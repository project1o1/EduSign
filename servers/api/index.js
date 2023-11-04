// const express = require('express');
import express from "express";
import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.TOKEN
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
