import { useState } from 'react'
import { languages } from './languages';
import { clsx } from 'clsx';
import { getFarewellText, getRandomWord } from './utils';
import { words } from './words';
import Confetti from 'react-confetti'


function App() {
  // State values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])

  // Derived values
  const numGuessesLeft = languages.length - 1
  const wrongGuessCounts = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameLost = wrongGuessCounts >= (languages.length - 1)
  const isGameWon = currentWord.split('').every(letter => guessedLetters.includes(letter))
  const isGameOver = isGameLost || isGameWon
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  
  // Static values
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'

  function resetGame() {
    setCurrentWord(() => getRandomWord())
    setGuessedLetters([])
  }

  
  // generate Language elements
  const languageElement = languages.map((language, index) => {
    const isLost = index < wrongGuessCounts ? true : false
    const className = clsx ('language', {
      lost: isLost
    })
    return (
      <div className={className} style={{
        backgroundColor: language.backgroundColor,
        color: language.color}}
        key={language.name}
        >{language.name}</div>
    )
  })
    
    // Generate Current word elements
    const secretWord = currentWord.split('')
    .map((letter, index) => {
      const shouldRevealLetter = isGameOver || guessedLetters.includes(letter)
      const letterClassName = clsx(
        'letter', 
        isGameLost && !guessedLetters.includes(letter) && "missed-letter"
      )
      return (
        <div className={letterClassName} key={index}>
          { shouldRevealLetter ? letter.toLocaleUpperCase() : ""}
        </div>
      )

        

    })
    
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
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        onClick={() => addGuessedLetter(letter)}
      >{letter.toUpperCase()}</button>
      )})      
      
      function addGuessedLetter(letter) {
        setGuessedLetters(prevGuess => 
          prevGuess.includes(letter) ?
          prevGuess :
          [...prevGuess, letter] 
        )
      }



      function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return <h1 className='info-'>{getFarewellText(languages[wrongGuessCounts - 1].name)}</h1>
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        } 
        if (isGameLost) {
          return (
            <>
              <h2>Game over!</h2>
              <p>You lose! Better start learning Assembly 😭</p>
            </>
          );
        }
        return null
    }

      return (
    <>
    {isGameWon && <Confetti recycle={false} numberOfPieces={1000}/>}
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        <div aria-live='polite' role='status' className={clsx("info", {
          won: isGameWon,
          lost: isGameLost,
          farewell: !isGameOver && isLastGuessIncorrect
        })}>
            {renderGameStatus()}
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

        <section 
          className='sr-only'
          aria-live="polite" 
          role="status"
        >
          <p>
            {currentWord.includes(lastGuessedLetter) ?
              `Correct! The letter ${lastGuessedLetter} is in the word.`:
              `Sorry, the letter ${lastGuessedLetter} is not in the word.`
              }
          You have {numGuessesLeft} attempts left.


          </p>
          <p>Currect word: {currentWord.split('').map(letter => 
            guessedLetters.includes(letter) ? letter + "." : "blank" + "."
          ).join(' ')
          }</p>
        </section>


        <section className='keyboard-container'>
          <div className='characters-container'>
            {generateAlphabetEl}
          </div>
          {isGameOver &&<div className='new-game-container'>
            <button type="button" className='new-game-button' onClick={resetGame}>New Game</button>
          </div>}
        </section>

      </main>
    </>
  )
}

export default App
