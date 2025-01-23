const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const productRoutes = require('./routes/products');
const db = require('./db/init');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });

    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
        'INSERT INTO admins (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        }
    );
});

// --------------------------ADMIN LOGIN-----------------------------------------------------
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });

    db.get('SELECT * FROM admins WHERE username = ?', username, async (err, admin) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!admin || !(await bcrypt.compare(password, admin.password)))
            return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: admin.id, username: admin.username }, 'your-secret-key', { expiresIn: '1h' });
        res.json({ token });
    });
});

//----------------------------PRODUCT ROUTS-----------------------------
app.use('/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
