import { useReducer, useState } from "react";
import { useImmer, useImmerReducer } from "use-immer";
export default function ArrMutation() {
    const [arr,setArr] = useState([{name:"arr",key:0},{name:"arr",key:1}]);
    console.log('function ArrMutation',arr);
    function handleTap(type,index) {
      if(type == 'del'){
        let temp = arr.filter((item,f_index)=>f_index != index); //方法1
        // let temp = [].concat(arr.slice(0,index),arr.slice(index+1,arr.length)) //方法2
        setArr(temp);
      }else if(type == 'add'){
        setArr([...arr,{name:"arr",key:arr.length}]) //方法1
        // setArr([].concat(arr,{name:"arr",key:arr.length})) //方法2
      }
    }
    function changeName(name,index) { //更新数组里的对象数据
      setArr(arr.map((item,i_index)=>{
        if(index == i_index){
          return {...item,name}
        }else{
          return item;
        }
      }));
    }

    // useImmer
    const [immerArr,updateImmerArr] = useImmer([{name:"immerArr",key:0},{name:"immerArr",key:1}]);
    
    // useReducer
    const [reducerArr,reducerDispatch] = useReducer(setReducer,[{name:"reducerArr",key:0},{name:"reducerArr",key:1}]);
    
    //useImmerReducer
    const [immerReducerArr,immerReducerDispatch] = useImmerReducer(setImmerReducer,[{name:"immerReducerArr",key:0},{name:"immerReducerArr",key:1}]);


    function changeNameImmer(name,index) {
      updateImmerArr(draft=>{
        draft[index].name = name; //Immer可以直接改值
      }) 
    }

    function handleTapImmer(type,index) {
      if(type == 'del'){
        updateImmerArr(draft=>{ //Immer可以直接改值
          draft.splice(index,1);
        })
      }
      if(type == 'add'){
        updateImmerArr(draft=>{ //Immer可以直接改值
          draft.push({name:"immerArr",key:immerArr.length});
        })
      }
    }

    function setReducer(reducerArr,action) {
      let result = [];
      switch (action.type) {
        case "add":
          result = [
            ...reducerArr,
            {
              name:"reducerArr",
              key:reducerArr.length
            }
          ]
          break;
        case "del":
          result = reducerArr.filter((item,index)=>action.index != index);
          break;
      
        default:
          break;
      }
      console.log('setReducer',action,reducerArr,result);
      return result;
    }

    function setImmerReducer(nameNotImportant,action) {
      // let result = [];
      switch (action.type) {
        case "add":
          nameNotImportant.push({
            name:"immerReducerArr",
            key:nameNotImportant.length
          })
          break;
        case "del":
          nameNotImportant.splice(action.index,1)
          break;
        default:
          break;
      }
      // console.log('setImmerReducer',action,nameNotImportant,result);
      // return result; //用了Immer直接修改immerReducerArr了,无需return
    }

    function reducerDispatchTap(params) {
      console.log('reducerDispatch',params);
      reducerDispatch(params); //useReducer的dispatch 函数（用来 “派发” 用户操作给 reducer）
    }
    
    function immerDispatchTap(params) {
      console.log('immerReducerDispatch',params);
      immerReducerDispatch(params); //useReducer的dispatch 函数（用来 “派发” 用户操作给 reducer）
    }

    return (
      <>
        <h1>array.jsx</h1>
        <div style={{cursor:"pointer"}} onClick={()=>handleTap('add')}>添加 array+</div>
        {arr.map((item,index)=>(
          <div key={index} style={{display:'flex'}}>
            <div>{index}{item.name}{item.key}</div>
            <input placeholder="修改name" value={item.name} onChange={e=>changeName(e.target.value,index)}></input>
            <a style={{cursor:"pointer",marginLeft:"10px"}} onClick={()=>handleTap('del',index)}>X</a>
          </div>
        ))}
        
        <div style={{cursor:"pointer"}} onClick={()=>handleTapImmer('add')}>添加 immerArr+</div>
        {immerArr.map((item,index)=>(
          <div key={index} style={{display:'flex'}}>
            <div>{index}{item.name}{item.key}</div>
            <input placeholder="修改name(Immer)" value={item.name} onChange={e=>changeNameImmer(e.target.value,index)}></input>
            <a style={{cursor:"pointer",marginLeft:"10px"}} onClick={()=>handleTapImmer('del',index)}>X</a>
          </div>
        ))}

        <div style={{cursor:"pointer"}} onClick={()=>reducerDispatchTap({type:'add'})}>添加 reducerArr+</div>
        {reducerArr.map((item,index)=>(
          <div key={index} style={{display:'flex'}}>
            <div>{index}{item.name}{item.key}</div>
            {/* <input placeholder="修改name(Immer)" value={item.name} onChange={e=>reducerDispatchTap({})}></input> */}
            <a style={{cursor:"pointer",marginLeft:"10px"}} onClick={()=>reducerDispatchTap({type:'del',index})}>X</a>
          </div>
        ))}

        <div style={{cursor:"pointer"}} onClick={()=>immerDispatchTap({type:'add'})}>添加 immerReducerArr+</div>
        {immerReducerArr.map((item,index)=>(
          <div key={index} style={{display:'flex'}}>
            <div>{index}{item.name}{item.key}</div>
            <a style={{cursor:"pointer",marginLeft:"10px"}} onClick={()=>immerDispatchTap({type:'del',index})}>X</a>
          </div>
        ))}
      </>
    )
}