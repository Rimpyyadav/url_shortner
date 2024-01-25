const express = require("express");
const path = require('path');
const connectDb = require("./connect.js");
const urlRoute = require('./routes/url.routes.js');
const staticRoute = require("./routes/staticRouter.js");
const userRoute = require('./routes/user.js')
const URL = require('./models/url.js');
require('dotenv').config();
const app = express();

const PORT = 8080;
// connectToMongoDB('mongodb://localhost:27017/short-url', { useNewUrlParser: true, useUnifiedTopology: true })
// .then(()=>console.log('mongodb connected'))

connectDb();


app.set("views", path.resolve("./views"));
app.set("view engine","ejs");

app.use(express.json()); 
app.use(express.urlencoded({ extended:false}));

app.use("/url",urlRoute);
app.use("/user",userRoute);
app.use("/", staticRoute);
app.get('/url/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
   const entry = await URL.findOneAndUpdate({
        shortId,

    },{$push:{
        visitHistory: {
            timestamp: Date.now(),
        }
    }})
    res.redirect(entry.redirectURL);
})


app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));