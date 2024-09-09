const express = require('express');
const fs = require('fs');
const todos = express.Router()


let data = fs.readFileSync('./dataBase/data.json');
let dataParse = JSON.parse(data);

todos.get('/', function (req, res) {
  res.send( dataParse )
})
todos.get('/:id', function (req, res) {
    let {id} = req.params;
    let d = dataParse.list.filter((obj)=>obj.id == id);

    res.send(d)
})

todos.post('/', function (req, res) {
    let body = [...dataParse.list, req.body];
    fs.writeFileSync('./dataBase/data.json',JSON.stringify({list:body}))
    res.send({list:body})
})


todos.put('/', function (req, res) {
    let {id,status} = req.body;  

    let body = [...dataParse.list].map(obj=>{
        if(obj.id == id){
            obj.status = status;
        }
        return obj;
    })

    fs.writeFileSync('./dataBase/data.json',JSON.stringify({list:body}))
    res.send({list:body})
})

todos.delete('/', function (req, res) {
    let {id} = req.query;    
    let body = [...dataParse.list].filter(obj=>obj.id != id);

    fs.writeFileSync('./dataBase/data.json',JSON.stringify({list:body}))
    res.send({list:body})
})

module.exports = todos;
