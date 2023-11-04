import { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const SearchBox = () => {

    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || '');

    const submitHandler = async (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`search/${keyword}`);
            setKeyword('');
        } else {
            navigate('/learningpaths');
        }
    }

  return (
    <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control type="text" name="q" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search for a Learning Path..." className="mr-sm-2 ml-sm-5"/>
        <Button type="submit" variant="outline-success" className="p-2 mx-2">Search</Button>
    </Form>
  )
}

export default SearchBox