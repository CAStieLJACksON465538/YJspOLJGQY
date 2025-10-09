// 代码生成时间: 2025-10-10 02:14:26
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Cluster data store
let clusters = [];

// Define a Cluster class to represent a cluster
class Cluster {
  constructor(id, name, nodes) {
    this.id = id;
    this.name = name;
    this.nodes = nodes; // List of node objects
  }
}

// Utility function to generate a unique cluster ID
function generateClusterId() {
  return `cluster_${Date.now()}`;
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Route to create a new cluster
app.post('/clusters', (req, res) => {
  try {
    const { name, nodes } = req.body;
    if (!name || !nodes || nodes.length === 0) {
      return res.status(400).send('Invalid cluster data');
    }
    const clusterId = generateClusterId();
    const newCluster = new Cluster(clusterId, name, nodes);
    clusters.push(newCluster);
    res.status(201).json({ id: clusterId, ...newCluster });
  } catch (error) {
    res.status(500).send('Failed to create cluster');
  }
});

// Route to get all clusters
app.get('/clusters', (req, res) => {
  res.status(200).json(clusters);
});

// Route to get a specific cluster by id
app.get('/clusters/:id', (req, res) => {
  const cluster = clusters.find(c => c.id === req.params.id);
  if (!cluster) {
    return res.status(404).send('Cluster not found');
  }
  res.status(200).json(cluster);
});

// Route to update a cluster
app.put('/clusters/:id', (req, res) => {
  const clusterIndex = clusters.findIndex(c => c.id === req.params.id);
  if (clusterIndex === -1) {
    return res.status(404).send('Cluster not found');
  }
  const cluster = clusters[clusterIndex];
  const { name, nodes } = req.body;
  if (name) cluster.name = name;
  if (nodes) cluster.nodes = nodes;
  res.status(200).json(cluster);
});

// Route to delete a cluster
app.delete('/clusters/:id', (req, res) => {
  const clusterIndex = clusters.findIndex(c => c.id === req.params.id);
  if (clusterIndex === -1) {
    return res.status(404).send('Cluster not found');
  }
  clusters.splice(clusterIndex, 1);
  res.status(200).send('Cluster deleted');
});

// Start the server
app.listen(port, () => {
  console.log(`Cluster management system listening at http://localhost:${port}`);
});