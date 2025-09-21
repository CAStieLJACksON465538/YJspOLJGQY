// 代码生成时间: 2025-09-22 04:09:43
const express = require('express');
const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');

// 创建Express应用
const app = express();
const port = 3000;

// 中间件，用于解析multipart/form-data格式的请求主体
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// 路由：用于接收压缩文件并解压
app.post('/unzip', (req, res) => {
  // 检查请求中是否有文件
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // 获取上传的文件
  const file = req.files.file;
  // 创建临时文件路径
  const tempPath = path.join('/tmp', file.name);
  // 保存文件到临时目录
  file.mv(tempPath, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving the file.');
    }
    try {
      // 读取文件并解压到指定目录
      const outputPath = path.join('public', 'unzipped', file.name.replace(/\.zip$/i, ''));
      await fs.promises.mkdir(outputPath, { recursive: true });
      await fs.createReadStream(tempPath)
        .pipe(unzipper.Extract({ path: outputPath }));
      // 发送成功的响应
      res.send(`File unzipped to ${outputPath}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error unzipping the file.');
    } finally {
      // 删除临时文件
      fs.unlinkSync(tempPath);
    }
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Unzip tool server running at http://localhost:${port}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 以下是代码注释和文档
/*
 * @file Unzip Tool
 * @description A simple Express.js application that allows users to upload
 *               and unzip files.
 * @author Your Name
 * @version 1.0
 * @license MIT
 */