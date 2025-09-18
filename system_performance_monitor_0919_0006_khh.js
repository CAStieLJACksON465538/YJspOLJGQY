// 代码生成时间: 2025-09-19 00:06:47
const express = require('express');
const os = require('os');
const cpuStat = require('cpu-stat');

// 创建Express应用
const app = express();
const port = 3000;

// 获取CPU信息的中间件
app.get('/api/cpu', (req, res, next) => {
  cpuStat.usagePercent(function(err, percent, seconds) {
    if (err) {
      return next(err);
    }
    cpuStat.timePercent(function(err, time) {
      if (err) {
        return next(err);
      }
      res.json({
        usagePercent: percent,
        timePercent: time
      });
    });
  });
});

// 获取内存信息的中间件
app.get('/api/memory', (req, res) => {
  const mem = os.freemem();
  const total = os.totalmem();
  const used = total - mem;
  res.json({
    total: total,
    used: used,
    free: mem
  });
});

// 获取系统负载信息的中间件
app.get('/api/load', (req, res) => {
  const load1 = os.loadavg()[0];
  const load5 = os.loadavg()[1];
  const load15 = os.loadavg()[2];
  res.json({
    load1: load1,
    load5: load5,
    load15: load15
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 启动服务器
app.listen(port, () => {
  console.log(`System Performance Monitor app listening at http://localhost:${port}`);
});

// 请注意，此代码依赖于cpu-stat包来获取CPU信息，可以通过npm安装
// npm install cpu-stat --save