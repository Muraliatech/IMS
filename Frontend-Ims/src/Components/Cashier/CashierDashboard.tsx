import axios from "axios";
import { useState, useEffect } from 'react';
import { Wallet, Package, User, Clock } from 'lucide-react';
import { OrderCard } from "./OrderCard";
import { BACKEND_URL } from "../../../Config";
 
export interface Product {
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

export interface OrderProduct {
  product: Product;
  quantity:number
}

export interface Customer {
  username: string;
  email: string;
}

export interface Order {
  id: string;
  totalAmount: number;
  customerId: string;
  products: OrderProduct[];
  customer: Customer;
  paymentStatus:string
  // status?: string; // Uncomment if your API sends a status
}

 

 
const CashierDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  // const [cashierOrder,setCashierorder]  = useState<Order[]>([]);
  useEffect(() => {
     
    const fetchOrders = async () => {
      try {
        const response = await axios(`${BACKEND_URL}/api/cashier/getOrders`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.data
        setOrders(data.orders);
        localStorage.setItem("CashierOrders",JSON.stringify(data.orders));
        // const cashierORDER = localStorage.getItem("CashierOrders");
        // const Orders = JSON.parse(cashierORDER);
        // setCashierorder(Orders);
        
        const revenue = data.orders.reduce((sum: number, order: Order) => sum + order.totalAmount, 0);
        const productsCount = data.orders.reduce((sum: number, order: Order) => sum + order.products.length, 0);
        
        setTotalRevenue(revenue);
        setTotalOrders(data.orders.length);
        setTotalProducts(productsCount);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>

<div className="flex justify-between  bg-gray-200 mt-10 ml-10 mr-10 p-5  rounded-2xl opacity-80 shadow-lg static">
        <div>
          <ul className="flex space-x-20 cursor-pointer">
            <li>
              <a onClick={() => (window.location.href = "/cashier")}>Cashier</a>
            </li>
            <li>
              <a>Orders</a>
            </li>
            <li>
              <a>cancelOrder</a>
            </li>
            <li>
              <a>Products</a>
            </li>
            <li>
              <a>Services</a>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex space-x-20 cursor-pointer">
            <li>
              <a>Profile</a>
            </li>
            <li>logout</li>
          </ul>
        </div>
      </div>
      <div>

      <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">${totalRevenue.toFixed(2)}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-green-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold">{totalOrders}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <User className="h-8 w-8 text-purple-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold">{totalProducts}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Pending Orders</p>
              <h3 className="text-2xl font-bold">
                {orders.filter((order: Order) => 
                   order.paymentStatus=="PENDING"
                ).length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
              
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}
export default CashierDashboard;