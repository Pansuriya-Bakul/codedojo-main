import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader'
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {

  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
    <h1>Orders</h1>
    { 
      isLoading 
      ?
        <Loader/> 
      : 
      error 
      ? 
        <Message variant='danger'>{error}</Message> 
      : 
        (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.userId && order.userId.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>CA$ {order.totalPrice}</td>
                  <td>
                    { order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{color: 'red'}}/>
                    ) }
                </td>
                <td>
                  <LinkContainer to={`/orders/${order._id}`}>
                    <Button variant='light' className='btn-sm'>Details</Button>
                  </LinkContainer>
                </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
    }
    
    </>
  )
}

export default OrderListScreen