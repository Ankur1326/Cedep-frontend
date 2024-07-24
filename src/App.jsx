import './App.css'
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PrivateRoute from './components/PrivateRoute'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import StudentPage from './pages/StudentPage'
import { UserContext } from './context/UserContext'
import InvoicePage from './pages/InvoicePage'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <UserContext>
        <PrivateRoute>
          <Provider store={store}>
            <HomePage />
          </Provider>
        </PrivateRoute>
      </UserContext>,
    children: [
      { path: 'invoice', element: <InvoicePage /> },
      { path: 'student', element: <StudentPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
]);


function App() {

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
