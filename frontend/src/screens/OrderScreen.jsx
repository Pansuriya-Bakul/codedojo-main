import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery } from '../slices/ordersApiSlice';

const OrderScreen = () => {

    const { orderId: orderId } = useParams();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    const [ payOrder, { isLoading: loadingPay } ] = usePayOrderMutation();

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
      if (!errorPayPal && !loadingPayPal && paypal.clientId) {
        const loadPayPalScript = async () => {
          paypalDispatch({
            type: 'resetOptions',
            value: {
              'client-id': paypal.clientId,
              currency: 'CAD'
            }
          });
          paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
        }
        if (order && !order.isPaid) {
          if (!window.paypal) {
            loadPayPalScript();
          }
        }
      }
    }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

    function onApprove(data, actions) {
      return actions.order.capture().then(async function (details) {
        try {
          await payOrder ({orderId, details});
          refetch();
          toast.success('Payment successful');
        } catch (err) {
          toast.error(err?.data?.message || err.message)
        }
      });
    }

    async function payOrderHandler() {
      await payOrder ({orderId, details: {payer: {} }});
      refetch();
      toast.success('Payment successful');
    }

    function onError(err) {
      toast.error(err.message);
    }

    function createOrder (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice
            }
          }
        ]
      }).then((orderId) => {
        return orderId;
      });
    }

    // console.log(order)
    // console.log(order)

  return isLoading ? <Loader/> : error ? <Message variant='dange' /> : (
    <>
        {/* <Link className='btn btn-light my-3' to="/profile">Profile</Link> */}
        <h1>Order: {order._id}</h1>
        <Row>
            <Col md={8}>
            <ListGroup>  
              <ListGroup.Item>
                <h2>User Details</h2>
                <p>
                  <strong>Name: </strong> {order.userId.name}
                </p>
                <p>
                  <strong>Email: </strong> {order.userId.email}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong> {order.paymentMethod}
                </p>
                  {order.isPaid ? (
                    <Message variant='success'>
                      Paid on {order.paidAt}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not Paid</Message>
                  )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                    <Col>
                        <Link to={`/learningPaths/${item.learningPathId}/courses`}>
                          {item.name}
                        </Link>
                    </Col>
                    <Col md={2}>
                      CA$ {item.price}
                    </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup.Item>
            </ListGroup>  
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items: </Col>
                      <Col>CA$ {order.itemsPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Tax: </Col>
                      <Col>CA$ {order.taxPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Total: </Col>
                      <Col>CA$ {order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader/>}

                      {isPending ? <Loader/> : (
                        <div>
                            {/* <Button onClick={payOrderHandler} style={{marginBottom: '10px'}}>Test Pay Order</Button> */}
                          <div>
                            <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
                          </div>
                        </div>
                      )}
                    </ListGroup.Item>
                  )}
                
                  { loadingPay && <Loader/>}
                  { userInfo && userInfo.isAdmin && !order.isPaid && (
                    <ListGroup.Item>
                      <Button type='button' className='btn btn-block' onClick={payOrderHandler}>Mark as Paid</Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
        </Row>
    </>
  );

}

export default OrderScreen