import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const ProtectedNavbar = () => {

  const router = useRouter();

  const logoutUser = () => {

    Cookies.remove('token');

    router.push('/pages/login');

    toast.success('You are logged out successfully!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });

  };

  return (
    <>
      <header className="text-gray-600">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <i className="fa-solid fa-list-check text-2xl lg:text-4xl text-orange-600 font-bold"></i>
            <span className="ml-3 text-lg lg:text-xl">Task Manager</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href='/'>
                <span className="mr-5 hover:text-orange-600 transition-all duration-150">All Tasks</span>
            </Link>
            <Link href='/pages/createtask'>
                <span className="mr-5 hover:text-orange-600 transition-all duration-150">Create Task</span>
            </Link>
            <button onClick={logoutUser}>
                <span className="mr-5 hover:text-orange-600 transition-all duration-150"><i className="ri-logout-circle-r-line text-xl"></i></span>
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default ProtectedNavbar;
