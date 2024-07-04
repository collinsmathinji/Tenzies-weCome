import React from "react"
import { Button } from "antd"
export default function Dice(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : ""
    }
    return (
        <Button
            className="bg-gray-300 w-9 p-8 shadow-lg rounded-lg" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-num">{props.value}</h2>
        </Button>
    )
}