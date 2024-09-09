import axios from 'axios';
import { create } from 'zustand';


const instance = axios.create({
  //정보 숨기려고 이렇게 하는거임 
    baseURL: process.env.REACT_APP_SERVER_URL
});

const store = create((set) => ({
  data: [],
  sortData :[],
  dataCtrl : async function(action){

    let res;    
    switch(action.type){
        case 'get' : 
        res = await instance.get("/"); break;

        case 'post' : 
        res = await instance.post("/",action.data); break;

        case 'put' : 
        res = await instance.put("/",action.data); break;

        case 'delete' : 
        res = await instance.delete(`/?id=${action.data}`); break;
    }    
    set({data:res.data});   
    
  },
  sortCtrl : function(sort){

    set((state)=>{
      // true = 일을끝냄
      // false = 해야할일
      let findData;
      switch(sort.type){
        case 'Active': return {sortData: state.data.filter(obj=> obj.status == false)};
        case 'Completed': return {sortData: state.data.filter(obj=> obj.status == true)};
        default:return {sortData: state.data};
      }
    });
  }

}))

export default store;