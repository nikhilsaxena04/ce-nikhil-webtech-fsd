const express = require('express');
const app = express();
const port=8080;

app.get('/',(req,res)=>{
    res.send('Hello Server!');
})

app.get('/about',(req,res)=>{
    const students=[
        {
            id:1,
            name:"Nikhil",
            class:"10"
        },
        {
            id:2,
            name:"Dipansh",
            class:"12"
        }]
    res.json(students);
});

app.listen(port,()=>{
    console.log(`server is running at:http://localhost:${port}`)
})