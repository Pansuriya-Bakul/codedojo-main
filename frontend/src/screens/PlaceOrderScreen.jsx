import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, ListGroup, Card } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if(!cart.paymentMethod){
            navigate('/payment');
        }
    }, [cart.paymentMethod, navigate]);

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder ({
                orderItems: cart.cartItems,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/orders/${res._id}`);
        } catch (error) {
            toast.error(error)
        }
    }

  return (
    <>
        <CheckoutSteps step1 step2 step3 />
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item></ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>
                            Method: {cart.paymentMethod}
                        </strong>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <Message> Your Cart is Empty</Message>
                        ) : (
                            <ListGroup variant='flush'>
                                 {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col>
                                                <Link to={`/learningPaths/${item._id}/courses`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                CA$ {item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                 ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item></ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>

                    <ListGroup variant="flush">

                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>
                                    CA$ {cart.itemsPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>
                                    CA$ {cart.taxPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>
                                    CA$ {cart.totalPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            { error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button type="button" className="btn-block" disabled={cart.cartItems.length === 0} onClick={ placeOrderHandler }>
                                Place Order
                            </Button>
                            { isLoading && <Loader/>}
                        </ListGroup.Item>

                    </ListGroup>
                    
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen