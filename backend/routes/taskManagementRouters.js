const routers = require('express').Router();

const { getAllTasks, createTask, getParticularTask, updateTask, deleteTask } = require('../controllers/taskControllers');
const { auth } = require('./../middlewares/isAuthenticated');


routers.get('/allTasks', auth, getAllTasks);

routers.get('/getOneTask/:taskId', auth, getParticularTask);

routers.post('/createTask', auth, createTask);

routers.patch('/editTask/:taskId', auth, updateTask);

routers.delete('/deleteTask/:taskId', auth, deleteTask);


module.exports = routers;