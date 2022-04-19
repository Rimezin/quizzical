import React from 'react'

export default function Answer(props) {
    const {questionId, answer, handleChange, submitted} = props
    
    // Determine styling for answer //
    function setBackground() {
        let bgColor = 'white'
        if (!submitted) {
            // If not submitted, operate as normal //
            bgColor = answer.isChecked ? '#a39ec5' : 'white'
        } else if (answer.isChecked) {
            // If submitted and checked.
            bgColor = answer.isCorrect ? '#9ec5a3' : '#c5a39e'
        } else if (!answer.isChecked){
            // If submitted and not checked.
            bgColor = answer.isCorrect ? '#9ec5a3' : 'whitesmoke'
        }
        
        return bgColor;
    }
    
    const answerStyling = {
        backgroundColor: setBackground()
    }
    
    // Function to simulate <input> click if user clicks outside of text
    function handleClick() {
        document.getElementById(answer.answerId).click()
    }
    
    return (
        <div
            className={submitted ? "question-answer disabled" : "question-answer"}
            style={answerStyling}
            onClick={handleClick}
        >
            <input 
                value={answer.answerLabel}
                type="radio"
                name={questionId}
                id={answer.answerId}
                checked={answer.isChecked}
                style={{display: "none"}}
                onChange={handleChange}
            />
            <label htmlFor={answer.answerId}>{answer.answerLabel}</label>
            
        </div>
    )
}