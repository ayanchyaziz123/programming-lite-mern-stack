const express = require('express')
const path = require('path');
const connectDatabase = require('./config/database');
const cors = require("cors");
const app = express();
var bodyParser = require('body-parser')
require('dotenv').config()




// // for parsing application/json
app.use(bodyParser.json()); 
app.use(express.json());

// // for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true })); 
// //form-urlencoded

// // for parsing multipart/form-data

app.use(express.static('./public/uploads'));





connectDatabase();

app.use(cors({ origin: true, credentials: true }));
const blogs = require('./routes/blogRoute');
const users = require('./routes/userRoute');
const comments = require('./routes/commentRoute');





// API for blogs
app.use('/api/blog', blogs);
// COmments
app.use('/api/comment', comments);

// API for files
app.use('/api/file', blogs);

// API for users
app.use('/api/user', users);


app.get('/', (req, res) => {
    res.send('Hello World!')
})


// test 
  
//   // Single File Route Handler
//   app.post("/single", upload.single("image"), (req, res) => {
//     console.log(req.file);
//     res.send("Single FIle upload success");
//   });
  
//   // Multiple Files Route Handler
//   app.post("/multiple", upload.array("images", 3), (req, res) => {
//     console.log(req.files);
//     res.send("Multiple Files Upload Success");
//   });
app.listen(process.env.PORT, () => {
    console.log(`Example app->> listening at http://localhost:${process.env.PORT}`)
})