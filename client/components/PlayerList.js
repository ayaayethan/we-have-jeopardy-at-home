export default function PlayerList({ playerList, firstClicker }) {
  return (
    <div className="bg-blue-600 p-4 rounded-2xl min-h-[130px] w-full flex flex-col justify-evenly items-center shadow-lg">
      <div className="bg-blue-800 flex justify-evenly rounded-lg h-full w-full text-center p-2 shadow-inner">
      {playerList.map(player => {
        return (
          <div className={`flex flex-col p-6 ${firstClicker === player.name ? 'border-2 rounded-2xl border-yellow-400' : ''}`}>
            <p className="text-xl">{player.name}</p>
            <p>{player.points} points</p>
          </div>
        )
      })}
      </div>
    </div>
  )
}