// 代码生成时间: 2025-09-20 23:53:21
const express = require('express');
const multer = require('multer');
const { Readability } = require('@mozilla/readability');
const app = express();
const port = 3000;

// 配置multer以处理文件上传
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 定义路由处理POST请求和文件上传
app.post('/upload', upload.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: '文件上传失败，请确保您上传了一个文件。'
    });
  }

  const fileBuffer = req.file.buffer;
  try {
    // 转换文件内容为字符串
    const fileContent = fileBuffer.toString('utf-8');
    // 使用Readability库解析HTML并提取正文内容
    const reader = new Readability(fileContent);
    reader.parse();
    const content = reader.content;
    // 响应转换后的文档内容
    res.json({ content });
  } catch (error) {
    // 错误处理
    res.status(500).json({
      error: '文档转换过程中发生错误。'
    });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`文档格式转换器正在监听端口 ${port}`);
});

// 注释说明:
// - 使用'express'框架创建服务器。
// - 使用'multer'处理文件上传。
// - 使用'@mozilla/readability'库来提取HTML文档的主要内容。
// - 定义一个POST路由'/upload'来接收文件上传。
// - 使用multer中间件处理单个名为'document'的文件上传。
// - 检查请求中是否包含文件，并进行相应的错误处理。
// - 将上传的文件缓冲区转换为字符串，然后使用Readability库提取正文。
// - 返回转换后的文档内容或错误信息。
// - 监听指定端口并打印启动信息。