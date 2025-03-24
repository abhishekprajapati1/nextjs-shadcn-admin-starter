const Navbar = () => {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-6 py-4 px-4 lg:px-0">
      <div className="w-full lg:w-auto flex flex-wrap justify-center lg:justify-start gap-6">
        {[
          "Accessories",
          "EyeGlasses",
          "ComputerGlasses",
          "KidsGlasses",
          "SunGlasses",
          "Try@Home",
          "Pages",
          "Blog",
        ].map((item, index) => (
          <button
            key={index}
            className="px-4 py-2 text-black hover:text-blue-500 text-sm font-semibold tracking-wider"
          >
            {item}
          </button>
        ))}
      </div>

      {/* <div className="relative w-full mt-4 lg:mt-0 lg:w-auto">
        <FiSearch className="absolute left-3 top-2.5 text-gray-400 size-5" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full lg:w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-[1px] focus:ring-gray-400"
        />
      </div> */}
    </nav>
  );
};

export default Navbar;
