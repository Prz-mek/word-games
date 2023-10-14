

interface IMistakesCountProps {
    mistakes: number;
    allowedMistakes: number;
}

export default function MistakesCount(props: IMistakesCountProps) {
    return (
        <div style={{display: "flex", justifyContent: "space-between", margin: "25px"}}>
            <span>Mistakes:</span>
            <span>{`${props.mistakes} / ${props.allowedMistakes}`}</span>
        </div>
    )
}