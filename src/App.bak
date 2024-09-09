import './App.css';
import React, { useEffect } from 'react';
import axios from "axios";
import store from './state/store';

// 여기가 투두리스트 프론트단!!!!!********************
function App() {

  // const data = store();     << {data:100}
  const {data, dataCtrl} = store();   // << {100}


  useEffect(()=>{
    /*
    1.get. delete << (url, option)

    2.post,put << (url, body, option)
    */
    // axios.get("http://localhost:4000")
    // axios.post("http://localhost:4000", {name:"test"})
    // axios.delete("http://localhost:4000?id=1")
    // .then(res=>{
    //   console.log(res.data);
    // })
    console.log('hi');

    dataCtrl({type:'post', data:{id:5,name:'콩순이'}});
  },[])

  return (
    <>

    </>
  );
}

export default App;
