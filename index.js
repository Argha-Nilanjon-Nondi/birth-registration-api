const express=require("express");
const bodyParser = require("body-parser");
const cors=require("cors");
const helmet=require("helmet");
const app=express();
const apiRoute=require("./Routes/api");
const adminApiRoute=require("./Routes/admin");
const common=require("./Routes/common.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use("/api", common);
app.use("/api",apiRoute);
app.use("/api/admin",adminApiRoute);

const port = process.env.PORT || 8080; 

app.listen(port,()=>{
    console.log(`go to http://localhost:${port}/`);
});