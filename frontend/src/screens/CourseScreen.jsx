import { useState} from 'react'
import { useParams, Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button} from 'react-bootstrap';
import { useGetCourseDetailsQuery, useGetQuizzesForCourseQuery } from '../slices/productsApiSlice';
import Quiz from '../components/Quiz'
import Loader from "../components/Loader";
import Message from '../components/Message'; 
// import { Player } from 'video-react'

const CourseScreen = () => {

    const { learningPathId, courseId } = useParams ();

    const {data: course, isLoading: courseIsLoading, isError: courseError  } = useGetCourseDetailsQuery({learningPathId, courseId});

    // const course = courseData.data
  
    // const courseIsLoading = courseData.isLoading
  
    // const courseError = courseData.isError  

    const { data: quizzes, isLoading: quizzesIsLoading, isError: quizzesError } = useGetQuizzesForCourseQuery({learningPathId, courseId});
  
    // const quizzes = quizzesData.data
    
    // const quizzesIsLoading = quizzesData.isLoading
    
    // const quizzesError = quizzesData.isError  

    const [test, setTest] = useState({})

  return (
    <>
        <Link className='btn btn-light my-3' to={`/learningpaths/${learningPathId}/courses`}>Go Back</Link>

        {courseIsLoading ? (
           <Loader/>
        ) : courseError ? (<Message variant='danger'>{courseError?.data?.message || courseError.error}</Message>) : ( <>
          <Row>
              <Col>
                  {/* <Player>
                    <source src='https://youtu.be/m-Pg80e6Ogk' />
                  </Player> */}
                  <video controls width="100%" height="400">
                    <source type="video/mp4" src={course.video} />
                  </video>
                  <ListGroup variant='flush'>
                      <ListGroup.Item></ListGroup.Item>

                      <ListGroup.Item>
                          <h3>{course.title}</h3>
                      </ListGroup.Item>

                      <ListGroup.Item className='center'> 
                              {course.abstract}  
                      </ListGroup.Item>    

                      <ListGroup.Item></ListGroup.Item>        
                  </ListGroup>

                  {/* {quizzesIsLoading ? (
                  <h4>Loading Quizzes...</h4>
                  ) : quizzesError ? (<Message variant='danger'>{quizzesError?.data?.message || quizzesError.error}</Message>) : ( <>
                    <h4>Quizzes: </h4>
                    <Row>
                        {quizzes.map( (quiz, index) => (
                            <Row key={index} >
                                <Quiz courseId={courseId} quiz={quiz} test={test}/>
                            </Row>
                        ))}
                    </Row>
                    <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Button style = {{justifyContent: 'center'}} className='btn-block' type='button'>
                                            Submit
                        </Button>
                    </div>
                  </>)} */}
              </Col>
          </Row>
        </>)}
    </>
  )
}

export default CourseScreen;