import express from "express";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);

app.get('/', (req, res) => {
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
