import './App.css'
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PrivateRoute from './components/PrivateRoute'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import StudentPage from './pages/StudentPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute><HomePage /></PrivateRoute>,
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'student', element: <StudentPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
]);


function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
