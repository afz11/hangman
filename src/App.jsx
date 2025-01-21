import { useState } from 'react'
import { languages } from './languages';
import { clsx } from 'clsx';


function App() {
  const [currentWord, setCurrentWord] = useState('react')
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
  const [guessedLetters, setGuessedLetters] = useState([])
  const [letterStatuses, setLetterStatuses] = useState(() => 
    alphabet.reduce((acc, letter) => {
      acc[letter] = {letter, status: 'not guessed'}; // Set a property on the accumulator object
      return acc; // Return the updated accumulator
    }, {}))

  
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
    const generateAlphabetEl = alphabet.map(letter =>
      <button 
        className={clsx(
          'character', // Base class
          {
            correct: letterStatuses[letter]?.status === 'correct', // Add 'correct' class if status is 'correct'
            incorrect: letterStatuses[letter]?.status === 'incorrect', // Add 'incorrect' class if status is 'incorrect'
          }
        )}
        key={letter}
        value={letter}
        status={letterStatuses[letter].status}
        onClick={() => addGuessedLetter(letter)}
      >{letter}</button>)
      
      
      function addGuessedLetter(letter) {
        setGuessedLetters(prevGuess => 
          prevGuess.includes(letter) ?
          prevGuess :
          [...prevGuess, letter] 
        )
        checkGuessedLetter(letter)
      }


      function checkGuessedLetter(letter) {
        const secretWord = currentWord.toLocaleUpperCase().split('')
        secretWord.includes(letter) ?
        setLetterStatuses((prev) => ({...prev , [letter]: {...prev[letter], status: "correct"} })) :
        setLetterStatuses(prev => ({...prev, [letter]: {...prev[letter], status: "incorrect"} }))
      }

      console.log(letterStatuses)
      
      
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
