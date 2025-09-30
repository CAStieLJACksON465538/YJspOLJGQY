// 代码生成时间: 2025-10-01 02:54:19
const express = require('express');
const hljs = require('highlight.js');
const fs = require('fs');
const path = require('path');

// 创建一个Express应用
const app = express();
const PORT = 3000;

// 定义一个中间件来处理所有的GET请求，并提供代码高亮功能
app.get('/highlight', (req, res) => {
  // 获取请求参数中的code和lang（语言）
  const { code, lang } = req.query;
  
  // 检查code参数是否存在
  if (!code) {
    return res.status(400).json({ error: 'Code parameter is required' });
  }
  
  // 使用highlight.js库来高亮代码
  try {
    const highlightedCode = hljs.highlightAuto(code, [lang]).value;
    // 发送高亮后的代码作为HTML响应
    res.send(`<pre><code class="hljs ${lang}">${highlightedCode}</code></pre>`);
  } catch (error) {
    // 错误处理
    res.status(500).send('Error highlighting code');
  }
});

// 静态文件服务，用于提供highlight.js库及其样式
app.use('/js', express.static(path.join(__dirname, 'node_modules/highlight.js/lib')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/highlight.js/styles')));

// 启动服务器
app.listen(PORT, () => {
  console.log(`Code Highlighter server is running on port ${PORT}`);
});

// 注意：此代码示例假设你已经安装了express和highlight.js库。
// 安装命令：npm install express highlight.js --save
