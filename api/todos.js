const express = require('express');
const fs = require('fs');
const todos = express.Router()
const { MongoClient } = require('mongodb');


const url = 'mongodb+srv://hanjoo:9HdPaNAplx7KmMtf@hanjoo.wxhmb.mongodb.net/?retryWrites=true&w=majority&appName=hanjoo';
const client = new MongoClient(url);
const dbName = 'todos';

async function main(){
    await client.connect();
    // 커ㅏ넥트 안되면 아래꺼 실행 안됨. 
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('data');

    return collection
}

let data = fs.readFileSync('./dataBase/data.json');
let dataParse = JSON.parse(data);

todos.get('/', async function (req, res) {

    const collection = await main();

    const findResult = await collection.find({}).toArray();
    client.close(); // 디비끝낸다.

  res.send( findResult )
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
