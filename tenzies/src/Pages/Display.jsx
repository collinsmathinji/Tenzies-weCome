import React,{useState,useEffect} from "react"
import Dice from "../components/Dice"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Display from "../components/ranks"
import { notification,Modal } from 'antd';
const Main=()=> {

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] =useState(false)
    const[trials,setTrials]=useState(3)
    const[result,setResult]=useState('')
    
    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            setResult('won')
            notification.success({
                message: 'Congratulations You won',
                description: 'Please Restart the Game',
            });
        }
        else if(allHeld && !allSameValue){
            setTenzies(true)
            setResult('lost')
            setTrials(trials-1)  
           
        }
    }, [dice])
  
    if(trials===0){
        notification.error({
           message: 'Sorry you Lost',
           description: 'Please Restart the game',
       });
   }
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
 
    
    function rollDice() {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
    }
    const newGame=()=>{
        setDice(dice=>dice.map(
           dice =>{
            return !dice.isHeld
           }
        ))
        rollDice()
        setTenzies(false)
    }
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Dice 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <div className="flex justify-center">
            
            <div className="flex flex-col justify-center">
            {tenzies && result ==='won' && <Confetti />}
            <div className="mt-3">
            <h1 className="font-bold text-lg flex justify-center">Tenzies</h1>
            <p className="">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            </div>
          {/* <Display result={result} setResult={setResult}/> */}
            {trials>0 && 
            <div className="flex justify-center">
                <div className="flex flex-col">
                <p><strong>Trials Remaining:</strong></p>
               <p className="flex justify-center">{trials}</p> 
               </div>  
            </div>  
            }
            <div className="flex flex-col justify-center">
            <div className=" grid grid-cols-5  gap-2 w-96 ml-36 mt-5">
                {diceElements}
            </div>
            <div className="flex justify-center mt-10">
           {tenzies?
           <button 
                className=" bg-slate-600 border rounded-lg w-36 py-4  " 
                onClick={newGame}
            >
                {result==="won" || trials===0 ? 'New Game':'Retry'}
            </button>:<button 
                className=" bg-slate-600 border rounded-lg w-36 py-4  " 
                onClick={rollDice}
            >
                Roll
            </button>} 
            </div>
            </div>
            </div>
          
        </div>
        
    )
}
export default  Main