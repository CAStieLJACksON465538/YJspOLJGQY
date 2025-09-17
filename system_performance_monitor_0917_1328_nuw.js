// 代码生成时间: 2025-09-17 13:28:36
const express = require('express');
const { performance } = require('perf_hooks');
const os = require('os');

// 创建express应用
const app = express();
const port = 3000;

// 定义一个中间件来获取系统性能数据
const systemPerformanceMiddleware = (req, res, next) => {
    try {
        // 获取CPU使用率
        const cpuUsage = os.cpuUsage();
        // 获取系统负载
        const loadAverage = os.loadavg();
        // 获取内存使用情况
        const memoryUsage = os.totalmem() - os.freemem();
        // 获取系统空闲内存
        const freeMemory = os.freemem();

        // 将性能数据添加到请求对象中
        req.systemPerformance = {
            cpuUsage,
            loadAverage,
            memoryUsage,
            freeMemory
        };

        next();
    } catch (error) {
        next(error);
    }
};

// 定义一个路由来展示性能数据
app.get('/system-performance', systemPerformanceMiddleware, (req, res) => {
    // 计算响应时间
    const responseTime = performance.now() - req.start;
    // 将响应时间添加到性能数据中
    req.systemPerformance.responseTime = responseTime;

    // 发送性能数据
    res.json({
        status: 'success',
        data: req.systemPerformance
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

// 注释：
// - 此程序使用express框架创建了一个简单的系统性能监控工具。
// - 它通过一个中间件获取系统性能数据，包括CPU使用率、系统负载、内存使用情况和空闲内存。
// - 这些数据被添加到请求对象中，并在'/system-performance'路由上返回。
// - 程序还包含了一个错误处理中间件，以确保任何未捕获的错误都能被妥善处理。
// - 遵循JS最佳实践，代码结构清晰，易于理解和维护。