const Task = require('./../models/taskModel');


const getAllTasks = async (req, res) => {

    try {
        
        const getTasks = await Task.find({ createdBy: req?.body?.idOfTheUser });

        res.status(200).send({
            success: true,
            message: 'All tasks are fetched successfully',
            totalNumberOfTasks: getTasks?.length,
            allTasks: getTasks
        });

    } catch (error) {
        
        res.status(500).send({
            success: false,
            message: error?.message
        });

    }

};


const getParticularTask = async (req, res) => {

    try {
        
        const getTask = await Task.findOne({ _id: req?.params?.taskId, createdBy: req.body.idOfTheUser });

        if(!getTask) {
            return res.status(500).send({
                success: false,
                message: `Task with ID: ${req?.params?.taskId} is not found or has been deleted.`
            });
        }

        res.status(200).send({
            success: true,
            message: `Task with ID: ${req?.params?.taskId} has been fetched successfully`,
            task: getTask
        });

    } catch (error) {
        
        res.status(500).send({
            success: false,
            message: error?.message
        });

    }

};


const createTask = async (req, res) => {

    try {
        
        const { title, description, duedate } = req?.body;

        const createTask = await Task.create({
            title: title,
            description: description,
            dueDate: duedate,
            createdBy: req.body.idOfTheUser
        });

        res.status(201).send({
            success: true,
            message: 'new task created successfully',
            newlyCreatedTask: createTask
        });

    } catch (error) {
        
        res.status(500).send({
            success: false,
            message: error?.message
        });

    }

};


const updateTask = async (req, res) => {

    try {

        const getTask = await Task.findOne({ _id: req?.params?.taskId, createdBy: req.body.idOfTheUser });

        if(!getTask) {
            return res.status(500).send({
                success: false,
                message: `Task with ID: ${req?.params?.taskId} is not found or has been deleted.`
            });
        }

        const { title, description, duedate } = req?.body;

        const updateTask = {
            title: title,
            description: description,
            dueDate: duedate
        };


        const updatedTask = await Task.findOneAndUpdate({_id: req?.params?.taskId, createdBy: req.body.idOfTheUser}, updateTask, { new: true });

        res.status(200).send({
            success: true,
            message: `Task with ID: ${req?.params?.taskId} has been updated successfully`,
            updatedTask: updatedTask
        });
        
    } catch (error) {
        
        res.status(500).send({
            success: false,
            message: error?.message
        });

    };

};


const deleteTask = async (req, res) => {

    try {

        const getTask = await Task.findOne({ _id: req?.params?.taskId, createdBy: req.body.idOfTheUser });

        if(!getTask) {
            return res.status(500).send({
                success: false,
                message: `Task with ID: ${req?.params?.taskId} is not found or has been deleted.`
            });
        }

        await Task.findOneAndDelete({ _id: req?.params?.taskId, createdBy: req.body.idOfTheUser });

        res.status(200).send({
            success: true,
            message: `Task with ID: ${req?.params?.taskId} has been deleted successfully.`
        });

        
    } catch (error) {
        
        res.status(500).send({
            success: false,
            message: error?.message
        });

    }
}


module.exports = {
    getAllTasks,
    getParticularTask,
    createTask,
    updateTask,
    deleteTask
};