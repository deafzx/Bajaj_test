const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Replace with your own details
const user_id = "mdsameer18012003";  // E.g., "john_doe_17091999"
const email = "mn2092@srmist.edu.in";  // E.g., "john@xyz.com"
const roll_number = "RA2111003010635";  // E.g., "ABCD123"

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;
        if (!Array.isArray(data)) {
            throw new Error('Invalid data format, expected an array');
        }
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        const highest_alphabet = alphabets.sort((a, b) => b.localeCompare(a))[0] || "";

        res.json({
            is_success: true,
            user_id,
            email,
            roll_number,
            numbers,
            alphabets,
            highest_alphabet: highest_alphabet ? [highest_alphabet] : []
        });
    } catch (error) {
        res.status(400).json({
            is_success: false,
            message: error.message
        });
    }
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
