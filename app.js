const express = require("express");
const mongoose = require("mongoose");
const port =5000;
const createError=require("http-errors")


const itemsRouter = require("./routes/itemRoutes");


const {  mongoURL } = require("./config/env");
const path = require("path");
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", console.error);
mongoose.connection.on("open", () => {
  console.log("Database connected!");
});

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/client/index.html")
})

app.use("/items", itemsRouter);


if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// Error Handling 
app.use((err,req,res,next)=>{
  res.status(err.status || 500).send({success:false,message:err.message})
})
app.listen(port, () => {
  console.log("====================================");
  console.log("Server start with port: " + port);
  console.log("====================================");
});
