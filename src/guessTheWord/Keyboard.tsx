// import { KEYS } from "../model/Keys";
import { GameStatus } from "../model/Game"
import './Keyboard.css'


const KEYBOARD_KEYS = {
  firstRow: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  secondRow: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  thirdRow: ["z", "x", "c", "v", "b", "n", "m"],
}

interface IKeyboardProps {
  addGussedLetter: (key: string) => void;
  readonly correctGuessedKeys: string[];
  readonly wrongGuessedKeys: string[];
  gameStatus: GameStatus;
  answer: string;
  onContinue: () => void
}

export default function Keyboard(props: IKeyboardProps) {

  function getButtonClass(key: string): string {
    if (props.correctGuessedKeys.includes(key)) {
      return "correct-button"
    }

    if (props.wrongGuessedKeys.includes(key)) {
      return "wrong-button"
    }

    return "active-button"
  }

  if (props.gameStatus == GameStatus.GAMEOVER) {
    return (
      <div>
        <div>GAMEOVER</div>
        <div>The answer is: {props.answer}</div>
        <button
          style={{margin: "20px"}}
          onClick={() => props.onContinue()}
        >
          CONTINUE
        </button>
      </div>
    );
  }

  if (props.gameStatus == GameStatus.WIN) {
    return (
      <div>
        <div>WIN</div>
        <button
          style={{margin: "20px"}}
          onClick={() => props.onContinue()}
        >
          CONTINUE
        </button>
      </div>
    );
  }


  return (
    <div>
      <div className="row">
        {KEYBOARD_KEYS.firstRow.map(key => {
          return (
            <button
              className={getButtonClass(key)}
              onClick={() => props.addGussedLetter(key)}
              key={key}
            >
              {key}
            </button>
          )
        })}
      </div>
      <div className="row">
        {KEYBOARD_KEYS.secondRow.map(key => {
          return (
            <button
              className={getButtonClass(key)}
              onClick={() => props.addGussedLetter(key)}
              key={key}
            >
              {key}
            </button>
          )
        })}
      </div>
      <div className="row">
        {KEYBOARD_KEYS.thirdRow.map(key => {
          return (
            <button
              className={getButtonClass(key)}
              onClick={() => props.addGussedLetter(key)}
              key={key}
            >
              {key}
            </button>
          )
        })}
      </div>

    </div>
  );
}