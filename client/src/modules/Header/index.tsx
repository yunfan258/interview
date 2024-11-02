import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import logURL from "@/../assets/imgs/home.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import c from "classnames";

const activedFn = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "relative after:content-[' '] after:w-7 after:h-0.5 after:bg-white after:absolute after:bottom-0.5 after:left-0 after:-mb-5 text-white"
    : "";

export const Header = () => {
  const [lang, setLang] = useState("zh");
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    setLang(lang);
    i18n.changeLanguage(lang);
  };
  return (
    <header className="fixed left-0 right-0 top-0 py-3  flex items-center justify-between border-b border-solid border-gray-200 bg-gray-800 text-gray-300 z-10 px-3 sm:px-[10%]">
      <nav className="flex items-center gap-4 text-sm cursor-pointer w-full">
        <img
          className="w-8 h-8 rounded-full"
          src={logURL}
          onClick={() => navigate("/")}
        />
        <NavLink className={activedFn} to="/">
          <span className="hover:text-white ">首页</span>
        </NavLink>
        <NavLink className={activedFn} to="/main">
          <span className="hover:text-white ">刷题</span>
        </NavLink>
        <span className="flex gap-1 justify-end text-gray-300 ml-auto mr-4">
          <span
            className={c({ "text-white": lang === "zh" })}
            onClick={() => changeLanguage("zh")}
          >
            中文
          </span>
          |
          <span
            className={c({ "text-white": lang === "en" })}
            onClick={() => changeLanguage("en")}
          >
            英文
          </span>
        </span>
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

