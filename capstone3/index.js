import express from "express";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static("assets"));

const posts = [];

app.get('/', (req, res) => {
    res.render("index.ejs", { posts : posts });
})

app.get('/create', (req, res) => {
    res.render("create.ejs");
})

app.post('/create', (req, res) => {
    const postTitle = req.body.title;
    const postAuthor = req.body.author;
    const postBody = req.body.body;

    const postObj = {
        "title": postTitle,
        "author": postAuthor,
        "body": postBody,
    }

    posts.push(postObj);
    console.log(posts);
    res.redirect("/");
})

app.get('/posts/:postID', (req, res) => {
    let postTitle = req.params.postID;
    let postAuthor = "";
    let postBody = "";
    
    const post = posts.find(post => post.title.toLowerCase() == postTitle.toLowerCase());
    if (post) {
        const title = post.title;
        const author = post.author;
        const body = post.body;

        if (postTitle.toLowerCase() == title.toLowerCase()) {
            res.render(
                'posts.ejs',
                {
                title : title,
                author : author,
                body : body,
                }
            )
        }
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
