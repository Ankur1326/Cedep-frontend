import './App.css';
import { BrowserRouter as Router, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import StudentRegisterPage from './pages/StudentRegisterPage';
import { UserContext } from './context/UserContext';
import InvoicePage from './pages/InvoicePage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import StudentsPage from './pages/StudentsPage';
import StudentDetail from './pages/StudentDetailPage';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/*',
    element: (
      <UserContext>
        <PrivateRoute>
          <Provider store={store}>
            <HomePage />
          </Provider>
        </PrivateRoute>
      </UserContext>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'invoice', element: <InvoicePage /> },
      { path: 'students', element: <StudentsPage /> },
      { path: 'students/:studentId', element: <StudentDetail /> },
      { path: 'register-student', element: <StudentRegisterPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
    ],
    errorElement: <ErrorPage />
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
  );
}

export default App;
