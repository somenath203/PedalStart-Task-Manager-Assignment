'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';

import ProtectedNavbar from './components/ProtectedNavbar';


const Page = () => {


  const [allTasks, setAllTasks] = useState([]);


  const [particularTaskId, setParticularTaskId] = useState('');
  const [particularTaskTitle, setParticularTaskTitle] = useState('');
  const [particularTaskDescription, setParticularTaskDescription] = useState('');
  const [particularTaskDueDate, setParticularTaskDueDate] = useState('');


  const [openViewDetailsOfTaskModal, setOpenViewDetailsOfTaskModal] = useState(false);


  const [getTitleToBeEdited, setGetTitleToBeEdited] = useState('');
  const [getDescriptionToBeEdited, setGetDescriptionToBeEdited] = useState('');
  const [getDateToBeEdited, setGetDateToBeEdited] = useState(new Date());


  const [displayEditTaskModal, setDisplayEditTaskModal] = useState(false);


  const [loadingAllTasks, setLoadingAllTasks] = useState(true);
  const [editLoadingTask, setEditLoadingTask] = useState();
  const [loadingViewTask, setLoadingViewTask] = useState();
  const [loadingDeleteTask, setLoadingDeleteTask] = useState();



  const fetchAllTasks = async () => {

    try {

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_NODEJS_URL}/allTasks`, {

        headers: {

          Authorization: `Bearer ${Cookies.get('token')}`

        }

    });

      setAllTasks(data?.allTasks);

      setLoadingAllTasks(false);

    } catch (error) {

      setLoadingAllTasks(false);

      console.log(error);

    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);


  const deleteTask = async (idOfCardToBeDeleted) => {

    try {

      try {

        setLoadingDeleteTask(idOfCardToBeDeleted);

        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_NODEJS_URL}/deleteTask/${idOfCardToBeDeleted}`, {

          headers: {
  
            Authorization: `Bearer ${Cookies.get('token')}`
  
          }
  
      });

        setLoadingDeleteTask(false);

        toast.success('Task deleted successfully!', {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });

        fetchAllTasks();

      } catch (error) {

        toast.error('Something went wrong!! Please try again after sometime!', {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });

        setLoadingDeleteTask(false);

        console.log(error);

      }
    } catch (error) {

      console.log(error);

    }
  };

  const viewParticularTask = async (taskId) => {

    try {

      setLoadingViewTask(true);

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_NODEJS_URL}/getOneTask/${taskId}`, {

        headers: {

          Authorization: `Bearer ${Cookies.get('token')}`

        }

    });

      setParticularTaskTitle(data?.task?.title);
      setParticularTaskDescription(data?.task?.description);
      setParticularTaskDueDate(data?.task?.dueDate);

      setOpenViewDetailsOfTaskModal(true);

      setLoadingViewTask(false);

      toast.success(`Task named "${data?.task?.title}" has been loaded successfully!`, {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

    } catch (error) {

      toast.error('Something went wrong!! Please try again after sometime!', {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      setLoadingViewTask(false);

      console.log(error);

    }

  };

  const openEditTaskModal = async (taskId) => {

    try {

      setLoadingViewTask(true);

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_NODEJS_URL}/getOneTask/${taskId}`, {

        headers: {

          Authorization: `Bearer ${Cookies.get('token')}`

        }

    });

      setParticularTaskId(data?.task?._id);
      setParticularTaskTitle(data?.task?.title);
      setParticularTaskDescription(data?.task?.description);

      setDisplayEditTaskModal(true);

      setLoadingViewTask(false);

    } catch (error) {

      toast.error('Something went wrong!! Please try again after sometime!', {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      setDisplayEditTaskModal(false);

      setLoadingViewTask(false);

      console.log(error);

    }
  };

  const onSubmitEditForm = async (e) => {

    e.preventDefault();

    try {

      const editTaskObj = {};

      if (getTitleToBeEdited) {
        editTaskObj.title = getTitleToBeEdited;
      }
      if (getDescriptionToBeEdited) {
        editTaskObj.description = getDescriptionToBeEdited;
      }
      if (getDateToBeEdited) {
        editTaskObj.duedate = getDateToBeEdited;
      }

      setEditLoadingTask(true);

      await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_NODEJS_URL}/editTask/${particularTaskId}`,editTaskObj, {

        headers: {

          Authorization: `Bearer ${Cookies.get('token')}`

        }

    });

      toast.success('Task edited successfully!', {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      fetchAllTasks();

      setEditLoadingTask(false);

      setDisplayEditTaskModal(false);

    } catch (error) {

      toast.error('Something went wrong!! Please try again after sometime!', {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      setDisplayEditTaskModal(false);

      setEditLoadingTask(false);

      console.log(error);
    }
  };

  return (
    <>
      
      <ProtectedNavbar />

      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center gap-4">
      
        <p className="my-4 text-orange-500 tracking-wide text-xl mt-14">
          All Available Tasks
        </p>

        {loadingAllTasks ? (
          <>
            <i className="fa-solid fa-circle-notch text-orange-500 text-5xl transition-all animate-spin duration-500"></i>
          </>
        ) : allTasks.length === 0 ? (
          <p className="text-center text-lg lg:text-xl text-orange-500 font-semibold tracking-wide">
            No Tasks Available. Please Add One
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-x-4 gap-y-1 w-9/12 lg:w-7/12">
            {allTasks.map((task) => (
              <Card
                key={task?.id}
                className="w-full mt-5 mb-12 border-2 border-orange-500 flex items-center justify-center flex-col text-center"
              >
                <CardHeader>
                  <CardTitle className="text-orange-600">{task?.title}</CardTitle>
                  <CardDescription>
                    <span className="mt-10">
                      Due date of the Task: {moment(task?.dueDate).format('DD-MM-YYYY')}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-600">{task?.description.split(' ').length <= 7 ? task.description : task.description.split(' ').slice(0, 7).join(' ') + ' ...'}</p>
                </CardContent>
                <CardFooter className="flex w-full items-center justify-between">
                  <span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                        {loadingDeleteTask === task?._id ? <i
                            className={`ri-close-circle-line text-2xl text-slate-500 cursor-not-allowed }`}
                          ></i> : <i
                            className={`ri-close-circle-line text-2xl text-orange-500 cursor-pointer }`}
                            onClick={() => deleteTask(task._id)}
                          ></i>}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete the Task</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                  <span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                        {loadingDeleteTask === task?._id ? <i
                            className={`ri-eye-line text-2xl text-slate-500 cursor-not-allowed }`}
                          ></i> : <i
                            className={`ri-eye-line text-2xl text-orange-500 cursor-pointer }`}
                            onClick={() => viewParticularTask(task._id)}
                          ></i>}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View Details of the Task</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                  <span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {loadingDeleteTask === task?._id ? <i
                            className={`ri-pencil-line text-2xl text-slate-500 cursor-not-allowed }`}
                          ></i> : <i
                            className={`ri-pencil-line text-2xl text-orange-500 cursor-pointer }`}
                            onClick={() => openEditTaskModal(task._id)}
                          ></i>}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit the Task</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                </CardFooter>
                {loadingDeleteTask === task?._id ? <p className='mb-5 text-red-700 text-lg tracking-wider font-semibold flex items-center justify-center gap-2'> <i className="fa-solid fa-spinner text-2xl transition-all animate-spin duration-500"></i> <span>Deleting the Task</span> </p> : <></>}
              </Card>
            ))}
          </div>
        )}

        <AlertDialog
          open={openViewDetailsOfTaskModal}
          onOpenChange={setOpenViewDetailsOfTaskModal}
        >
          <AlertDialogContent className="overflow-auto max-h-[90vh]">
            <AlertDialogHeader>
              <span className="m-auto">
                <AlertDialogTitle>Details of the Task</AlertDialogTitle>
              </span>
            </AlertDialogHeader>
            <AlertDialogDescription>
              {loadingViewTask ? <p className='flex items-center justify-center mt-2 text-2xl text-orange-600 transition-all duration-500 animate-spin'><i className="fa-solid fa-rotate-right"></i></p> : <div className="flex flex-col gap-3 items-center justify-center text-lg">
                <p className="text-center flex flex-col gap-1">
                  Task Title:{' '}
                  <span className="font-bold">{particularTaskTitle}</span>
                </p>
                <p className="text-center flex flex-col gap-1">
                  Task Description:{' '}
                  <span className="font-bold">{particularTaskDescription}</span>
                </p>
                <p className="text-center flex flex-col gap-1">
                  Task Due Date:{' '}
                  <span className="font-bold">{moment(particularTaskDueDate).format('DD-MM-YYYY')}</span>
                </p>
              </div>}
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogAction className="bg-orange-600 text-white hover:bg-orange-400 hover:text-white">
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>


        <AlertDialog
          open={displayEditTaskModal}
          onOpenChange={setDisplayEditTaskModal}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <span className="m-auto">
                <AlertDialogTitle>Edit Task</AlertDialogTitle>
              </span>
            </AlertDialogHeader>
            <AlertDialogDescription>
              {loadingViewTask ? <p className='flex items-center justify-center mt-2 text-2xl text-orange-600 transition-all duration-500 animate-spin'><i className="fa-solid fa-rotate-right"></i></p> : <form className="flex flex-col gap-8" onSubmit={onSubmitEditForm}>
                <div className="flex flex-col gap-2">
                  <Label>Title of Task</Label>
                  <Input
                    type="text"
                    onChange={(e) => setGetTitleToBeEdited(e.target.value)}
                    placeholder={particularTaskTitle}
                    className="w-full border-2 border-orange-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Description of Task</Label>
                  <Input
                    type="text"
                    onChange={(e) => setGetDescriptionToBeEdited(e.target.value)}
                    placeholder={particularTaskDescription}
                    className="w-full border-2 border-orange-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Due Date of Task</Label>
                  <DatePicker
                    selected={getDateToBeEdited}
                    onChange={(date) => setGetDateToBeEdited(date)}
                    minDate={new Date()}
                    className="p-2 rounded-md border-2 border-orange-500 w-full"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-4">
                  {editLoadingTask ? (
                    <span>
                      <i className="fa-solid fa-spinner text-3xl text-orange-500 transition-all duration-500 animate-spin"></i>
                    </span>
                  ) : (
                    <Button
                      variant="fill"
                      className="bg-orange-600 text-white hover:bg-orange-600 hover:text-white"
                    >
                      Submit
                    </Button>
                  )}
                  <AlertDialogAction className="border-2 border-orange-600 bg-transparent hover:bg-transparent hover:text-orange-600 text-orange-600">
                    Cancel
                  </AlertDialogAction>
                </div>
              </form>}
            </AlertDialogDescription>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default Page;