import React,{useState,useEffect} from "react";

const Display=({result,setResult})=>{
    const [lostGames,setLostGames]=useState(0)
    const [wonGames,setWonGames]=useState(0)
    useEffect(()=>{
        if(result='lost'){
            setLostGames(lostGames+1)
        }else if(result='won'){
            setWonGames(wonGames+1)
        }
    },[result])
    
return(
  <div className="bg-slate-300">
    {lostGames}:{wonGames}
  </div>
)
}
export default Display