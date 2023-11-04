import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from 'react-toastify';
import { useUpdateLearningPathMutation, useGetLearningPathDetailsQuery } from "../../slices/productsApiSlice";

const LearningPathEditScreen = () => {

    const { learningPathId } = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [language, setLanguage] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [isActive, setIsActive] = useState('');

    const { data: learningPath, isLoading, refetch, error } = useGetLearningPathDetailsQuery(learningPathId);

    const [updateLearningPath, { isLoading: loadingUpdate }] = useUpdateLearningPathMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if(learningPath){
            setName(learningPath.name);
            setDescription(learningPath.description);
            setPrice(learningPath.price);
            setLanguage(learningPath.language);
            setCategory(learningPath.category);
            setIsActive(learningPath.isActive);
        }
    }, [learningPath])

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedLearningPath = {
            learningPathId,
            name,
            description,
            price,
            language,
            category,
            isActive
        };
        const result = await updateLearningPath(updatedLearningPath);
        if (result.error) {
            toast.error(result.error);
        } else {
            refetch();
            toast.success('LearningPath Updated');
            navigate('/admin/learningpathlist')
        }
    }

  return (
    <>
        <Link to='/admin/learningpathlist' className="btn btn-light my-3">
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit LearningPath</h1>
            {loadingUpdate && <Loader/>}
            {isLoading ? <Loader/> : error ? <Message vaeriant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name" className="my-2">
                        <Form.Label>Learning Path Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Learning Path name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="description" className="my-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Learning Path Description" value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="price" className="my-2">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" pattern="[0-9]*" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="language" className="my-2">
                        <Form.Label>Language</Form.Label>
                        <Form.Control type="text" placeholder="Enter Language" value={language} onChange={(e) => setLanguage(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="category" className="my-2">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="isActive" className="my-2">
                        {/* <Form.Label>Learning Path Visibility (isActive)</Form.Label>
                        <Form.Control type="boolean" placeholder="Enter true or false" value={isActive} onChange={(e) => setIsActive(e.target.value)}></Form.Control> */}
                        <Form.Check type="checkbox" label='Learning Path Visibility (isActive)' checked={isActive} onChange={(e) => setIsActive(e.target.checked)}></Form.Check>
                    </Form.Group>

                    <Button type="submit" variant="primary" className="my-2">
                        Update
                    </Button>
                </Form>
            )}
        </FormContainer>
    </>
  )
}

export default LearningPathEditScreen