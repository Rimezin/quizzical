import React from 'react'
import Answer from './Answer'
import {nanoid} from 'nanoid'
import he from 'he'

export default function Question(props) {
    const {question, answers, handleChange, submitted} = props     
        
    const renderAnswers = answers.map(ans => {
            return (
                <Answer
                    key={ans.answerId}
                    answer={ans}
                    questionId={question.questionId}
                    handleChange={handleChange}
                    submitted={submitted}
                />
            )
        }
    )
    
    return (
        <div className="quiz-question">
            <h3>{question.question}
                <span 
                    className="quiz-cat"
                    style={{backgroundColor: question.catColor}}
                >
                    {question.category}
                </span>
            </h3>
            <fieldset>
                {renderAnswers}
            </fieldset>
            
            <hr />
        </div>
    )
}