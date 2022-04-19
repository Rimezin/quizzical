import React from 'react'

export default function Splash(props) {
    const {clickStart, chooseDifficulty, chooseCategory} = props
    
    return (
        <form className="container container-condensed center">
            <h1>Quizzical</h1>
            <label htmlFor="difficultySelector">Choose your destiny:</label>
            <select 
                id="difficultySelector"
                onChange={(value) => chooseDifficulty(value)}
            >
                <option name="easy">Easy</option>
                <option name="medium">Medium</option>
                <option name="hard">Hard</option>
            </select>
            <select 
                id="categorySelector"
                onChange={(value) => chooseCategory(value)}
            >
                <option value="any">Any Category</option>
                <option value="27">Animals</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="10">Entertainment: Books</option>
                <option value="32">Entertainment: Cartoon & Animation</option>
                <option value="29">Entertainment: Comics</option>
                <option value="11">Entertainment: Film</option>
                <option value="31">Entertainment: Japanese Anime & Manga</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals & Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="9">General Knowledge</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="20">Mythology</option>
                <option value="24">Politics</option>
                <option value="17">Science & Nature</option>
                <option value="18">Science: Computers</option>
                <option value="30">Science: Gadgets</option>
                <option value="19">Science: Mathematics</option>
                <option value="21">Sports</option>
                <option value="28">Vehicles</option>
            </select>
            <button
                onClick={clickStart}
                className="button-normal"
            >
                Start Quiz
            </button>
            <span className="small-text">Powered by Open Trivia API</span>
        </form>
    )
}