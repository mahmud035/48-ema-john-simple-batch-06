import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './Components/About/About';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Inventory from './Components/Inventory/Inventory';
import Login from './Components/Login/Login';
import Orders from './Components/Orders/Orders';
import Shop from './Components/Shop/Shop';
import SignUp from './Components/SignUp/SignUp';
import Main from './Layouts/Main';
import { productsAndCartLoader } from './Loaders/productsAndCartLoader';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: '/',
          loader: () => fetch('products.json'),
          element: <Shop></Shop>,
        },

        {
          path: '/shop',
          loader: () => fetch('products.json'),
          element: <Shop></Shop>,
        },

        {
          path: '/orders',
          loader: () => productsAndCartLoader(),
          element: (
            <PrivateRoutes>
              <Orders></Orders>
            </PrivateRoutes>
          ),
        },

        {
          path: '/inventory',
          element: <Inventory></Inventory>,
        },

        {
          path: '/about',
          element: <About></About>,
        },
        {
          path: '/login',
          element: <Login></Login>,
        },
        {
          path: '/signup',
          element: <SignUp></SignUp>,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
