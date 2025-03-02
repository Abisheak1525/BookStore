import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './Dashboard.css';
import AdminSidebar from './AdminSidebar';
import RecentOrders from './RecentOrders';

const weeklySalesData = [
  { date: '2024-07-29', sales: 20 },
  { date: '2024-07-30', sales: 15 },
  { date: '2024-07-31', sales: 10 },
  { date: '2024-08-01', sales: 5 },
  { date: '2024-08-02', sales: 10 },
  { date: '2024-08-03', sales: 50 },
  { date: '2024-08-04', sales: 20 },
  { date: '2024-08-05', sales: 10 },
];

const bestSellingProductsData = [
  { name: 'Study Material', value: 400 },
  { name: 'Webtoon', value: 300 },
  { name: 'Fantacy', value: 100 },
  { name: 'RomCom', value: 200 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Dashboard = () => {
  const [data, setData] = useState({
    todayOrders: 7000,
    thisMonthOrders: 157000,
    lastMonthOrders: 196000,
    allTimeSales: 904700,
    totalOrder: 201,
    ordersPending: 70,
    ordersProcessing: 25,
    ordersDelivered: 99,
  });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');
    ws.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="dashboard-container">
      <AdminSidebar />
      <div className="dashboard mt-5">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <div className="dashboard-overview">
          <div className="dashboard-card green">
            <i className="fas fa-box"></i>
            <h2>Today Orders</h2>
            <p>₹{data.todayOrders}</p>
          </div>
          <div className="dashboard-card blue">
            <i className="fas fa-shopping-cart"></i>
            <h2>This Month</h2>
            <p>₹{data.thisMonthOrders}</p>
          </div>
          <div className="dashboard-card teal">
            <i className="fas fa-credit-card"></i>
            <h2>Last Month</h2>
            <p>₹{data.lastMonthOrders}</p>
          </div>
          <div className="dashboard-card dark-green">
            <i className="fas fa-dollar-sign"></i>
            <h2>All-Time Sales</h2>
            <p>₹{data.allTimeSales}</p>
          </div>
        </div>
        <div className="dashboard-summary">
          <div className="summary-item d-flex flex-row justify-content-center" style={{backgroundColor: "#ffc10711", borderColor: "#ffc107"}}>
            <div className="summary-icon yellow">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className='d-flex flex-column '>
              <h3>Total Order</h3>
              <p>{data.totalOrder}</p>
            </div>
          </div>
          <div className="summary-item d-flex flex-row justify-content-center" style={{backgroundColor: "#dc35461a", borderColor: "#dc3545"}}>
            <div className="summary-icon red">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <div className='d-flex flex-column'>
              <h3>Pending</h3>
              <p>{data.ordersPending}</p>
            </div>
          </div>
          <div className="summary-item d-flex flex-row justify-content-center" style={{backgroundColor: "#007bff1f", borderColor: "#007bff"}}>
            <div className="summary-icon blue">
              <i className="fas fa-sync-alt"></i>
            </div>
            <div className='d-flex flex-column'>
              <h3>Processing</h3>
              <p>{data.ordersProcessing}</p>
            </div>
          </div>
          <div className="summary-item d-flex flex-row justify-content-center" style={{backgroundColor: "#28a74616", borderColor: "#28a745"}}>
            <div className="summary-icon green">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className='d-flex flex-column'>
              <h3>Delivered</h3>
              <p>{data.ordersDelivered}</p>
            </div>
          </div>
        </div>
        <div className="charts">
          <div className="weekly-sales-chart">
            <h2>Weekly Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#122c6f" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="best-selling-products-chart">
            <h2>Best Selling Books</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={bestSellingProductsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {bestSellingProductsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;
