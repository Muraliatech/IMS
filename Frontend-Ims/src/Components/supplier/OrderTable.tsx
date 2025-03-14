// components/OrdersTable.jsx
import { useState } from 'react';
import { proposePriceForOrder, updateProductionStatus, initiateQualityCheck, updateShippingStatus } from './api/supplier';

function OrdersTable() {
  const [orders, setOrders] = useState([
    { id: 1, product: "Smartphone X", quantity: 120, status: "Pending", priceProposed: null, qcStatus: "Not Started", shippingStatus: "Not Shipped" },
    { id: 2, product: "Laptop Pro", quantity: 70, status: "In Production", priceProposed: 1500, qcStatus: "Pending", shippingStatus: "Not Shipped" },
    { id: 3, product: "Wireless Earbuds", quantity: 95, status: "QC Passed", priceProposed: 200, qcStatus: "Passed", shippingStatus: "Ready to Ship" },
  ]);

// interface Order {
//     id: number;
//     product: string;
//     quantity: number;
//     status: string;
//     priceProposed: number | null;
//     qcStatus: string;
//     shippingStatus: string;
// }

const handleProposePrice = async (orderId: number, price: number): Promise<void> => {
    try {
        await proposePriceForOrder(orderId.toString(), price);
        setOrders(orders.map(order => order.id === orderId ? { ...order, priceProposed: price } : order));
    } catch (error) {
        console.error("Failed to propose price:", error);
    }
};

const handleUpdateProductionStatus = async (orderId: number, status: string): Promise<void> => {
    try {
        await updateProductionStatus(orderId.toString(), status);
        setOrders(orders.map(order => order.id === orderId ? { ...order, status } : order));
    } catch (error) {
        console.error("Failed to update production status:", error);
    }
};

const handleInitiateQC = async (orderId: number): Promise<void> => {
    try {
        await initiateQualityCheck(orderId);
        setOrders(orders.map(order => order.id === orderId ? { ...order, qcStatus: "Pending" } : order));
    } catch (error) {
        console.error("Failed to initiate QC:", error);
    }
};

const handleUpdateShippingStatus = async (orderId: number, status: string): Promise<void> => {
    try {
        await updateShippingStatus(orderId.toString(), status);
        setOrders(orders.map(order => order.id === orderId ? { ...order, shippingStatus: status } : order));
    } catch (error) {
        console.error("Failed to update shipping status:", error);
    }
};

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Orders Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="pb-3">Product</th>
              <th className="pb-3">Quantity</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Price Proposed</th>
              <th className="pb-3">QC Status</th>
              <th className="pb-3">Shipping Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-b-0">
                <td className="py-4">{order.product}</td>
                <td className="py-4">{order.quantity}</td>
                <td className="py-4">{order.status}</td>
                <td className="py-4">{order.priceProposed || "Not Proposed"}</td>
                <td className="py-4">{order.qcStatus}</td>
                <td className="py-4">{order.shippingStatus}</td>
                <td className="py-4 space-x-2">
                  <button
                    onClick={() => handleProposePrice(order.id, 1500)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  >
                    Propose Price
                  </button>
                  <button
                    onClick={() => handleUpdateProductionStatus(order.id, "In Production")}
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                  >
                    Update Production
                  </button>
                  <button
                    onClick={() => handleInitiateQC(order.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                  >
                    Initiate QC
                  </button>
                  <button
                    onClick={() => handleUpdateShippingStatus(order.id, "Shipped")}
                    className="bg-purple-500 text-white px-3 py-1 rounded-md"
                  >
                    Update Shipping
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersTable;