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
  LogOut
} from 'lucide-react';
import { auth } from '../../utils/firebase';
import { signOut } from 'firebase/auth';

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
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-primary/10 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="p-6 border-b border-primary/10">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-serif font-bold text-primary">BLOOM Admin</h1>
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
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                    ? 'bg-primary text-white shadow-md'
                    : 'text-white hover:bg-secondary'
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

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
              className="lg:hidden text-white hover:text-accent p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-serif font-bold text-primary">
              {menuItems.find((item) => isActive(item.path))?.name || 'Admin Panel'}
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={async () => {
                  try {
                    await signOut(auth);
                    navigate('/login');
                  } catch (error) {
                    console.error('Error signing out:', error);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
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
