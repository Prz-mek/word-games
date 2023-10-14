import { useState } from 'react'
import './App.css'
import GuessGame  from './guessTheWord/GuessGame'


function App() {
  const [word, setWord] = useState(0)

  return (
    <div>
      <GuessGame />
    </div>
  )
}

export default App;
