const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const noteRoutes = require('./routes/notes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', noteRoutes);

// Start the server and connect to MongoDB
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("MongoDB connected successfully!");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.log(err));