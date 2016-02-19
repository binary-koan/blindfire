import express from "express";

const app = express();

app.use(express.static(`${__dirname}/static`));
app.use(express.static(`${__dirname}/build`));

const port = process.env.PORT || 3000;
console.log(`Listening on port ${port}`);
app.listen(port);
