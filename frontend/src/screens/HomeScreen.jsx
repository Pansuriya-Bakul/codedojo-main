import {Row, Col} from 'react-bootstrap';
import { useGetLearningPathsQuery } from '../slices/productsApiSlice';
import LearningPath from '../components/LearningPath';
import Loader from "../components/Loader";
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { useParams } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import SearchBox from '../components/SearchBox';

const HomeScreen = () => {

  const { pageNumber, keyword } = useParams();

  const {data, isLoading, error }  = useGetLearningPathsQuery({keyword, pageNumber});

  return (
    <>
        <Row>
          <SearchBox/>
        </Row>
        { keyword && <Link to='/learningpaths' className='btn btn-light mt-4 mb-4'>Go Back</Link>}
        { isLoading ? (
          <Loader/>
        ) : error ? (<Message variant='danger'>{ error?.data?.message || error.error }</Message>) : (<>
          <h1>Learning Paths</h1>
          <Row>
              {data.learningPaths.map( (learningPath) => (
                  learningPath.isActive && 
                  ( 
                    <Col key={learningPath._id} sm={12} md={6} lg={4} xl={3}>
                        <LearningPath learningPath={learningPath}/>
                    </Col>
                  )
              ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} keyword = {keyword ? keyword : ''}/>
        </>) } 
    </>
  )
}

export default HomeScreen