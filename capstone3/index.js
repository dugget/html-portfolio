import express from "express";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
app.use(express.static("public"));

app.use("/assets", express.static("assets"));

const __filename = fileURLToPath(import.meta.url);

app.get('/', (req, res) => {
    res.render("index.ejs");
})

app.get('/create', (req, res) => {
    res.render("create.ejs");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
