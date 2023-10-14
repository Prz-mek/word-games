import { Word } from "../model/WordList"
import { KEYS } from "../model/Keys";


interface IWordDisplayProps {
    wordToDisplay: Word;
    correctGuessedKeys: string[]
}

export default function WordDisplay(props: IWordDisplayProps) {
    
    // TODO optimize
    function hideLetters(text: string, revealedKeys: string[]) {
        for (let key of KEYS) {
            if (!revealedKeys.includes(key)) {
                text = text.split(key).join('_')
                text = text.split(key.toLocaleUpperCase()).join('_')
            }
        }
        return text
    }

    const wordText: string = hideLetters(props.wordToDisplay.text, props.correctGuessedKeys)
    return (
        <div>
            <div>
                {props.wordToDisplay.category}
            </div>
            <div>
                {props.wordToDisplay.hints ? props.wordToDisplay.hints[0] : "There is no hint"}
            </div>
            <div style={{fontSize: 40, letterSpacing: "0.2rem", fontFamily: "monospace"}}>
                {wordText}
            </div>
        </div>
    )
}