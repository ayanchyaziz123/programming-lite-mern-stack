const express = require('express')
const connectDatabase = require('./config/database');
const cors = require("cors");
const app = express();
app.use(express.json());
const port = 4000
connectDatabase();

app.use(cors({ origin: true, credentials: true }));
const blogs = require('./routes/blogsRoute');
const users = require('./routes/usersRoute');

// api for blogs
app.use('/api/vv1', blogs);

// api for users
app.use('/api/vv2', users);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})