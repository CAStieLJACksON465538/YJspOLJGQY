// 代码生成时间: 2025-09-18 16:52:17
const express = require('express');
const axios = require('axios');

// 创建Express应用
const app = express();
const port = 3000;

/**
 * 检查网络连接状态的函数
 * @param {string} url - 要检查的网络资源URL
 * @returns {Promise<{ status: string, reachable: boolean }>} 包含网络状态的对象
 */
function checkNetworkStatus(url) {
  return axios.head(url)
    .then(response => ({
      status: 'reachable',
      reachable: true,
      httpStatus: response.status
    }))
    .catch(error => ({
      status: 'unreachable',
      reachable: false,
      error: error.message
    }));
}

// 设置路由，用于检查网络状态
app.get('/check-status', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({
        error: 'URL parameter is required'
      });
    }

    const status = await checkNetworkStatus(url);
    res.json(status);
  } catch (error) {
    // 捕获并处理任何在处理请求时出现的错误
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Network Status Checker listening at http://localhost:${port}`);
});

// 模块导出，以便在其他文件中使用
module.exports = app;