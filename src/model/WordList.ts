export enum Category {
    IDIOM = "IDIOM",
    PHRASAL_VERB = "PHRASAL VERB",
    FINANCE = "FINANCE",
    WORD = "WORD",
    PHRASE = "PHRASE",
    MACHINE_LEARNING = "MACHINE LEANING",
    PRODUCT_MANAGEMENT = "PRODUCT MANAGMENT",
    SOFTWARE_ARHITECTURE = "SOFTWARE_ARHITECTURE",
    DATABAZES = "DATABAZES",
    FRONTEND = "FRONTEND",
    BACKEND = "BACKEND",
    DEVOPS = "DEV OPS"
}

export interface Word {
    readonly text: string;
    readonly category: Category;
    hints: string[] | null;
    readonly allowedMistakes?: number
}


export const WORD_LIST: Word[] = [
    {
        text: "Break a leg!",
        category: Category.IDIOM,
        hints: [
            "Good luck!"
        ],
        allowedMistakes: 3
    },
    {
        text: "faint",
        category: Category.WORD,
        hints: [
            "feeling dizzy",
            "bearly perceptible"
        ],
        allowedMistakes: 3
    },
    {
        text: "Supervised learning",
        category: Category.MACHINE_LEARNING,
        hints: [
            "Metchod of training models on labeled data"
        ],
        allowedMistakes: 4
    }
];