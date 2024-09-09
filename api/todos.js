const express = require('express');
const todos = express.Router()
const { MongoClient } = require('mongodb');

const dbName = 'todos';
const url = 'mongodb+srv://hanjoo:abcd1234@hanjoo.wxhmb.mongodb.net/?retryWrites=true&w=majority&appName=hanjoo';
// const url = 'mongodb+srv://minkyu:abcdef2397@minkyu.rlol7cf.mongodb.net/?retryWrites=true&w=majority&appName=minkyu';

const client = new MongoClient(url);

async function connect(){
    await client.connect();
    const db = client.db(dbName);

    return db.collection('data');
}

todos.get('/', async function (req, res) {
    const collection = await connect();   
    const findResult = await collection.find({}).toArray();
    client.close();

    res.send( findResult )
})
todos.get('/:id', async function (req, res) {
    let id = req.params;

    const collection = await connect();   
    const findResult = await collection.find(id).toArray();
    client.close();

    res.send( findResult )
})

todos.post('/', async function (req, res) {
    // let body = [...dataParse.list, req.body];
    // fs.writeFileSync('./dataBase/data.json',JSON.stringify({list:body}))
    // res.send({list:body})

    const collection = await connect();
                        await collection.insertOne(req.body);
    const findResult = await collection.find({}).toArray();
    client.close();

    res.send( findResult )
})


todos.put('/', async function (req, res) {

    const collection = await connect();
                                                    // {찾는놈},{바꿀값}
                        await collection.updateOne({id:req.body.id},{$set:req.body});
    const findResult = await collection.find({}).toArray();
    client.close();

    res.send( findResult )

})

todos.delete('/', async function (req, res) {
    // let body = [...dataParse.list].filter(obj=>obj.id != id);

    // fs.writeFileSync('./dataBase/data.json',JSON.stringify({list:body}))
    

    const collection = await connect();
                        await collection.deleteOne(req.query);
    const findResult = await collection.find({}).toArray();
    client.close();

    res.send( findResult )
})

module.exports = todos;