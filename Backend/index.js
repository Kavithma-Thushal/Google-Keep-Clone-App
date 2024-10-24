const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoute = require('./route/UserRoute');
const noteRoute = require('./route/NoteRoute');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/note', noteRoute);

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("MongoDB connected successfully!");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.log(err));