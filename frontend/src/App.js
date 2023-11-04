import { Container } from 'react-bootstrap';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const App = () => {

  const currentPath =  useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if(currentPath.pathname === "/"){
      navigate("/learningPaths")
    }
  }, [] )

  return (
    <>
    <Header/>
    <main className='py-3'>
      <Container>
        <Outlet/>
      </Container>
    </main>
    <Footer/>
    <ToastContainer/>
    </>
  )
}

export default App