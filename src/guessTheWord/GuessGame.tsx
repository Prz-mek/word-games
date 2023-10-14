import { useEffect, useState } from "react"
import Keyboard from "./Keyboard"
import { Word, WORD_LIST} from '../model/WordList'
import WordDisplay from "./WordDisplay";
import MistakesCount from "./MistakesCount";
import { GameStatus } from "../model/Game";
import { KEYS } from "../model/Keys";

const DEFAULT_MAX_MISTAKES = 10;


export default function GuessGame() {
    const [word, setWord] = useState<Word>(getRandomWord(WORD_LIST));
    const [correctGuessedKeys, setCorrectGuessedKeys] = useState<string[]>([]);
    const [wrongGuessedKeys, setWrongGuessedKeys] = useState<string[]>([]);
    const [madeMistakesCount, setMadeMistakesCount] = useState<number>(0);
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.IN_GAME);

    function getRandomWord(wordList: Word[]): Word {
        const randomWordIndex = Math.floor(Math.random() * wordList.length);
        let wordCopy = structuredClone(wordList[randomWordIndex])
        if (wordCopy.hints) {
            const randomHintIndex = Math.floor(Math.random() * wordCopy.hints.length);
            wordCopy.hints = [wordCopy.hints[randomHintIndex]]
        }
        return wordCopy
    }

    function loadNewWord() {
        setMadeMistakesCount(0);
        setWord(getRandomWord(WORD_LIST));
        setCorrectGuessedKeys([]);
        setWrongGuessedKeys([]);
        setGameStatus(GameStatus.IN_GAME);
    }

    function isWin() {
        let counter = 0;
        for (let key of KEYS) {
            if (word.text.includes(key) || word.text.includes(key.toLocaleUpperCase()) || word.text.includes(key.toLocaleLowerCase())) {
                counter++;
            }
        }
        return counter == correctGuessedKeys.length;
    }

    // TODO optimize
    function addGussedLetter(key: string) {
        if (KEYS.includes(key) && !correctGuessedKeys.includes(key) && !wrongGuessedKeys.includes(key)) {
            if (word.text.includes(key) || word.text.includes(key.toLocaleUpperCase()) || word.text.includes(key.toLocaleLowerCase())) {
                setCorrectGuessedKeys(prevList => [...prevList, key])
            } else {
                setWrongGuessedKeys(prevList => [...prevList, key])
                setMadeMistakesCount(prevMistakesCount => prevMistakesCount + 1)
            }
        }
    }

    useEffect(() => {
        if (isGameOver()) {
            setGameStatus(GameStatus.GAMEOVER)
        } else if (isWin()) {
            setGameStatus(GameStatus.WIN);
        }
    }, [correctGuessedKeys, wrongGuessedKeys, madeMistakesCount])

    function isGameOver(): boolean {
        const maxMistakes = word.allowedMistakes ? word.allowedMistakes : DEFAULT_MAX_MISTAKES;
        return madeMistakesCount >= maxMistakes;
    }

    return (
        <div>
            <div>
                <WordDisplay  wordToDisplay={word} correctGuessedKeys={correctGuessedKeys} />
            </div>
            <div>
                <MistakesCount mistakes={madeMistakesCount} allowedMistakes={word.allowedMistakes ? word.allowedMistakes : DEFAULT_MAX_MISTAKES} />
            </div>
            <div>
                <Keyboard answer={word.text} gameStatus={gameStatus} onContinue={loadNewWord} addGussedLetter={addGussedLetter} correctGuessedKeys={correctGuessedKeys} wrongGuessedKeys={wrongGuessedKeys}/>
            </div>
        </div>
    )
}
