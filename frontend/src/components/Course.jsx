import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUserProfileQuery } from '../slices/usersApiSlice';

const Course = ({ learningPathId, course}) => {

    const { userInfo } = useSelector((state) => state.auth);

    const { data: profile } = useGetUserProfileQuery();

    let access = false;
    if(userInfo !== null){
    for (let i = 0; i < profile?.purchases?.length; i++){
          if (profile.isAdmin === true || profile.purchases[i].learningPathId === learningPathId){
            access = true;
          }
      }
    }
    
  return (

    <Card className='my-3 p-3 rounded'>
        {/* <Link to={`/login?redirect=/learningPaths/${learningPathId}/courses/${course._id}/quizzes`}/> */}
            {/* <Card.Img src={learningPath.image} variant="top"/> */}
            {/* </a> */}
            { access  ?
                <Card.Body>
                    <Link to={`/login?redirect=/learningpaths/${learningPathId}/courses/${course._id}/quizzes`}>
                        <Card.Title as='div' className='product-title'>
                            <strong>{course.title}</strong>
                        </Card.Title>
                    </Link>
                </Card.Body> 
            :
                <Card.Body>
                    {/* <Link disabled> */}
                        <Card.Title as='div' className='product-title'>
                            <strong>{course.title}</strong>
                        </Card.Title>
                    {/* </Link> */}
                </Card.Body>
            }   
    </Card>
  )
}

export default Course
