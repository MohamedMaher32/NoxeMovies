import { RouterProvider, Navigate, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tvshow from './Components/Tvshow/Tvshow';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Forgetpassword from './Components/Forgetpassword/Forgetpassword'
import ResetCode from './Components/Forgetpassword/ResetCode'
import NewPassword from './Components/Forgetpassword/NewPassword'
import Register from './Components/Register/Register';
import { FunctionContextProvider } from './Context/ShareFunction'
import ItemDetails from './Components/ItemDetails/ItemDetails';
export default function App() {
  // ProtectRouting function
  function ProtectRouting(props) {
    if (localStorage.getItem("token")) {
      return props.children
    }
    else {
      return <Navigate to='/' />
    }
  }
  // if user have data in localstorage navgite to home else navgite register
  function ProtectRouting2(props) {
    if (localStorage.getItem("token")) {
      return <Navigate to='/home' />
    }
    else {
      return props.children
    }
  }
  let routers = createHashRouter([
    {
      path: "", element: <Layout />, children: [
        { path: "home", element: <ProtectRouting><Home /></ProtectRouting> },
        { path: "movies", element: <ProtectRouting><Movies /></ProtectRouting> },
        { path: "tvshow", element: <ProtectRouting><Tvshow /></ProtectRouting> },
        { path: "people", element: <ProtectRouting><People /></ProtectRouting> },
        { path: "itemdetailes/:id/:type", element: <ProtectRouting><ItemDetails /></ProtectRouting> },
        { path: "login", element: <Login/> },
        { path: "forgetpassowrd", element: <Forgetpassword /> },
        { path: "resetcode", element: <ResetCode /> },
        { path: "newpassword", element: <NewPassword /> },
        { index: true, element: <ProtectRouting2><Register /></ProtectRouting2> },
        { path: "*", element: <ProtectRouting2><Register /></ProtectRouting2> },
      ]
    }
  ])

  return <div>
    <FunctionContextProvider>
      <RouterProvider router={routers} />
    </FunctionContextProvider>
  </div>
}
