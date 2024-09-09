// 여기가 투두리스트 백단!!!!!********************

const express = require('express');
const fs = require('fs'); // 얘는 express가 가지고잇음.
// cors는 프로토콜(http, https)가 달라도 오류안나게끔 해줌.
const app = express();
const cors = require('cors');
// 파서를 안쓰믄 저장값을 못씀. https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser')


app.use(cors());
// form 형태의 데이터를 쓸 수 있게 해줌
app.use(bodyParser.urlencoded({ extended: false }))
// json 형태의 데이터를 쓸 수 있게 해줌
app.use(bodyParser.json());

//얘는 비동기임."Sync" <<<
let data = fs.readFileSync('./dataBase/data.json'); //문서에있는내용을 읽어들일 수 있음.
let parseData = JSON.parse(data)

// req는 정보가 들어옴. res는 값을 출력하고 이런걸 함. '/'는 루트 디렉토리임.
app.get('/', function (req, res) {
  res.send(parseData)
})

// :@@ 는 변수처럼 작용함.
app.get('/:id', function (req, res) {
  let {id} = req.params;
  //        필터를 === 로 쓰니까 타입이 안맞아서 0, 1번째를 못불러왔었음. ==로 쓰니까 잘 나온다.
  let d = parseData.data.filter((obj)=>obj.id == id)

  res.send(d)
})


app.post('/', function (req, res) {
  //               [...기존값], 추가된 값
  let body = {data:[...parseData.data, req.body]};
  fs.writeFileSync('./dataBase/data.json', JSON.stringify(body));
  res.send(body)
})


app.put('/', function (req, res) {
  // todolist 에서 axios.put("http://localhost:4000?id=1 <<<를 찍어보면 {id:'1'}이기 때문에 감싸준거임.
  let {id} = req.query;

  // let body = {data:[...parseData.data, req.body]};
  let body = [...parseData.data].map(obj=>{
    if(obj.id == id){
      obj.name = req.body.name
    }
    return obj;
  })
  
  fs.writeFileSync('./dataBase/data.json', JSON.stringify({data:body}));
  res.send(req.body)
})

app.delete('/', function (req, res) {
  let {id} = req.query;
  let body = [...parseData.data].filter(obj=>obj.id != id);
  
  fs.writeFileSync('./dataBase/data.json', JSON.stringify({data:body}));
  res.send(req.body)
})



// port
app.listen(4000)