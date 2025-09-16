// 代码生成时间: 2025-09-16 20:01:45
const express = require('express');
const app = express();
const port = 3000;

// 中间件，用于解析JSON请求体
app.use(express.json());

// 测试数据生成器函数
function generateTestData(count) {
  const testData = [];
  for (let i = 0; i < count; i++) {
    testData.push({
      id: i + 1,
      name: `Test User ${i + 1}`,
      email: `testuser${i + 1}@example.com`,
      timestamp: new Date().toISOString()
    });
  }
  return testData;
}

// API端点：生成指定数量的测试数据
app.get('/test-data/:count', (req, res) => {
  const { count } = req.params;
  try {
    // 校验count是否为有效数字
    if (isNaN(Number(count))) {
      return res.status(400).json({
        error: 'Invalid count parameter'
      });
    }
    const testData = generateTestData(Number(count));
    res.json(testData);
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

// 监听指定端口
app.listen(port, () => {
  console.log(`Test Data Generator app listening at http://localhost:${port}`);
});