import { LinkContainer } from 'react-router-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify'
import Message from '../../components/Message';
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate';
import { useGetLearningPathsQuery, useCreateLearningPathMutation, useDeleteLearningPathMutation } from '../../slices/productsApiSlice';


const LearningPathListScreen = () => {

    const { pageNumber } = useParams();

    const { data, isLoading, error, refetch } = useGetLearningPathsQuery({ pageNumber });

    const [ createLearningPath, { isLoading: loadingCreate }] = useCreateLearningPathMutation();

    const [ deleteLearningPath, {isLoading: loadingDelete }] = useDeleteLearningPathMutation();

    const deleteHandler = async (learningPathId) => {
        if (window.confirm('Are you sure? This will delete the Learning Path and all its Courses.')) {
            try {
                await deleteLearningPath(learningPathId);
                refetch();
                toast.success('LearningPath and Courses Deleted');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    const createLearningPathHandler = async () => {
        if (window.confirm('Are you sure you want to create a new Learning Path?')) {
            try {
                await createLearningPath();
                refetch();
                toast.success('LearningPath Created');
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

  return (
    <>
        <Row className='align-items-center'>
            <Col>
                <h1>LearningPaths</h1>
            </Col>
            <Col className='text-end'>
                <Button className='btn-sm m-3' onClick={ createLearningPathHandler }>
                    <FaEdit/> Create LearningPath
                </Button>
            </Col>
        </Row>

        {loadingCreate && <Loader/>}
        {loadingDelete && <Loader/>}

        {
        isLoading ? <Loader/> : error ? <Message  variant='danger'>{error}</Message> : (
            <>
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>LANGUAGE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.learningPaths.map((learningPath) => (
                                <tr key={learningPath._id}>
                                    <td>
                                        <Link to={`/admin/learningpath/${learningPath._id}/courselist`}>
                                            {learningPath._id}
                                        </Link>
                                    </td>
                                    <td>{learningPath.name}</td>
                                    <td>CA$ {learningPath.price}</td>
                                    <td>{learningPath.category}</td>
                                    <td>{learningPath.language}</td>
                                    <td>
                                        <LinkContainer to={`/admin/learningpath/${learningPath._id}/edit`}>
                                            <Button variant='light' className='btn-sm mx-2'><FaEdit/></Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={ () => deleteHandler(learningPath._id)}><FaTrash style={{color: 'white'}}/></Button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </Table>
                    <Paginate pages={data.pages} page={data.page} isAdmin={true}/>
            </>
        )
        }
    </>
  )
}

export default LearningPathListScreen