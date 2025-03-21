require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// const { chats } = require("./data/data");

const app = express();
const dbConnect = require("./db/db");
const logger = require("./middleware/logger");
dbConnect();

//environment variable and port setup
let PORT = process.env.PORT || 8000;
console.log(PORT);

// Body parser middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ensure the uploads directory exists
const ensureUploadsDirectoryExists = () => {
  const dir = path.join(__dirname, "uploads");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Call this to create the directory if it doesn't exist
ensureUploadsDirectoryExists();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    ensureUploadsDirectoryExists(); // Ensure the directory exists before saving the file
    cb(null, path.join(__dirname, "uploads")); // Use absolute path
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  res.send({ filePath: `/uploads/${req.file.filename}` });
});

//Routes
app.use("/api/auth", require("./routes/Auth"));
app.use("/api/product",upload.array("myfile"),require("./routes/ProductRoute")
);
app.use('/api/contact',require('./routes/Contact_route'));
app.use("/api/auth", require("./routes/Auth"));
app.use(
  "/api/product",
  upload.array("myfile"),
  require("./routes/ProductRoute")
);
app.use("/api/contact", require("./routes/Contact_route"));
app.use("/api/cart", require("./routes/Cart_route")); 
//middleware
app.use(logger);
//middleware
app.use(logger);

// this is middleware , is a function that executes before routing /, /profile,/contact
// req=> is client/user data sending to server
// res=> is server response to client/user
// next => must call next() to continue request flow
// if not used next(); request flow will stop and cannot run the routing process
// app.use((req,res,next)=>{
//   next();
// })

// app.get('/',(req,res)=>{
//   res.status(200).send("Hello world");
// })

// app.get("/profile", (req, res) => {
//   res.send("Welcome to Express Backend Development");
//   // res.status(404).send("Not Found");
//   // res.sendStatus(404);
// });

//dynamic routing
// app.get('/profile/balram',(req,res)=>{
//   res.send('Welcome balram')
// })

// app.get("/profile/:username", (req, res) => {
//   res.send(`Welcome ${req.params.username}`);
// });

// app.get('/chats',(req,res)=>{
//   res.json(chats);
// })

// app.get("/chats/:id", (req, res) => {
//   const singleChat = chats.find((chat)=>chat._id === req.params.id)
//   console.log(req.params.id);
//   res.json(singleChat)
//   // res.json(req.params.id)
// });

//start server
app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
