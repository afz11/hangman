import { useState } from 'react'

function App() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
  console.log(alphabet)

  const generateAlphabetEl = alphabet.map(letter => <div className='character'>{letter}</div>)

  return (
    <>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        <div className="info">
          “Farewell HTML & CSS” 🫡 
        </div>
      </header>
      <main>
        <section>
          <div className="language-container">
            <div className='language'>HTML</div>
            <div className='language'>CSS</div>
            <div className='language'>Javasript</div>
            <div className='language'>React</div>
            <div className='language'>Typescript</div>
            <div className='language'>Node.js</div>
            <div className='language'>Python</div>
            <div className='language'>Ruby</div>
            <div className='language'>Assembly</div>
          </div>
        </section>
        <section className='letters-container'>
          <div className="letter"></div>
          <div className="letter"></div>
          <div className="letter"></div>
          <div className="letter"></div>
          <div className="letter"></div>
          <div className="letter"></div>
          <div className="letter"></div>
          <div className="letter"></div>
        </section>
        <section className='keyboard-container'>
          <div className='characters-container'>
            {generateAlphabetEl}
          </div>
          <div className='new-game-container'>
            <button type="button" className='new-game-button'>New Game</button>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
