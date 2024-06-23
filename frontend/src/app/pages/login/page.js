/* eslint-disable react/no-unescaped-entities */
'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import PublicNavbar from '@/app/components/PublicNavbar';


const Page = () => {

  const [ loading, setLoading ] = useState();

  const [ emailId, setEmailId ] = useState();
  const [ password, setPassword ] = useState();

  const router = useRouter();

  const onSubmitForm = async (e) => {

    e.preventDefault();

    try {
        
        setLoading(true);

        const { data } = await axios.post(`http://localhost:5000/login`, {
          email: emailId,
          password: password
        });

        Cookies.set('token', data?.data?.token);

        setLoading(false);

        toast.success('You are logged in successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        router.push('/');

    } catch (error) {

        toast.error(error?.response?.data?.message, {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });

        Cookies.remove('token');

        setLoading(false);
        
        console.log(error);

    }

  };

  return (
    <>
      <PublicNavbar />

      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center gap-10">
       
        <p className="text-orange-500 tracking-wide text-xl mt-20 lg:mt-28">
          Login
        </p>

        <form
          className="flex flex-col gap-8 w-5/6 lg:w-3/6"
          onSubmit={onSubmitForm}
        >
          <div className="flex flex-col gap-2">
            <Label>Email ID</Label>
            <Input
              type="email"
              placeholder="enter your email id"
              className="w-full border-2 border-orange-500"
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="enter your password"
              className="w-full border-2 border-orange-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {loading ? (
            <div className="block m-auto">
              <i className="fa-solid fa-arrow-rotate-right text-orange-500 text-4xl font-semibold transition-all animate-spin duration-500"></i>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full border-2 border-orange-500 p-6 text-xl bg-orange-400 hover:bg-orange-300 text-white hover:text-white"
            >
              Submit
            </Button>
          )}
        </form>

        <p className='text-lg lg:text-xl'>Don't have an account ? <Link href='/pages/register' className='font-semibold text-orange-500'>Click here</Link></p>

      </div>
    </>
  );
};

export default Page;
