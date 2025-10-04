// 代码生成时间: 2025-10-04 21:26:40
// file_integrity_verifier.js

// 引入 Express 和文件系统模块
const express = require('express');
const fs = require('fs').promises;
const crypto = require('crypto');

// 创建 Express 应用
const app = express();
const port = 3000;

// POST 路由，用于接收文件并校验其完整性
app.post('/verify', async (req, res) => {
  // 检查请求中是否有文件
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
      error: 'No files were uploaded.'
    });
  }

  try {
    // 获取上传的文件
    const file = req.files.file;

    // 读取文件内容
    const fileContent = await file.readFile();

    // 计算文件的 SHA-256 哈希值
    const hash = crypto.createHash('sha256').update(fileContent).digest('hex');

    // 存储哈希值以供校验（示例中只是打印出来）
    console.log(`File hash: ${hash}`);

    // 假设我们有一个存储哈希值的数据库或文件，这里简单比较哈希值
    // 在实际应用中，你需要根据实际存储的哈希值来进行比较
    const expectedHash = 'expected_sha256_hash'; // 这里替换为实际的哈希值

    // 校验文件完整性
    if (hash === expectedHash) {
      return res.send({
        message: 'File is intact and verified.',
        hash: hash
      });
    } else {
      return res.status(400).send({
        error: 'File integrity check failed.',
        calculatedHash: hash,
        expectedHash: expectedHash
      });
    }
  } catch (error) {
    // 错误处理
    console.error(error);
    return res.status(500).send({
      error: 'An error occurred during file verification.'
    });
  }
});

// 中间件配置，用于解析 JSON 和文件上传
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(require('multer')({
  dest: 'uploads/'
}));

// 启动服务器
app.listen(port, () => {
  console.log(`File Integrity Verifier app listening at http://localhost:${port}`);
});
