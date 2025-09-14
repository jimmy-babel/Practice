import Index from "../views/index/index";
import NavPage from "../views/nav-page/nav-page.jsx";
import Login from "@/views/login/login.jsx";
import List from "@/views/list/list.jsx";
import Button from "@/views/components/button/button.jsx";
import Textarea from "@/views/components/textarea/textarea.jsx";
import ObjMutation from "@/views/mutation/object.jsx";
import ArrMutation from "@/views/mutation/array.jsx";
import News from "@/views/news/news.jsx";
import Counter from "@/views/counter/counter.jsx";
import UseContext from "@/views/use-context/use-context.jsx";
import ReducerContext from "@/views/reducer-context/index.jsx";
import { CountDown, Form } from "@/views/escape-hatches/useRef.jsx";
import { VideoCmpt, ChatRoomBox } from "@/views/escape-hatches/useEffect.jsx";
import { FullNameCmpt } from "@/views/escape-hatches/customHooks.jsx";

import {
  createBrowserRouter,
  Navigate,
  // createRoutesFromElements,
  // Route,
} from "react-router-dom";

const routers = createBrowserRouter(
  // createRoutesFromElements(
  //   <>
  //     <Route path="/" Component={NavPage} />
  //     <Route path="/index" Component={Index} />
  //   </>
  // )
  [
    {
      path: "/",
      Component: NavPage,
      children: [
        {
          //重定位
          path: "/",
          element: <Navigate to="index" replace />,
        },
        {
          path: "index",
          Component: Index,
        },
        {
          path: "login",
          Component: Login,
        },
        {
          path: "list",
          Component: List,
        },
        {
          path: "button",
          Component: Button,
        },
        {
          path: "textarea",
          Component: Textarea,
        },
        {
          path: "obj-mutation",
          Component: ObjMutation,
        },
        {
          path: "arr-mutation",
          Component: ArrMutation,
        },
        {
          path: "news",
          Component: News,
        },
        {
          path: "counter",
          Component: Counter,
        },
        {
          path: "use-context",
          Component: UseContext,
        },
        {
          path: "reducer-context",
          Component: ReducerContext,
        },
        {
          path: "use-ref-CountDown",
          Component: CountDown,
        },
        {
          path: "use-ref-Form",
          Component: Form,
        },
        {
          path: "use-effect-VideoCmpt",
          Component: VideoCmpt,
        },
        {
          path: "use-effect-ChatRoomBox",
          Component: ChatRoomBox,
        },
        {
          path: "use-effect-FullNameCmpt",
          Component: FullNameCmpt,
        },
      ],
    },
  ]
);

const paths = [
  "/index",
  "/login",
  "/list",
  "/button",
  "/textarea",
  "/obj-mutation",
  "/arr-mutation",
  "/news",
  "/counter",
  "/use-context",
  "/reducer-context",
  "/use-ref-CountDown",
  "/use-ref-Form",
  "/use-effect-VideoCmpt",
  "/use-effect-ChatRoomBox",
  "/use-effect-FullNameCmpt",
];
export default routers;
export { paths };
