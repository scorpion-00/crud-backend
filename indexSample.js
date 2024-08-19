const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/send-text', (req, res) => {
    const { text } = req.body;
    console.log(text);
    res.json({ message: `"${text}" received successfully` });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});