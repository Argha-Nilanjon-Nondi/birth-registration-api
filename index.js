const express=require("express");
const bodyParser = require("body-parser");
const cors=require("cors");
const helmet=require("helmet");
const app=express();
const publicApiRoute = require("./Routes/api/public.js");
const adminApiRoute=require("./Routes/api/admin.js");
const commonApiRoute=require("./Routes/api/common.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use("/api", commonApiRoute);
app.use("/api",publicApiRoute);
app.use("/api/admin",adminApiRoute);

const port = process.env.PORT || 8080; 

app.listen(port,()=>{
    console.log(`go to http://localhost:${port}/`);
});