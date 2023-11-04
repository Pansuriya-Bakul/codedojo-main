import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, ListGroup, Button, Card } from "react-bootstrap"
import { FaTrash } from "react-icons/fa"
import Message from "../components/Message"
import { removeFromCart } from "../slices/cartSlice"

const CartScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/payment')
    }

  return (
    <Row>
        <Col md={7}> 
            <h1 style={{marginBottom: '20px'}}>Shopping Cart</h1>
            { cartItems.length === 0 ? (
                <Message>
                    Your Cart is empty <Link to='/learningPaths'>Go Back</Link>
                </Message>
            ) : (
                <ListGroup variant="flush">
                    { cartItems.map((item) => (
                        <ListGroup.Item key={ item._id }>
                            <Row>
                                {/* <Col md={2}>
                                    <Image src={ item.image } alt={item.name} fluid rounded />
                                </Col> */}
                                <Col>
                                    <Link to={`/learningPaths/${item._id}/courses`} style={{marginRight: '30px'}}>{ item.name }</Link >
                                </Col>
                                <Col md={7}>
                                    CA$ { item.price }
                                </Col>
                                <Col md={1}>
                                    <Button type='button' variant='light' onClick={ () => removeFromCartHandler(item._id) }>
                                        <FaTrash />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) }
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>
                            Subtotal ({ cartItems.length }) Items
                        </h2>
                        CA$ { cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2) }
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
  )
}

export default CartScreen