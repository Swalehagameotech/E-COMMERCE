import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Trash2,
  FileText,
  Users,
  Menu,
  X,
  Store,
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'View Products', path: '/admin/products', icon: Package },
    { name: 'Add Product', path: '/admin/add-product', icon: PlusCircle },
    { name: 'Manage Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Deleted Products', path: '/admin/deleted-products', icon: Trash2 },
    { name: 'Order Status', path: '/admin/order-status', icon: FileText },
    { name: 'Manage Users', path: '/admin/users', icon: Users },
  ];

  const handleBackToStore = () => {
    navigate('/home');
  };

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-primary/10 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="p-6 border-b border-primary/10">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-serif font-bold text-primary">ZIVA Admin</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-primary hover:text-accent"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary text-white shadow-md'
                      : 'text-primary hover:bg-secondary'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Back to Store Button */}
          <div className="p-4 border-t border-primary/10">
            <button
              onClick={handleBackToStore}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-primary hover:bg-secondary transition-all duration-200"
            >
              <Store className="h-5 w-5" />
              <span className="font-medium">Back to Store</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-primary/10 px-4 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-primary hover:text-accent p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-serif font-bold text-primary">
              {menuItems.find((item) => isActive(item.path))?.name || 'Admin Panel'}
            </h2>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
