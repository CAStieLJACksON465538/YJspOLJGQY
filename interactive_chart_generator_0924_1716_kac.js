// 代码生成时间: 2025-09-24 17:16:07
const express = require('express');
const bodyParser = require('body-parser');
const ChartJS = require('chart.js');
const { Bar } = require('react-chartjs-2');

// 创建 Express 应用
const app = express();

// 设置静态文件目录
app.use(express.static('public'));

// 使用 body-parser 解析请求体
app.use(bodyParser.json());

// 端口号
const PORT = process.env.PORT || 3000;

// 路由：获取图表数据
app.get('/api/charts', (req, res) => {
  // 假设图表数据存储在内存中
  const chartData = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        data: [65, 59, 80, 81],
      },
    ],
  };

  // 返回图表数据
  res.json(chartData);
});

// 路由：处理 POST 请求以创建新的图表
app.post('/api/charts', (req, res) => {
  try {
    // 验证请求数据
    if (!req.body.labels || !req.body.datasets) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    // 创建图表数据对象
    const chartData = {
      labels: req.body.labels,
      datasets: req.body.datasets,
    };

    // 返回新创建的图表数据
    res.status(201).json(chartData);
  } catch (error) {
    // 错误处理
    console.error('Error creating chart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 注释：
// 这个简单的 Express 应用提供了两个 API 端点：
// GET /api/charts 返回固定的图表数据
// POST /api/charts 允许用户提交数据来创建新的图表
// 应用遵循最佳实践，包括错误处理和清晰的代码结构。
// 为了实现交互式图表，前端可以使用 react-chartjs-2 库来渲染图表。