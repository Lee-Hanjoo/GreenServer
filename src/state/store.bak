import axios from 'axios';
import { create } from 'zustand'

const instance = axios.create({
  baseURL: 'https://port-0-greenserver-m0uanokv06d4be07.sel4.cloudtype.app/todos',
});

const store = create((set) => ({
  // 여기 100은 d.data임.
  data: [],
  sortData :[],
  dataCtrl : async (action)=>{
    // 매개변수로 받은 d로 100에 접근 가능함.
    // 100에 접근 할 필요없으면 
    // set({data:"ㅋㅋ"})로 쓰면됨.
    // axios.get("http://localhost:4000")
    

    
    let res;
    switch(action.type){
      case 'get' : res = await instance.get("/"); break;
      case 'post' : res = await instance.post("/", action.data); break;
      case 'put' : 
      res = await instance.put("/",action.data); break;
      case 'delete' : 
      res = await instance.delete(`/?id=${action.data}`); break;
    }
    
    set({data:res.data.data})


    // instance.get("/")
    // .then(res=>{
    //   set({data:res.data.data})
    // })

    
    // // set((d)=>{
    //   console.log(d);
    //   // 여기쓰인 data<<는 속성임.
    //   return {data:n}
    // })
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

export default store