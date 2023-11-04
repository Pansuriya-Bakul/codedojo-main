import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/loginSlice'
// import SearchBox from './SearchBox';
// import logo from '../assets/logo.png'

const Header = () => {

    // const { data: profile } = useGetUserProfileQuery();

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logOutHandler = async () => {
       try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate('/login');
       } catch (err) {;
        console.log(err)
       }
    }

  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container>
                <LinkContainer to='/learningpaths'>
                <Navbar.Brand>
                    {/* <img src={logo} alt='CodeDOJO'/> */}
                    CodeDOJO
                </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        {/* <SearchBox/> */}
                        { !userInfo?.isAdmin && (
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <FaShoppingCart/> Cart 
                                {
                                    cartItems.length > 0 && (
                                        <Badge pill bg='success' style={{marginLeft:'5px'}}>
                                            {cartItems.length}
                                        </Badge>
                                    )
                                } 
                            </Nav.Link>
                        </LinkContainer>
                        )}
                        
                        { userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/learningpathlist'>
                                    <NavDropdown.Item>LearningPaths</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}

                        { userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item> Profile </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logOutHandler}> 
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link href='/login'><FaUser/> Sign In</Nav.Link>
                            </LinkContainer>
                        )}
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header