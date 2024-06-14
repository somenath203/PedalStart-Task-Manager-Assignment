import Link from 'next/link';

const Navbar = () => {
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
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
