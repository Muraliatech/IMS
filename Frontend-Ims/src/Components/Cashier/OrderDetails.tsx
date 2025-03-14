import  { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Receipt, Package, User } from "lucide-react";
import { BACKEND_URL } from '../../../Config';
import { ProcessPayment } from './ProcessPayment';
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  SKU: string;
  seasonality?: string | null;
  shelfLife?: number | null;
  imageUrls: string[];
}

interface OrderProduct {
  product: Product;
  quantity: number;
}

interface Customer {
  username: string;
  email: string;
}

interface OrderDetailsProps {
  id: string;
  totalAmount: number;
  customerId: string;
  products: OrderProduct[];
  customer: Customer;
  paymentStatus: string;
}

const OrderDetails = () => {
    const [error,setError]=useState("")
    const [success,setSuccess] = useState("")
    const { orderId } = useParams();
    const [order, setOrder] = useState<OrderDetailsProps | null>(null);
      const [showPayment, setShowPayment] = useState(false);
        const navigate = useNavigate();
      // Use appropriate types for state
      const [orderId1, setOrderID] = useState<string | undefined>(undefined);
      const [amt, setAmount] = useState<number | undefined>(undefined);
    useEffect(() => {
      const storedOrder = localStorage.getItem("CashierOrders");
      if (storedOrder) {
        try {
          const orders = JSON.parse(storedOrder);
          console.log("Parsed Orders:", orders); // Debugging line
    
          if (Array.isArray(orders)) {
            const orderDetails = orders.find((order: OrderDetailsProps) => order.id === orderId);
            console.log("Order Details:", orderDetails); // Debugging line
            if (orderDetails) {
              setOrder(orderDetails); // Directly set the order object
            } else {
              console.error("Order not found!");
            }
          } else {
            console.error("Invalid format: Orders is not an array");
          }
        } catch (error) {
          console.error("Error parsing order data:", error);
        }
      } else {
        console.warn("No orders found in localStorage");
      }
    }, [orderId]);
    
    if (!order) {
      return <div>Loading...</div>;
    }
  
    const calculateTotal = () => {
      if (!order.products || !Array.isArray(order.products)) return 0;
      return order.products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    };


    const Payment = async function () {
        try {
          const productMap = new Map();
          order.products.forEach((p) => {
            const productId = p.product.id;
            if (productMap.has(productId)) {
              productMap.set(productId, productMap.get(productId) + 1);
            } else {
              productMap.set(productId, 1);
            }
          });
    
          const products = Array.from(productMap.entries()).map(
            ([productId, quantity]) => ({
              productId,
              quantity,
            })
          );
    
          const totalAmount = order.products.reduce((total, p) => {
            return total + p.product.price * (p.quantity || 1);
          }, 0);
    
          const response = await axios.post(
            `${BACKEND_URL}/api/cashier/order`,
            { orderId:order.id,
              customerId: order.customerId,
              products: products,
              totalAmount: parseFloat(totalAmount.toFixed(2)),
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          console.log(response.data.order);
    
          const orderId = response.data.order.razorpayOrderId;
          const amt = response.data.order.totalAmount;
    
          setOrderID(orderId);
          setAmount(amt);
    
          setShowPayment(true);
          console.log(orderId + " " + amt + " " + showPayment);
        } catch {
          alert("Order failed. Please try again.");
        }
      };
    
    
      const handleCancel = async (orderId: string) => {
        try {
          const response = await axios.post(
            `${BACKEND_URL}/api/cashier/cancelorder`,
            { orderId },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
      
          if (response.status === 200 || response.status === 204) {
         
            //console.log("Order cancelled successfully");
            setSuccess(response.data.message || "Order has been cancelled.");
           navigate("/cashierDashboard");
          } else {
            setError(response.data.message || "Failed to cancel order.");
            console.log("Error:", response.data);
            navigate("/cashierDashboard")
          }
        } catch (err: any) {
          if (err.response) {
            if (err.response.status === 409) {
              setError("Order is already canceled.");
              navigate("/cashierDashboard")
            } else {
              setError(err.response.data.message || "An error occurred.");
            }
          } else {
            setError("Network error. Please try again.");
          }
          console.error("Error cancelling order:", err);
        }
      };
      
      
  
    return (
      <div>

              <div className='text-right '>
              {error && <div className="text-red-500 text-xl text-center mr-5 mt-5 font-bold ">{error}</div>}
              {success && <div className="text-green-500 text-xl text-center mr-5 mt-5 font-bold ">{success}</div>}
              </div>
      

        <div className='text-center text-2xl text-gray-900 mt-15 font-bold'>
          <h2>Order Details</h2>
        </div>
        <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center mt-5">
          <div className="border-b p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">Order Receipt</h2>
              <Receipt className="text-gray-600" size={24} />
            </div>
            <p className="text-sm text-gray-600">Order ID: {order.id}</p>
          </div>
     
          <div className="border-b p-4">
            <div className="flex items-center gap-2 mb-2">
              <User size={20} className="text-gray-600" />
              <h3 className="font-semibold">Customer Details</h3>
            </div>
            <p className="text-sm">{order.customer.username}</p>
            <p className="text-sm text-gray-600">{order.customer.email}</p>
          </div>
         
          <div className="p-4 border-b">
            <div className="flex items-center gap-2 mb-3">
              <Package size={20} className="text-gray-600" />
              <h3 className="font-semibold">Order Item</h3>
            </div>
            <div className="space-y-3">
              {order?.products?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start pb-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-medium">
                      {item?.product?.name || "Unknown Product"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item?.product?.SKU || "No SKU"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item?.product?.description || "No description available"}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-medium">
                      {(item?.product?.price || 0).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Subtotal:</span>
              <span>{calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
              <span>Tax (10%):</span>
              <span>{(calculateTotal() * 0.1).toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center font-bold">
                <span>Total:</span>
                <span>{(calculateTotal() * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
  
          <div className="border-t mb-2 flex space-x-10 px-2 py-4">
   
  <button
    onClick={Payment}
    className="w-full bg-green-600 hover:bg-blue-800 text-white  px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
  >
    Order
  </button>

 
  {showPayment && orderId1 && amt && <ProcessPayment orderId={orderId1} amount={amt} />}

  
  <button
    onClick={() => handleCancel(order.id)}
    className="w-full bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
  >
    Cancel Order
  </button>
</div>

        </div>
      </div>
    );
  };
  
  export default OrderDetails;
  

