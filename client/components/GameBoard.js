'use client'
import Loading from './LoadingIcon';

export default function GameBoard({ board, openQuestion }) {
  return (
    <table className="bg-blue-800 min-h-full w-full rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl">
      <tr className="rounded-tl-xl rounded-tr-xl">
        <th className="bg-blue-700 p-5 rounded-tl-xl"> Anime </th>
        <th className="bg-blue-700 p-5"> Gaming </th>
        <th className="bg-blue-700 p-5"> Kpop </th>
        <th className="bg-blue-700 p-5"> Memes </th>
        <th className="bg-blue-700 p-5"> Marvel </th>
        <th className="bg-blue-700 p-5 rounded-tr-xl"> Salads </th>
      </tr>
      { board[0].length === 0 ? <tr className="flex items-center"><Loading /></tr> :
      board.map((array, row) => {
        return (
          <tr>
            {board[row].map((array, col) => {
              if (row === 0) {
                return board[row][col] === 0 ? <th onClick={() => {openQuestion(row, col)}} className="bg-blue-800 p-5 hover:bg-blue-900 hover:cursor-pointer"> 200 </th> : <th className="line-through text-slate-900"> 200 </th>
              }
              else if (row === 1)
              {
                return board[row][col] === 0 ? <th onClick={() => {openQuestion(row, col)}} className="bg-blue-800 p-5 hover:bg-blue-900 hover:cursor-pointer"> 400 </th> : <th className="line-through text-slate-900"> 400 </th>
              }
              else if (row === 2)
              {
                return board[row][col] === 0 ? <th onClick={() => {openQuestion(row, col)}} className="bg-blue-800 p-5 hover:bg-blue-900 hover:cursor-pointer"> 600 </th> : <th className="line-through text-slate-900"> 600 </th>
              }
              else if (row === 3)
              {
                return board[row][col] === 0 ? <th onClick={() => {openQuestion(row, col)}} className="bg-blue-800 p-5 hover:bg-blue-900 hover:cursor-pointer"> 800 </th> : <th className="line-through text-slate-900"> 800 </th>
              }
              else
              {
                return board[row][col] === 0 ? <th onClick={() => {openQuestion(row, col)}} className={`bg-blue-800 p-5 hover:bg-blue-900 hover:cursor-pointer ${col === 0 ? 'rounded-bl-xl' : ''} ${col === 5 ? 'rounded-br-xl' : ''}`}> 1000 </th> : <th className="line-through text-slate-900"> 1000 </th>
              }
            })}
          </tr>
        )
      })}
    </table>
  )
}