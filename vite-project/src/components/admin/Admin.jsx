import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import Dashboard from './Dashboard';
import ViewProducts from './ViewProducts';
import AddProduct from './AddProduct';
import ManageOrders from './ManageOrders';
import DeletedProducts from './DeletedProducts';
import OrderStatus from './OrderStatus';
import ManageUsers from './ManageUsers';

const Admin = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ViewProducts />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="orders" element={<ManageOrders />} />
        <Route path="deleted-products" element={<DeletedProducts />} />
        <Route path="order-status" element={<OrderStatus />} />
        <Route path="users" element={<ManageUsers />} />
      </Route>
    </Routes>
  );
};

export default Admin;
