// 代码生成时间: 2025-09-16 09:53:21
const express = require('express');
const os = require('os');
const { exec } = require('child_process');

// 创建一个新的express应用
const app = express();
const port = 3000;

// 用于存储内存使用情况的中间件
app.get('/memory', (req, res) => {
  try {
    // 使用os模块获取系统内存使用情况
    const memoryUsage = os.totalmem() - os.freemem();
    const usedPercentage = (memoryUsage / os.totalmem()) * 100;

    // 构建内存使用情况的响应
    res.json({
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      usedMemory: memoryUsage,
      usedPercentage: usedPercentage,
    });
  } catch (error) {
    // 错误处理，返回错误信息
    console.error('Error getting memory usage:', error);
    res.status(500).json({ error: 'Failed to get memory usage' });
  }
});

// 用于执行系统命令的中间件
app.get('/system-memory', (req, res) => {
  try {
    // 使用child_process模块执行系统命令以获取内存使用详情
    exec('free -h', (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing system command:', error);
        return res.status(500).json({ error: 'Failed to execute system command' });
      }
      if (stderr) {
        console.error('Error output:', stderr);
        return res.status(500).json({ error: 'Error in system command output' });
      }
      // 返回系统命令的输出
      res.send(stdout);
    });
  } catch (error) {
    // 错误处理，返回错误信息
    console.error('Error executing system command:', error);
    res.status(500).json({ error: 'Failed to execute system command' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Memory Analysis App listening at http://localhost:${port}`);
});
