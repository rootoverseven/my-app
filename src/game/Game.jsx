import React from 'react'
import { useEffect } from 'react';
import { useState, useRef } from 'react'


export default function Game() {
    // localStorage.setItem("highScore", 50)
    let [highScore, setHighScore] = useState(localStorage.getItem('highScore'))
    let count = 0;
    let _timeT = 0;
    let randomCharacter = ''
    let [randomVal, setRandomVal] = useState('')
    let [timerOn, setTimerOn] = useState(false)
    let [timer, setTimer] = useState(0)
    let [finished,setFinished]= useState(false)
    const [intervalId, setIntervalId] = useState(null)
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    useEffect(() => {
        
        if(timerOn){
            
            const id= window.setInterval(inctime, 1000)
            // setIntervalId(id)
            return () => clearInterval(id)
        }else{
            // window.clearInterval(intervalId)
        }

    },[timerOn] )

    useEffect(() => {
        document.addEventListener('keyup', keyInput);
    }, [])
    useEffect(() => {
        if (finished){
        if(highScore == null || Number(highScore)>timer){
            setRandomVal("Success")

            setHighScore(timer)
        localStorage.setItem("highScore", timer)

        }else {
            setRandomVal("Failure")
        }}
    }, [finished])

     function inctime() {
        
        setTimer(prevTime => prevTime + 1);
    
    }

    const inputRef = useRef();

    async function generateRandomAlpha() {
        if (count > 20) {
            setTimerOn(false)
            setFinished(true)
            document.removeEventListener('keyup', keyInput)
            return;
        }
        count += 1;
        let randomIndex = Math.floor(Math.random() * alphabet.length)
        randomCharacter = alphabet[randomIndex]
        await setRandomVal(randomCharacter)

    }


    async function keyInput(e) {
        if (randomCharacter == '') {
            // timerOn = true;
            setTimerOn(true)

            generateRandomAlpha()
        } else {
            if (!checkCorrect(e.key.toUpperCase())) {
                // alert("wrong")
                setTimerOn(false)
            }
            generateRandomAlpha()
        }
    }
    function checkCorrect(e) {
        // console.log("pressed is " + e + " key is " + randomCharacter)
        if (e == randomCharacter) {
            return true;
        } else {
            return false;
        }
    }


    return (
        <div className='container' ref={inputRef}>
            <div className='wrapper'>
                <div className='head'>Type The Alphabet</div>
                <div className='para'>Typing game to see how you type. Press any key to start timer :)</div>
                <div className='textCont'
                // onClick={()=>{start()}}
                >
                    <div className='text'>{randomVal}</div>
                </div>
                <div className='timer'>
                    Timer: {timer}s
                </div>
                <div className='highScore' onClick={()=>console.log(timer)}>
                    My highest score: <span>{highScore}</span>s
                </div>
                <button onClick={()=>{window.location.reload()}}>Play Again</button>
                <button onClick={()=>{localStorage.clear();window.location.reload()}}>Reset Score</button>
            </div>
        </div>
    )
}
