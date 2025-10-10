// 代码生成时间: 2025-10-10 21:06:57
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

//供应商数据库模拟
let suppliers = [
  {
    id: 1,
    name: '供应商A',
    contact: '联系人A',
    phone: '1234567890',
  },
  {
    id: 2,
    name: '供应商B',
    contact: '联系人B',
    phone: '0987654321',
  },
];

// 获取所有供应商
app.get('/api/suppliers', (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      suppliers: suppliers,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
});

// 创建供应商
app.post('/api/suppliers', (req, res) => {
  try {
    const newSupplier = {
      id: suppliers.length + 1,
      name: req.body.name,
      contact: req.body.contact,
      phone: req.body.phone,
    };
    suppliers.push(newSupplier);
    res.status(201).json({
      status: 'success',
      supplier: newSupplier,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
});

// 更新供应商信息
app.put('/api/suppliers/:id', (req, res) => {
  try {
    const { id } = req.params;
    let found = suppliers.find(supplier => supplier.id == parseInt(id));
    if (!found) {
      return res.status(404).json({
        status: 'error',
        message: 'Supplier not found',
      });
    }
    found.name = req.body.name || found.name;
    found.contact = req.body.contact || found.contact;
    found.phone = req.body.phone || found.phone;
    res.status(200).json({
      status: 'success',
      supplier: found,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
});

// 删除供应商
app.delete('/api/suppliers/:id', (req, res) => {
  try {
    const { id } = req.params;
    const supplierIndex = suppliers.findIndex(supplier => supplier.id == parseInt(id));
    if (supplierIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Supplier not found',
      });
    }
    suppliers.splice(supplierIndex, 1);
    res.status(200).json({
      status: 'success',
      message: 'Supplier deleted',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something broke!',
  });
});

app.listen(port, () => {
  console.log(`Supplier Management System is running on http://localhost:${port}`);
});
