import { useState } from 'react'
import { languages } from './languages';
import { clsx } from 'clsx';


function App() {
  const [currentWord, setCurrentWord] = useState('react')
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const [guessedLetters, setGuessedLetters] = useState([])


  
  // generate Language elements
  const languageElement = languages.map(language => <div className='language' style={{
    backgroundColor: language.backgroundColor,
    color: language.color}}
    key={language.name}
    >{language.name}</div>)
    
    // Generate Current word elements
    const secretWord = currentWord.split('')
    .map((letter, index) => <div className="letter" key={index}>{letter.toLocaleUpperCase()}</div>)
    
    // Generate Alphabets / Buttons
    const generateAlphabetEl = alphabet.split('').map(letter => {
      const isGuessed = guessedLetters.includes(letter)
      const isCorrect = isGuessed && currentWord.includes(letter)
      const isWrong = isGuessed && !currentWord.includes(letter)
      const className = clsx( 'character', {
          correct: isCorrect,
          incorrect: isWrong
      })
      

      return (
        <button 
        className={className}
        key={letter}
        value={letter.toUpperCase()}
        onClick={() => addGuessedLetter(letter)}
      >{letter.toUpperCase()}</button>
      )
    }
  )
      
      
      function addGuessedLetter(letter) {
        setGuessedLetters(prevGuess => 
          prevGuess.includes(letter) ?
          prevGuess :
          [...prevGuess, letter] 
        )
      }



      
      
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
            {languageElement}
          </div>
        </section>
        <section className='letters-container'>
          {secretWord}
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
