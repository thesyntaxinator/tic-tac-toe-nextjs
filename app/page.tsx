"use client";
import Image from "next/image";
import { useState } from "react";

function checkWinner(newGameBoard: string[]) {
  const winningIndexes = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  for(let element of winningIndexes) {
    const item0 = newGameBoard[element[0]]
    const item1 = newGameBoard[element[1]]
    const item2 = newGameBoard[element[2]]
    console.log("item0", item0, "item1", item1, "item2", item2)
    if(item0 != "" && item1 != "" && item2 != "" && item0 == item1 && item1 == item2) {
      console.log("found winner")
      return true;
    }
  }
  return false;
}

export default function Home() {
  const [gameBoard, setGameBoard] = useState<string[]>(["", "", "", "", "", "","", "", ""]);
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>("");

  function handleClick(index: number): void {
    console.log("gameboard:", gameBoard, "index", index, "winner", winner, "checkWinner", winner, "currentPlayer", currentPlayer)

    if (gameBoard[index] != "" || winner) {
      return;
    }

    const newGameBoard = [...gameBoard];
    newGameBoard[index] = currentPlayer;
    setGameBoard(newGameBoard);

    console.log("currentPlayer", currentPlayer)
    const isWinner = checkWinner(newGameBoard)
    console.log("isWinner", isWinner)
    if (isWinner) {
      console.log("setting winner to current player", currentPlayer)
      setWinner(currentPlayer);
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function resetGame(): void {
    setGameBoard(["", "", "", "", "", "","", "", ""]);
    setCurrentPlayer("X");
    setWinner(null);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-lg shadow-lg">
        {gameBoard.map((item, index) => (
          <div
            key={index}
            className="h-20 w-20 flex items-center justify-center text-4xl font-bold cursor-pointer border-2 border-gray-300 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => handleClick(index)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="mt-4 text-xl font-semibold" id="winnerInfo">
        {winner ? `${winner} has won!` : `Current player: ${currentPlayer}`}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
        onClick={() => resetGame()}
      >
        Reset Game
      </button>
    </div>
  );
}
