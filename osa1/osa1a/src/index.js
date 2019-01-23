
import * as serviceWorker from './serviceWorker';

import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (<h1>{props.course}</h1>)
}

const Content = (props) => {
  return props.parts.map(p => <Part name={p.name} exercises={p.exercises} />)
}

const Part = (props) => {
  return (<p>{props.name} {props.exercises}</p>)
}

const Total = (props) => {
  let amount = 0;
  props.parts.map(p => amount += p.exercises)
  return (<p>{amount}</p>)
}

const App = () => {
  const course = 'Half Stack -sovelluskehitys'

  const parts = [
    {
      name: 'Reactin perusteet',
      exercises: 10
    },
    {
      name: 'Tiedonvälitys propseilla',
      exercises: 7
    },
    {
      name: "Komponenttien tila",
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
