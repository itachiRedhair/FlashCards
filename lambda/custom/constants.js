module.exports = Object.freeze({

    sessionTableName: "sessionTable",
    secondTableName: "secondTableName",

    options: {
        QUESTIONS_PER_QUIZ: 5,
        TITLE: 'College'
    },

    languageStrings: {
        'en-US': {
            'translation': {
                'TITLE': "College",
                'WELCOME_LAUNCH': "Welcome to %s Flash Cards. For each card, I will say the name of a U.S. college or university, and you tell me which state the college is in.  You can say practice to practice all the cards, or say quiz to take a quiz. say Practice or Quiz",
                'WELCOME_PRACTICE': "Okay, Let\'s practice.  I will ask you all %s questions!  Answer by saying the name of a U.S. State. Are you ready to start?",
                'WELCOME_QUIZ': "Okay, I will ask you %s questions! Answer by saying the name of a U.S. State. Ready to start the quiz?",
                'HELP_MESSAGE': "I will ask you a series of questions. You can say practice to have me read all %s of the questions, or take a quiz of just %s questions. "
            }
        },
        // 'de-DE': {
        //     'translation' : {
        //         'TITLE'   : "Universität",
        //         'WELCOME_PRACTICE' : "",
        //         'WELCOME_QUIZ': ""
        //     }
        // }
    },

    questionList: [
        { question: "Brown", answer: ["Rhode Island", "Providence"] },
        { question: "Drexel", answer: ["Pennsylvania", "Philadelphia"] },
        { question: "Duke", answer: ["North Carolina", "Durham"] },
        { question: "Gonzaga", answer: ["Washington", "Spokane"] },
        { question: "Holy Cross", answer: ["Massachusetts", "Worcester"] },
        { question: "Villanova", answer: ["Pennsylvania", "Villanova"] },
        { question: "Hampton", answer: ["Virginia", "Hampton"] },
        { question: "Emory", answer: ["Georgia", "Atlanta"] },
        { question: "Columbia", answer: ["New York"] },
        { question: "Smith", answer: ["Massachusetts", "Northampton"] },
        // { question:"Navy",        answer:["Maryland","Annapolis"]        },
        // { question:"Army",        answer:["New York","West Point"]       },
        // { question:"Bucknell",    answer:["Pennsylvania","Lewisburg"]    },
        // { question:"Marquette",   answer:["Wisconsin","Milwaukee"]       },
        // { question:"Rice",        answer:["Texas","Houston"]             },
        // { question:"Vanderbilt",  answer:["Tennessee","Nashville"]       },
        // { question:"Baylor",      answer:["Texas","Waco"]                },
        // { question:"Butler",      answer:["Indiana","Indianapolis"]      },
        // { question:"Northwestern",answer:["Illinois","Chicago"]          },
        // { question:"Syracuse",    answer:["New York","Syracuse"]         }

    ],

    states: {
        START: "_START",

        PRACTICE: "_PRACTICE",
        QUIZ: "_QUIZ",

        RECAP_PRACTICE: "_RECAP_PRACTICE",
        RECAP_QUIZ: "_RECAP_QUIZ",
    }
}
)