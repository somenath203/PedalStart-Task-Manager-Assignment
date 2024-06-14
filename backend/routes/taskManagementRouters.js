const routers = require('express').Router();

const { getAllTasks, createTask, getParticularTask, updateTask, deleteTask } = require('../controllers/taskControllers');


routers.get('/allTasks', getAllTasks);

routers.get('/getOneTask/:taskId', getParticularTask);

routers.post('/createTask', createTask);

routers.patch('/editTask/:taskId', updateTask);

routers.delete('/deleteTask/:taskId', deleteTask);


module.exports = routers;