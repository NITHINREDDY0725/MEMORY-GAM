
import { useState, useEffect } from "react";
import { useStore } from '../../store/Store';
import { LOGIN_SUCCESS } from '../../store/actions/actionTypes';
import { GAME_MODES } from '../../shared/enums';
import { MemoryGameService } from '../../shared/services/memory-game-service';
import Grid from './Grid';

const handleGameSession = (dispatch,payload) => {
    dispatch({ type: LOGIN_SUCCESS ,...payload})
}


const MemoryGame = () => {
    const [newGame, setNewGame] = useState(null);//used to determine game mode like EASY
    const [timerOn, setTimerOn] = useState(false);//on or off the timer
    const [list, setList] = useState([]);//holds all images data
    const [visibleItems, setVisibleItems] = useState([]);//to hold open cards
    const [duration, setDuration] = useState(0);//elapsed time
    const [errorCount, setErrorCount] = useState(0);//error score
    const [finishedItems, setFinishedItems] = useState([]);//holds matched images
    const [winner, setWinner] = useState(false);//to describe winner state

    const { globalState, dispatch } = useStore();

    const memoryService = new MemoryGameService();

    const checkItems = (firstIndex, secondIndex) => {
        if (
            firstIndex !== secondIndex &&
            list[firstIndex].url === list[secondIndex].url
        ) {
            setFinishedItems([...finishedItems, firstIndex, secondIndex]);
        } else {
            setTimeout(() => {
                setVisibleItems([]);
                setErrorCount(errorCount => errorCount + 1);
            }, 600);
        }
    };


    const getGameSessionIdAndColorCodes = (gameDifficultyLevel) => {
        memoryService.getGameSessionIdAndCardsData({ 'gameMode': gameDifficultyLevel, 'gameSessionId': '062b0c0e-cccf-4885-a411-60013b953612.json' }).then(gameSession => {
            const newList = gameSession.data.records.map(item => {
                return {
                    id: item.id,
                    url: item.urls.thumb,
                    description: item.alt_description
                };
            });
            //concat duplicated cards data with different id and then shuffle the cards
            setList(
                newList
                    .concat(
                        newList.map(item => {
                            return {
                                ...item,
                                id: item.id + "1"
                            };
                        })
                    )
                    .sort(() => {
                        return 0.5 - Math.random();
                    })
            );
            setNewGame(gameDifficultyLevel);
            setTimerOn(true);
            handleGameSession(dispatch,{ 'gameMode': gameDifficultyLevel, 'gameSessionId': '062b0c0e-cccf-4885-a411-60013b953612.json' })
        }).catch((err) => {
            alert(err.message);
        })
    }


    useEffect(() => {
        let interval = null;
        if (timerOn) {
            interval = setInterval(() => {
                setDuration((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!timerOn) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);//clearing side effects
    }, [timerOn]);

    //check is this is the last match if yes then off the timer and declare winner
    useEffect(
        () => {
            if (finishedItems.length > 0 && finishedItems.length === list.length) {
                setWinner(true);
                setTimerOn(false);
            }
        },
        [finishedItems]
    );

    return (
        <div>
            {!newGame ? (<><h1>Memory Game</h1>
                <h2>Choose a difficulty to begin!</h2>
                {Object.entries(GAME_MODES).map(([key, value]) => {
                    return <button className={"btn btn-primary btn-sm"} key={key} onClick={() => getGameSessionIdAndColorCodes(key)}>{value}</button>
                })}</>) : <>
                <div className="d-flex justify-content-around">
                    <div className="btn btn-outline-primary">Elapsed Time : {duration}</div>
                    <div className="btn btn-outline-primary">Error Score  : {errorCount}</div>
                </div>
            </>}

            {newGame && list.length === 0 ? (
                <div>...Loading</div>
            ) : (
                <div className="text-center p-4 d-flex flex-column">
                    <Grid
                        list={list}
                        visibleItems={visibleItems}
                        setVisibleItems={setVisibleItems}
                        finishedItems={finishedItems}
                        checkItems={checkItems}
                    />
                    {winner && (
                        <>
                            <div>
                                You Win !
                            <br />
              Finished in {duration} seconds
                        </div>
                            <button
                                onClick={() => {
                                    setNewGame(null);
                                    setVisibleItems([]);
                                    setFinishedItems([]);
                                    setWinner(false);
                                    setDuration(0);
                                    setErrorCount(0);
                                    setList([]);
                                }}
                                className="btn btn-warning mb-4"
                            >
                                New Game
              </button></>
                    )}
                </div>
            )}
        </div>
    )
}

export default MemoryGame
