import { isNavItem } from "utils";
import { sun, logo } from "assets";
import { useContext } from "react";
import { navlinks } from "constants";
import { SidebarContext } from "context/sidebar";
import Icon from "components/Sidebar/Icon/Icon";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const sidebar = useContext(SidebarContext);

  const iconClickHandler = (link) => {
    if (!link.disabled && !isNavItem(link, sidebar.isActive)) {
      sidebar.setActive(link.name);
    }

    navigate(link.path);
  };

  return (
    <div className="sm:flex hidden mr-10 relative">
      <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
        <Link to="/">
          <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" src={logo} />
        </Link>

        <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
          <div className="flex flex-col justify-center items-center gap-3">
            {navlinks.map((link, idx) => {
              return (
                <Icon
                  src={link.src}
                  name={link.name}
                  disabled={link.disabled}
                  isActive={sidebar.isActive}
                  key={`${link.name}-${idx}`}
                  clickHandler={() => iconClickHandler(link)}
                />
              );
            })}
          </div>
          <Icon styles="bg-[#1c1c24] shadow-secondary" src={sun} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
