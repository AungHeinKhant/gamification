const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '51373433428',
    database: 'LanguageLearning',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true,
    })
);

// Serve static files
app.use(express.static('public'));

// Handle Login Requests
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    db.query('SELECT * FROM Users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password!' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password!' });
        }

        req.session.isLoggedIn = true;
        req.session.user = { id: user.id, name: user.name, email: user.email };

        res.status(200).json({ success: true, redirectUrl: '/' });
    });
});

// Serve Homepage
app.get('/', (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/register');
    }
    res.sendFile(path.join(__dirname, 'public', 'course.html'));
});

// Logout Route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/register');
});

// ------------------ Progress API ------------------

// Save or Update Progress for a User
app.post('/api/progress', (req, res) => {
    const { courseName, points, streak, badges, progressPercentage } = req.body;

    if (!req.session.isLoggedIn) {
        return res.status(401).json({ error: 'You must be logged in to save progress.' });
    }

    const userId = req.session.user.id;

    // Check if progress already exists for the user and course
    const checkQuery = `
        SELECT * FROM progress WHERE user_id = ? AND course_name = ?
    `;
    db.query(checkQuery, [userId, courseName], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed.' });
        }

        if (results.length > 0) {
            // Update progress
            const updateQuery = `
                UPDATE progress
                SET points = ?, streak = ?, badges = ?, progress_percentage = ?, last_updated = NOW()
                WHERE user_id = ? AND course_name = ?
            `;
            db.query(
                updateQuery,
                [points, streak, JSON.stringify(badges), progressPercentage, userId, courseName],
                (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Failed to update progress.' });
                    }
                    res.json({ message: 'Progress updated successfully.' });
                }
            );
        } else {
            // Insert new progress
            const insertQuery = `
                INSERT INTO progress (user_id, course_name, points, streak, badges, progress_percentage)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            db.query(
                insertQuery,
                [userId, courseName, points, streak, JSON.stringify(badges), progressPercentage],
                (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Failed to save progress.' });
                    }
                    res.json({ message: 'Progress saved successfully.' });
                }
            );
        }
    });
});

// Fetch Progress for a User
app.get('/api/progress', (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.status(401).json({ error: 'You must be logged in to view progress.' });
    }

    const userId = req.session.user.id;

    const query = `
        SELECT * FROM progress WHERE user_id = ?
    `;
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch progress.' });
        }
        res.json(results);
    });
});

// ------------------ End of Progress API ------------------

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
