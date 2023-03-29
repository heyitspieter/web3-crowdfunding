import Navbar from "components/Navbar/Navbar";
import Sidebar from "components/Sidebar/Sidebar";

const BaseLayout = ({ children }) => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <Sidebar />
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;
