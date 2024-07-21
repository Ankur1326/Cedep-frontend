import './App.css'
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PrivateRoute from './components/PrivateRoute'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import StudentPage from './pages/StudentPage'
import { UserContext } from './context/UserContext'

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <UserContext>
        <PrivateRoute>
          <HomePage />
        </PrivateRoute>
      </UserContext>,
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
