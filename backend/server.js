const express = require('express');
const app = express();
const port=8080;

app.get('/',(req,res)=>{
    res.send('Hello Server!');
})

app.get('/about',(req,res)=>{
    res.send('<h1>About Page</h1><p>This is the about page of our application.</p>');
})

app.listen(port,()=>{
    console.log(`server is running at:http://localhost:${port}`)
})