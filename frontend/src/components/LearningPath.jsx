import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const LearningPath = ({learningPath}) => {
    
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/learningpaths/${learningPath._id}/courses`}/>
            {/* <Card.Img src={learningPath.image} variant="top"/> */}
        {/* </a> */}
        <Card.Body>
            <Link to={`/learningpaths/${learningPath._id}/courses`}>
                <Card.Title as='div' className='product-title'>
                    <strong>{learningPath.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as='div'>
                <Rating value={learningPath.rating} text={`${learningPath.numReviews} review(s)`}/>
            </Card.Text>

            <Card.Text as='h3'>
                CA$ {learningPath.price}
            </Card.Text>
          
        </Card.Body>
    </Card>
  )
}

export default LearningPath