import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(express.static('public'));

app.listen(PORT,'127.0.0.1',() => {
    console.log(`Server listening on 127.0.0.1:${PORT}`)
})