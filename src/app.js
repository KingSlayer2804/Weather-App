const express=require("express");
const requests=require("requests");
const path=require("path");
const app=express();
const port=3000;
app.set("view engine","hbs");
app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/weather",(req,res)=>{
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&units=metric&appid=260e44d1749bec3edc91918e2c0b2c6e`)
    .on('data', function (chunk) {
        const objData=JSON.parse(chunk);
        const arrData=[objData];
        res.render("next_page",{
            CityName:arrData[0].name,
            Temperature:arrData[0].main.temp,
            MinTemp:arrData[0].main.temp_min,
            MaxTemp:arrData[0].main.temp_max
        });
        
    })
    .on('end', function (err) {
    if (err) return console.log('connection closed due to errors', err);
    
    console.log('end');
    });
});
app.listen(port,()=>{
    console.log("Listening to port "+port);
});