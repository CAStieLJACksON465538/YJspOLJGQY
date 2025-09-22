// 代码生成时间: 2025-09-23 01:01:24
const express = require('express');

// 定义一个数学工具集
function MathUtils() {
  this.add = function(a, b) {
    return a + b;
  };

  this.subtract = function(a, b) {
    return a - b;
  };

  this.multiply = function(a, b) {
    return a * b;
  };

  this.divide = function(a, b) {
    if (b === 0) {
      throw new Error('Division by zero is not allowed.');
    }
    return a / b;
  };
}

// 创建数学工具实例
const mathUtils = new MathUtils();

// 创建Express应用
const app = express();

// 设置中间件以解析JSON请求体
app.use(express.json());

// 定义API端点处理加法运算
app.post('/add', (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({
      error: 'Invalid input. Both a and b must be numbers.'
    });
  }
  const result = mathUtils.add(a, b);
  res.json({ result: result });
});

// 定义API端点处理减法运算
app.post('/subtract', (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({
      error: 'Invalid input. Both a and b must be numbers.'
    });
  }
  const result = mathUtils.subtract(a, b);
  res.json({ result: result });
});

// 定义API端点处理乘法运算
app.post('/multiply', (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({
      error: 'Invalid input. Both a and b must be numbers.'
    });
  }
  const result = mathUtils.multiply(a, b);
  res.json({ result: result });
});

// 定义API端点处理除法运算
app.post('/divide', (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({
      error: 'Invalid input. Both a and b must be numbers.'
    });
  }
  try {
    const result = mathUtils.divide(a, b);
    res.json({ result: result });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// 设置端口号并启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Math Calculator App is running on port ${PORT}`);
});