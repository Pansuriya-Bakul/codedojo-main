import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from 'react-toastify';
import { useUpdateCourseMutation, useGetCourseDetailsQuery, useUploadCourseVideoMutation } from "../../slices/productsApiSlice";

const CourseEditScreen = () => {

    const { learningPathId, courseId } = useParams();

    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [url, setUrl] = useState('');
    const [video, setVideo] = useState('');
    
    const { data: course, isLoading, refetch, error } = useGetCourseDetailsQuery({learningPathId, courseId});

    const [updateCourse, { isLoading: loadingUpdate }] = useUpdateCourseMutation();

    const [uploadCourseVideo] = useUploadCourseVideoMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if(course){
            setTitle(course.title);
            setAbstract(course.abstract);
            setUrl(course.url);
            setVideo(course.video);
        }
    }, [course])

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedCourse = {
            courseId,
            learningPathId,
            title,
            abstract,
            url,
            video
        };
        const result = await updateCourse(updatedCourse);
        if (result.error) {
            toast.error(result.error);
        } else {
            refetch();
            toast.success('Course Updated');
            navigate(`/admin/learningpath/${learningPathId}/courselist`)
        }
    };

    const uploadFileHandler = async (e) => {
        // console.log(e.target.files[0]);
        const formData = new FormData();
        formData.append('video', e.target.files[0]);
        try {
            const res = await uploadCourseVideo(formData).unwrap();
            toast.success(res.message);
            setVideo(res.video);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

  return (
    <>
        <Link to={`/admin/learningpath/${learningPathId}/courselist`} className="btn btn-light my-3">
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit Course</h1>
            {loadingUpdate && <Loader/>}
            {isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="title" className="my-2">
                        <Form.Label>Course Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Course title" value={title} onChange={(e) => setTitle(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="abstract" className="my-2">
                        <Form.Label>Abstract</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter Course Abstract" value={abstract} onChange={(e) => setAbstract(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="url" className="my-2">
                        <Form.Label>Url</Form.Label>
                        <Form.Control type="text" placeholder="Enter Url" value={url} onChange={(e) => setUrl(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="video" className="my-2">
                        <Form.Label>Video</Form.Label>
                        <Form.Control type="text" placeholder="Enter Video Url" value={video} onChange={(e) => setVideo(e.target.value)}></Form.Control>
                        <Form.Control type='file' label='Choose file' onChange={ uploadFileHandler}></Form.Control>
                    </Form.Group>

                    {/* Video Input Placeholder */}

                    <Button type="submit" variant="primary" className="my-2">
                        Update
                    </Button>
                </Form>
            )}
        </FormContainer>
    </>
  )
}

export default CourseEditScreen