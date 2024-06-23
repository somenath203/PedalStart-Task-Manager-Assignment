'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';

import ProtectedNavbar from './../../components/ProtectedNavbar';

const Page = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  const [ loading, setLoading] = useState();


  const onSubmitForm = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_NODEJS_URL}/createTask`, {
        title: title,
        description: description,
        duedate: dueDate
      },{
          headers: {
  
            Authorization: `Bearer ${Cookies.get('token')}`
  
          }
      });

      setLoading(false);

      toast.success('Task added successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      
    } catch (error) {

      setLoading(false);
      
      console.log(error);

      toast.error('Something went wrong!! Please try again after sometime!', {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    }

  };

  return (
    <>

      <ProtectedNavbar />
      
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center gap-10">

        <p className='text-orange-500 tracking-wide text-xl mt-14'>Create New Task</p>

        <form className="flex flex-col gap-8 w-5/6 lg:w-3/6" onSubmit={onSubmitForm}>

          <div className="flex flex-col gap-2">

            <Label>Title of Task</Label>
            <Input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="enter task title"
              className="w-full border-2 border-orange-500"
              required
            />

          </div>

          <div className="flex flex-col gap-2">

            <Label>Description of Task</Label>
            <Input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="enter task description"
              className="w-full border-2 border-orange-500"
              required
            />

          </div>

          <div className="flex flex-col gap-2">

            <Label>Due date of Task</Label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              minDate={new Date()}
              className="p-2 rounded-md border-2 border-orange-500 w-full"
              required
            />

          </div>

          {loading ? <div className='block m-auto'><i className="fa-solid fa-arrow-rotate-right text-orange-500 text-4xl font-semibold transition-all animate-spin duration-500"></i></div> : <Button variant="outline" className='w-full border-2 border-orange-500 p-6 text-xl bg-orange-400 hover:bg-orange-300 text-white hover:text-white'>Submit</Button>}


        </form>

      </div>
    </>
  );
};

export default Page;
