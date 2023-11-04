import { Card } from 'react-bootstrap';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Course = ({ quiz, test }) => {

    const [checked, setChecked] = useState(undefined)

    // console.log(test)

    function onselect() {
    }

    return (
        <>
            <Card className='my-3 p-3 rounded'>
                {/* <ol>
            <li> */}
                <Card.Body>
                    {/* <Card.Title as='div' className='product-title'>
                            <strong>{quiz.question}</strong>
                        </Card.Title>
                        <div style = {{marginLeft: 20}}> <input onChange={onselect} type='radio' value={false} name='options'/>  {quiz.options[0]} </div>
                        <div style = {{marginLeft: 20}}> <input onChange={onselect} type='radio' value={false} name='options'/>  {quiz.options[1]} </div>
                        <div style = {{marginLeft: 20}}> <input onChange={onselect} type='radio' value={false} name='options'/>  {quiz.options[2]} </div>
                        <div style = {{marginLeft: 20}}> <input onChange={onselect} type='radio' value={false} name='options'/>  {quiz.options[3]} </div> */}
                    <Card.Title>{quiz.question}</Card.Title>
                    <ul key={quiz._id}>
                        {
                            quiz.options.map((q, i) => (
                                <div key={i}>
                                    <input type='radio' value={false} id = {`q${i}-option`} name={`quiz-${quiz._id}-answer`} onChange={onselect()} />
                                    <label htmlFor={`q${i}-option`}> &nbsp; {q} </label>
                                </div>
                            )
                            )}
                    </ul>
                </Card.Body>
                {/* </li>
        </ol> */}
            </Card>
        </>
    )
}

export default Course