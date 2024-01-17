const express = require("express");

const connectDb = require("./connect.js");
const urlRoute = require('./routes/url.routes.js');
const URL = require('./models/url.js');
require('dotenv').config();
const app = express();

const PORT = 8080;
// connectToMongoDB('mongodb://localhost:27017/short-url', { useNewUrlParser: true, useUnifiedTopology: true })
// .then(()=>console.log('mongodb connected'))

connectDb();


app.use(express.json()); 
app.use("/url",urlRoute);
app.get('/:shortId',async (req,res)=>{
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