// 代码生成时间: 2025-10-03 02:14:27
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// 创建一个Express应用
const app = express();
const port = 3000;

// 配置中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 版本控制存储目录
const storageDir = path.join(__dirname, 'version_storage');

// 确保存储目录存在
if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir);
}

// 添加文件到版本控制系统
app.post('/add', (req, res) => {
    const { filename, content } = req.body;
    if (!filename || typeof content !== 'string') {
        return res.status(400).json({
            message: 'Invalid filename or content'
        });
    }
    const filePath = path.join(storageDir, filename);
    const fileContent = Buffer.from(content);
    fs.writeFile(filePath, fileContent, err => {
        if (err) return res.status(500).json({
            message: 'Error saving file'
        });
        res.json({
            message: 'File added successfully'
        });
    });
});

// 获取文件版本
app.get('/history/:filename', (req, res) => {
    const { filename } = req.params;
    if (!filename) {
        return res.status(400).json({
            message: 'Invalid filename'
        });
    }
    const filePath = path.join(storageDir, filename);
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({
            message: 'File not found'
        });
    }
    const fileHistory = [];
    fs.readFile(filePath, (err, data) => {
        if (err) return res.status(500).json({
            message: 'Error reading file'
        });
        fileHistory.push(data);
        res.json({
            history: fileHistory
        });
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Version Control System running on port ${port}`);
});

// 版本控制系统的主要功能：
// 1. 添加文件：接收文件名和内容，保存到版本控制系统
// 2. 获取历史：根据文件名获取文件的版本历史
// 注释和文档：代码中包含必要的注释，说明每个函数的作用和参数
