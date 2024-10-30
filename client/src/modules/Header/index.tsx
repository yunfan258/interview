import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import logURL from "@/../assets/imgs/home.jpg";
import { useNavigate } from "react-router-dom";
export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed left-0 right-0 top-0 py-3  flex items-center justify-between border-b border-solid border-gray-200 bg-gray-800 text-gray-200 z-10 px-3 sm:px-[10%]">
      <nav className="flex items-center gap-4 text-sm cursor-pointer">
        <img className="w-8 h-8 rounded-full" src={logURL} onClick={()=>navigate("/")}/>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "relative after:content-[' '] after:w-7 after:h-0.5 after:bg-white after:absolute after:bottom-0.5 after:left-0 after:-mb-5 "
              : ""
          }
          to="/"
        >
          <span className="hover:text-white ">首页</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "relative after:content-[' '] after:w-7 after:h-0.5 after:bg-white after:absolute after:bottom-0.5 after:left-0 after:-mb-5 "
              : ""
          }
          to="/main"
        >
          <span className="hover:text-white ">刷题</span>
        </NavLink>
      </nav>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <img
            className="w-8 h-8 rounded-full"
            src="https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>退出登录</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
