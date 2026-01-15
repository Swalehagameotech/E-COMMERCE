import { useState, useEffect } from 'react';
import { Package, Users, ShoppingBag, Clock } from 'lucide-react';
import adminAPI from '../../utils/adminAPI';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getDashboard();
      if (response.success) {
        setStats(response.data);
      } else {
        setError('Failed to load dashboard data');
      }
    } catch (err) {
      console.error('Error fetching dashboard:', err);
      setError('Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, color = 'primary' }) => (
    <div className="bg-white rounded-xl shadow-sm border border-primary/5 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-primary">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-${color}/10`}>
          <Icon className={`h-8 w-8 text-${color}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your e-commerce store</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Stock"
          value={stats?.totalStock || 0}
          icon={Package}
          color="primary"
        />
        <StatCard
          title="Total Customers"
          value={stats?.totalCustomers || 0}
          icon={Users}
          color="accent"
        />
        <StatCard
          title="Pending Orders"
          value={stats?.pendingOrders || 0}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon={ShoppingBag}
          color="green"
        />
      </div>

      {/* Category Stock Cards */}
      <div>
        <h2 className="text-2xl font-serif font-bold text-primary mb-4">Stock by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats?.categoryStock?.map((category) => (
            <div
              key={category.category}
              className="bg-white rounded-xl shadow-sm border border-primary/5 p-4"
            >
              <p className="text-sm text-gray-600 mb-1 capitalize">{category.category}</p>
              <p className="text-2xl font-bold text-primary">{category.stock}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
