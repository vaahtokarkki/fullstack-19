import React from 'react'

const Header = ({course}) => {
    return (<h1>{course}</h1>)
}

const Content = ({parts}) => {
    return parts.map(p => <Part name={p.name} exercises={p.exercises} key={p.id} />)
}

const Part = ({name, exercises}) => {
    return (<p>{name} {exercises}</p>)
}

const Total = ({ parts }) => {
    const amount = parts.map(p => p.exercises).reduce((s, p) => s + p)
    return (<p>Yhteensä {amount} tehtävää</p>)

}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course

