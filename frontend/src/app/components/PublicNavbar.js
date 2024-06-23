const PublicNavbar = () => {
  return (
    <>
      <header className="text-gray-600">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <i className="fa-solid fa-list-check text-2xl lg:text-4xl text-orange-600 font-bold"></i>
            <span className="ml-3 text-lg lg:text-xl">Task Manager</span>
          </a>
        </div>
      </header>
    </>
  );
};

export default PublicNavbar;