const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');
const authMiddleware = require('../middleware/auth');

// -----------GET ALL PRODUCTS--------------------------------
router.get('/', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
//------------------ADD NEW PRODUCT--------------------------------
router.post('/', authMiddleware, (req, res) => {
    const { name, price, description } = req.body;
    if (!name || !price) return res.status(400).json({ error: 'Name and price are required' });

    db.run(
        'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
        [name, price, description || null],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        }
    );
});
//--------------GET PRODUCT BY ID---------------------------------------------
router.get('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: 'Product not found' });
        res.json(row);
    });
});
//----------------------UPDATE PRODUCT-----------------------------------------
router.put('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;

    db.run(
        'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
        [name, price, description || null, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        }
    );
});
//--------------------------DELETE PRODUCT----------------------------------------
router.delete('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM products WHERE id = ?', id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

module.exports = router;
