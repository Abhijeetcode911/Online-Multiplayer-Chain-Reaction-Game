const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');  // Assuming a User model is defined
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/chainReactionGame', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const secretKey = 'your_secret_key'; // Keep this secret and safe

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  try {
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).send('Authentication failed');
  }

  const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '2h' });
  res.status(200).send({ token });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
