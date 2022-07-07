const express = require('express')
const path = require('path');
const connectDatabase = require('./config/database');
const cors = require("cors");
const app = express();
var bodyParser = require('body-parser')




// // for parsing application/json
app.use(bodyParser.json()); 

// // for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true })); 
// //form-urlencoded

// // for parsing multipart/form-data

app.use(express.static('./public/uploads'));






const port = 4000
connectDatabase();

app.use(cors({ origin: true, credentials: true }));
const blogs = require('./routes/blogRoute');
const users = require('./routes/userRoute');





// API for blogs
app.use('/api/blog', blogs);

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


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})