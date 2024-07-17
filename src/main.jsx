import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/ErrorPage';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Registration from './pages/Registration';
import AuthProvider from './provider/AuthProvider';
import Login from './pages/Login';
import PrivateRoute from './provider/PrivateRoute';
import PendingPage from './pages/PendingPage';
import CashIn from './pages/CashIn';
import CashOut from './pages/CashOut';
import UserHistory from './pages/UserHistory';
import AgentHistory from './pages/AgentHistory';
import SendMoney from './pages/SendMoney';
import AgentManagement from './pages/AgentManagement';
import UserManagement from './pages/UserManagement';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children:[
      {
        path: '/',
        element: <Login></Login>
      },
      {
        path:'/register',
        element: <Registration></Registration>
      },
      {
        path:'/home',
        element: <PrivateRoute><Home></Home></PrivateRoute>
      },
      {
        path: '/pending',
        element: <PendingPage></PendingPage>
      },
      {
        path:'/cashin',
        element:<PrivateRoute><CashIn></CashIn></PrivateRoute>
      },
      {
        path:'/cashout',
        element:<PrivateRoute><CashOut></CashOut></PrivateRoute>
      },
      {
        path:'/sendmoney',
        element: <PrivateRoute><SendMoney></SendMoney></PrivateRoute>
      },
      {
        path:'/userhistory',
        element:<PrivateRoute><UserHistory></UserHistory></PrivateRoute>
      },
      {
        path:'/agenthistory',
        element:<PrivateRoute><AgentHistory></AgentHistory></PrivateRoute>
      },
      {
        path:'/agentmanagement',
        element:<AgentManagement></AgentManagement>
      },
      {
        path:'/usermanagement',
        element:<UserManagement></UserManagement>
      }

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
