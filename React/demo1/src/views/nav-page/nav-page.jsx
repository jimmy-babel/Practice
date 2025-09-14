import { Outlet,Link } from "react-router-dom";
import "./nav-page.css";
import {paths} from "@/router";
export default function navList() {
  return (
    <>
      <div className="app-layout">
        <nav className="sidebar">
          <ul>
            {paths.map((path,index)=>(
              <li className="nav-item" key={index}>
                <Link to={path}>{path}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 右侧内容区域 - 相当于 Vue 的 <router-view> */}
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </>
  );
}
