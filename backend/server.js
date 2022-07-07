const express = require('express')
const path = require('path');
const connectDatabase = require('./config/database');
const cors = require("cors");
const app = express();
var bodyParser = require('body-parser')
var multer = require('multer');



// // for parsing application/json
// app.use(bodyParser.json()); 

// // for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true })); 
// //form-urlencoded

// // for parsing multipart/form-data

app.use(express.static('./public/uploads'));






const port = 4000
connectDatabase();

app.use(cors({ origin: true, credentials: true }));
const blogs = require('./routes/blogsRoute');
const users = require('./routes/usersRoute');



const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });
  
  // Route To Load Index.html page to browser
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  // The Multer Middleware that is passed to routes that will receive income requests with file data (multipart/formdata)
  // You can create multiple middleware each with a different storage engine config so save different files in different locations on server
  const upload = multer({ storage: fileStorageEngine });

// API for blogs
app.use('/api/vv1', blogs);

// API for users
app.use('/api/vv2/', users);

// API for file handeling
app.use('/api/vv3',upload.single('thumbnil'), blogs);

app.get('/', (req, res) => {
    res.send('Hello World!')
})


// test 


  
  // Single File Route Handler
  app.post("/single", upload.single("image"), (req, res) => {
    console.log(req.file);
    res.send("Single FIle upload success");
  });
  
  // Multiple Files Route Handler
  app.post("/multiple", upload.array("images", 3), (req, res) => {
    console.log(req.files);
    res.send("Multiple Files Upload Success");
  });


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})