const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  setInterval(() => {
    const data = {
      todayOrders: (Math.random() * 1000).toFixed(2),
      yesterdayOrders: (Math.random() * 1000).toFixed(2),
      thisMonthOrders: (Math.random() * 2000).toFixed(2),
      lastMonthOrders: (Math.random() * 20000).toFixed(2),
      allTimeSales: (Math.random() * 200000).toFixed(2),
      totalOrder: Math.floor(Math.random() * 200),
      ordersPending: (Math.random() * 50000).toFixed(2),
      ordersProcessing: Math.floor(Math.random() * 50),
      ordersDelivered: Math.floor(Math.random() * 100),
    };
    ws.send(JSON.stringify(data));
  }, 5000); // Update every 5 seconds
});
