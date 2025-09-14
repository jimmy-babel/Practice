import './App.css';
// import Index  from './views/index/index';
// import NavPage  from './views/nav-page/nav-page.jsx';
import routers from "./router/index.jsx"
import {
  RouterProvider
} from 'react-router-dom'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/" Component={NavPage} />
//       <Route path="/index" Component={Index} />
//     </>
//   )
// )

const App = () => {
  return <RouterProvider router={routers} />
}

export default App