'use client'

import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useSearchParams, redirect } from 'next/navigation'

import PlayerList from '../../components/PlayerList.js'
import GameBoard from '../../components/GameBoard.js'
import Question from '../../components/Question.js'

const socket = io("http://localhost:3001");

export default function Game() {
  const name = useSearchParams().get('playerName');

  if (!name) {
    redirect('/');
  }

  const [ firstClicker, setFirstClicker ] = useState(null);
  const [ playerList, setPlayerList ] = useState([]);
  const [ isDisabled, setDisable ] = useState(true);
  const [ board, setBoard ] = useState([[]]);
  const [ question, setOpenQuestion ] = useState(false);
  const [ coords, setCoords ] = useState([]);

  // functions
  const disconnectUser = () => {
    console.log('Disconnected user', name);
    socket.emit('player-disconnected', socket.id);
  }

  const onBeforeUnload = (e) => {
    e.preventDefault();

    disconnectUser();

    return undefined;
  }

  const onButtonClick = () => {
    socket.emit('player-clicked', name);
  }

  const onButtonReset = () => {
    socket.emit('button-reset');
    setDisable(true);
  }

  const openQuestion = (row, col) => {
    socket.emit('openQuestion', [row, col]);
  }

  // socket listeners
  socket.on('player-clicked', (name) => {
    console.log(`${name} clicked the button first`);
    setFirstClicker(name);
    setTimeout(() => {
      setDisable(false);
    }, 6000)
  })

  socket.on('button-reset', () => {
    setFirstClicker(null);
  })

  socket.on('updateBoard', (board, rowcol) => {
    setBoard([...board]);
    setOpenQuestion(!question);
    setCoords([rowcol[0], rowcol[1]]);
  })

  socket.on('onlyUpdateBoard', (board) => {
    setBoard([...board]);
  })

  // use effect
  useEffect(() => {
    console.log(`Connected user: ${name}`);

    socket.on('connect', () => {
      console.log(`Socket ID: ${socket.id}`);

      socket.emit('player-joined', name);
    })

    socket.on('updatePlayerList', (users) => {
      console.log('player has joined!');
      setPlayerList([...users]);
    })

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      disconnectUser();
      window.removeEventListener('beforeunload', onBeforeUnload);
    }
  }, [])

  return (
    <div className="flex flex-col items-center gap-10 p-3">
      { !question ?
        <GameBoard board={board} openQuestion={openQuestion}/>
        :
        <Question coords={coords} openQuestion={openQuestion} socket={socket} playerList={playerList}/>
      }
      { firstClicker ?
        <button className="bg-red-600 hover:bg-red-700 shadow-xl rounded-full h-[300px] w-[300px]"
                onClick={onButtonReset} disabled={isDisabled}> Reset </button>
        :
        <button className="bg-red-500 hover:bg-red-600 shadow-xl rounded-full h-[300px] w-[300px] font-bold"
                onClick={onButtonClick}> Buzzer </button>
      }
      <PlayerList playerList={playerList} firstClicker={firstClicker}/>
    </div>
  )
}