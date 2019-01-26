import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const total = good + bad + neutral
    const avg = (good + (-1 * bad)) / total
    const goodPercentage = good / total * 100

    if (total === 0) return (<p>Ei yhtään palautetta annettu</p>)

    return (
        <table>
            <thead>
                <tr><th>Tilasto</th><th>Määrä</th></tr>
            </thead>
            <tbody>
                <Statistic text="hyvä" value={good} />
                <Statistic text="neutraali" value={neutral} />
                <Statistic text="huono" value={bad} />
                <Statistic text="yhteensä" value={total} />
                <Statistic text="keskiarvo" value={avg} />
                <Statistic text="positiivisia" value={goodPercentage + "%"} />
            </tbody>
        </table>
    )

}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handlePositive = () => {
        setGood(good + 1)
    }

    const handleNegative = () => {
        setBad(bad + 1)
    }

    const handleNeutral = () => {
        setNeutral(neutral + 1)
    }

    return (
        <div>
            <h1>anna palautetta</h1>

            <Button handleClick={handlePositive} text="hyvä" />
            <Button handleClick={handleNeutral} text="neutraali" />
            <Button handleClick={handleNegative} text="huono" />

            <h1>statistiikka</h1>

            <Statistics good={good} neutral={neutral} bad={bad} />


        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)