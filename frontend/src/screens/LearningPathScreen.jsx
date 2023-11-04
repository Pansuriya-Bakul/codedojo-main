import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import { useGetLearningPathDetailsQuery, useGetCoursesForLearningPathQuery, useCreateReviewMutation } from '../slices/productsApiSlice';
import { useGetUserProfileQuery } from '../slices/usersApiSlice';
import Course from '../components/Course'
import Rating from '../components/Rating';
import Loader from "../components/Loader";
import Message from '../components/Message'; 
import { addToCart } from '../slices/cartSlice';
import { FaInfoCircle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useState } from 'react';

const LearningPathScreen = () => {

    const { learningPathId: learningPathId} = useParams ();

    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { data : learningPath, isLoading : learningPathIsLoading, isError : learningPathError, refetch } = useGetLearningPathDetailsQuery(learningPathId);

    const { data : courses, isLoading : coursesIsLoading, isError : coursesError } = useGetCoursesForLearningPathQuery(learningPathId);

    const [createReview, { isLoading: loadingLearningPathReview }] = useCreateReviewMutation();

    const addToCartHandler = () => {
      dispatch(addToCart({ ...learningPath}));
      navigate('/cart')
    }
  
    let local = JSON.parse(localStorage.getItem("cart")); 
    let button = false;
    if(local !== null){
    for (let i = 0; i < local.cartItems.length; i++){
          if (local.cartItems[i]._id === learningPathId){
            button = true
          }
      }
    }

    const { data: profile } = useGetUserProfileQuery();

    let access = false;
    if(userInfo !== null){
      for (let i = 0; i < profile?.purchases?.length; i++){
          if (profile?.isAdmin === true || profile?.purchases[i]?.learningPathId === learningPathId){
            access = true;
          }
      }
      // for (let i = 0; i < userInfo.purchases.length; i++){
      //   if (userInfo.isAdmin === true || userInfo.purchases[i].learningPathId === learningPathId){
      //     access = true;
      //   }
      // }
    }

    const submitHandler = async (e) =>{
      e.preventDefault();
      try {
        await createReview({
          learningPathId,
          rating,
          comment
        }).unwrap();
        refetch();
        toast.success('Review Submitted');
        setRating(0);
        setComment('')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }

  return (
    <>
        <Link className='btn btn-light my-3' to="/learningpaths">Go Back</Link>

        {learningPathIsLoading ? (
          <Loader/>
        ) : learningPathError ? (<Message variant='danger'>{learningPathError?.data?.message || learningPathError.error}</Message>) : ( <>
          { access  
          ? 
            <Button style = {{display: 'none'}}> Add To Cart </Button>
          :
            
            <Button style = {{marginLeft: 20}} className='btn-block' type='button' disabled={learningPath.isActive === false || button === true} onClick={addToCartHandler}> Add To Cart </Button>
          }
          <Row>
            <Col md={5}>
                <ListGroup variant='flush'>
                    <ListGroup.Item></ListGroup.Item>
                      <ListGroup.Item>
                          <h3><strong>{learningPath.name}</strong></h3>
                      </ListGroup.Item>
                      <ListGroup.Item><strong>LearningPath Description:</strong> {learningPath.description}</ListGroup.Item>  
                      <ListGroup.Item><strong>Price:</strong> ${learningPath.price}</ListGroup.Item>
                      <ListGroup.Item>
                          <Rating value={learningPath.rating} text={`${learningPath.numReviews} review(s)`}/>
                      </ListGroup.Item>  
                      <ListGroup.Item></ListGroup.Item>        
                </ListGroup>

                {coursesIsLoading ? (
                <h4>Loading Courses...</h4>
                ) : coursesError ? (<Message variant='danger'>{coursesError?.data?.message || coursesError.error}</Message>) : ( <>
                    { access  
                    ? 
                    <h4>Courses: </h4> 
                    : 
                    <>
                      <h4>Courses: </h4> 
                      <h6> <FaInfoCircle/> Purchase LearningPath to gain access to courses</h6>
                    </>
                    }
                    <Row>
                        {courses.map( (course, index) => (
                            <Col key={index}>
                                <Course learningPathId={learningPathId} course={course}/>
                            </Col>
                        ))}
                    </Row>
                </>)}
            </Col>
            { !userInfo?.isAdmin && (
                <Col md={5} className='review'>
                
                  <h2>Reviews</h2>
                  {learningPath.reviews.length === 0 && <Message>No Reviews</Message>}
                
                  <ListGroup variant='flush'>
                      {learningPath.reviews.map(review => (
                        <ListGroup.Item key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating}/>
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      ))}
                      <ListGroup.Item>
                        <h2>Write a Customer Review</h2>
                        {loadingLearningPathReview && <Loader/>}
                        { userInfo ? (
                          <Form onSubmit={submitHandler}>
                            <Form.Group controlId='rating' className='my-2'>
                              <Form.Label>Rating</Form.Label>
                              <Form.Control as='select' value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                                <option value=''>Select...</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Very Good</option>
                                <option value='5'>5 - Excellent</option>
                              </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='comment' className='my-2'>
                              <Form.Label>Comment</Form.Label>
                              <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Button disabled={loadingLearningPathReview} type='submit' variant='primary'>
                              Submit
                            </Button>
                          </Form>
                        ) : (
                          <Message> Please <Link to='/login'>login</Link> to write a review</Message>
                        )}
                      </ListGroup.Item>
                  </ListGroup>
              
                </Col>
              )}
          </Row>
        </>)}    
    </>
  )
}

export default LearningPathScreen