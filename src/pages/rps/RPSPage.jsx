import React, {useEffect} from 'react';
import classes from "../rps/RPS.module.css";
import {useSelector} from "react-redux";
import MyButton from "../../components/UI/buttons/MyButton";
import useConfetti from "../../hooks/useConfetti";
import TopBlock from "../../components/rps/TopBlock";
import GameArea from "../../components/rps/GameArea";
import useGame from "../../hooks/rps/useGame";

const RPSPage = () => {

    const userName = useSelector(state=>state.user.userName);
    const  {confettiBlock} = useConfetti();
    const {roundsCount, gameRun, time, startTimer, allowToMakeChoice, repeatRound, finishGame, checkWinner,
        checkResult, congratulations,topBlock, coverVisible, dices, getItem, itemBeforeTop, opponent,
        player, goTimer, gapForPlay, setGapForPlay
    }= useGame(userName);


    useEffect(()=>{
        if(roundsCount!==3)
        {
            if (gameRun && time > 0)
            {
                startTimer();
            }
            else if (time === 0)
            {
                allowToMakeChoice();
                repeatRound();
            }
        }
        else
        {
            finishGame();
            checkWinner();
        }

    }, [time]);


   useEffect(()=>{
       if(gapForPlay)
       {
           setTimeout(()=>{setGapForPlay(false)}, 2000)
       }
       else if(!gapForPlay && gameRun)
       {
           checkResult();
       }
   }, [gapForPlay])


    return (
        <div className={classes.gameBlock}>
            {confettiBlock(congratulations)}
            <div className={classes.main}>
                <h1 className={classes.header}>Welcome to Rock-Paper-Scissors, {userName}!</h1>
                <TopBlock status={topBlock} />
                <GameArea
                    coverVisible={coverVisible}
                    time={time}
                    dices={dices}
                    getItem={getItem}
                    itemBeforeTop={itemBeforeTop}
                    opponent={opponent}
                    player={player}
                />
                <MyButton
                    text="Go!"
                    click ={goTimer}
                    disabled={gameRun}
                />
            </div>

        </div>
    );
};

export default RPSPage;