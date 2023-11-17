'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const [ playerName, setPlayerName ] = useState(null);
  const router = useRouter();

  const nameRef = useRef(null);

  const onInputChange = (e) => {
    e.preventDefault();

    setPlayerName(e.target.value);
  }

  const confirmInput = () => {
    if (!playerName) alert("Please provide a name");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24">
        <h1 className="text-6xl text-center font-bold">Welcome to Homie Trivia!</h1>
        <div className="min-h-[400px] min-w-[50%] bg-blue-600 rounded-2xl px-6 shadow-xl flex flex-col justify-evenly items-center">
          <p className="text-2xl">Enter Name:</p>
          <input className="text-black min-h-[40px] min-w-[60%] rounded-2xl text-center"
                onChange={onInputChange}></input>

                { playerName ?
                  <Link href={{
                    pathname: "/game",
                    query: {
                      playerName
                    }
                  }}
                  className="bg-blue-500 hover:shadow-xl hover:bg-blue-400 p-5 min-w-[200px] rounded-full text-center"
                  > Confirm </Link>
                  :
                  <button className="bg-blue-500 hover:shadow-xl hover:bg-blue-400 p-5 min-w-[200px] rounded-full"
                  onClick={confirmInput}
                  > Confirm </button>
                }

        </div>
    </main>
  )
}
