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

app.get('/posts/edit/:postID', (req, res) => {
    let postTitle = req.params.postID;
    let postAuthor = "";
    let postBody = "";

    const post = posts.find(post => post.title.toLowerCase() == postTitle.toLowerCase());
    if (post) {
        const postTitle = post.title;
        const postAuthor = post.author;
        const postBody = post.body;

        if (postTitle.toLowerCase() == postTitle.toLowerCase()) {
            res.render(
                'edit.ejs',
                {
                    title: postTitle,
                    author: postAuthor,
                    body: postBody,
                }
            )
        }
    }
})

app.post('/posts/edit/:postID', (req, res) => {
    const postID = req.params.postID;
    const newTitle = req.body.title;
    const newBody = req.body.body;
    
    // Find the post index
    const index = posts.findIndex(post => post.title.toLowerCase() == postID.toLowerCase());
    
    if (index > -1) {
        // Update the post
        posts[index].title = newTitle;
        posts[index].body = newBody;
        // Redirect to the updated post page
        res.redirect(`/posts/${newTitle}`);
    } else {
        // Handle error if post not found, for now redirect home or show error
        res.redirect("/");
    }
})
app.post('/delete/:postTitle', (req, res) => {
    const postTitle = req.params.postTitle;

    if (postTitle) {
        const index = posts.findIndex(post => post.title.toLowerCase() == postTitle.toLowerCase());
        if (index > -1) {
            posts.splice(index, 1);
        }
    }
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
