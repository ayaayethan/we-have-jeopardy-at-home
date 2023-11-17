'use client'
import { useState } from 'react'
import questions from '../util/questions.json';

export default function Question({ coords, openQuestion, socket, playerList }) {
  let [row, col] = coords;

  let [ answer, setShowAnswer ] = useState(false);

  const showAnswer = (coords) => {
    socket.emit('showAnswer', coords);
  }

  const givePoints = (points, name, row, col) => {
    socket.emit('givePoints', points, name);
    openQuestion(row, col);
  }

  socket.on('showAnswer', () => {
    setShowAnswer(true);
  })

  return (
    <div  className="bg-blue-800 min-h-[380px] w-full rounded-xl">
      <button className="px-5 py-2 m-5 bg-blue-600 hover:bg-blue-500 rounded-full"
              onClick={ () => {openQuestion(row, col)}}
              >Back</button>
      <div className="flex justify-center mt-16 items-center px-10 text-2xl">
        { answer ?
        <div>
          <p className="text-center">{questions[row][col].answer}</p>
          <p className="text-sm text-center mt-7">Give Points To:</p>
          <div className="flex">
            {playerList.map(player => {
              return <p className="bg-blue-500 text-center mx-2 p-3 rounded-2xl hover:cursor-pointer hover:bg-blue-400"
                        onClick={() => {givePoints(questions[row][col].points, player.name, row, col)}}>{player.name}</p>
            })}
          </div>
        </div>
        :
        <div className="text-center">
          <p> {questions[row][col].question} </p>
          <button className="px-5 py-2 m-5 bg-blue-600 hover:bg-blue-500 rounded-full"
                  onClick={() => {showAnswer([row, col])}}
                  > Show Answer </button>
        </div>
        }
      </div>
    </div>
  )
}