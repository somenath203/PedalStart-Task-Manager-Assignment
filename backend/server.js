require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { connectToDB } = require('./utils/dbConnect');
const taskManagementRoutes = require('./routes/taskManagementRouters');

connectToDB();


const app = express();


app.use(express.json());
app.use(cors({
    origin: '*'
}));


app.get('/', (req, res) => {
    res.status(200).send({
        success: true,
        message: "server of 'task management' is up and running successfully"
    });
});


app.use(taskManagementRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server listening to PORT: ${PORT}`);
})