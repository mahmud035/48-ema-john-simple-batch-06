import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './Components/About/About';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Inventory from './Components/Inventory/Inventory';
import Orders from './Components/Orders/Orders';
import Shop from './Components/Shop/Shop';
import Main from './Layouts/Main';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: '/',
          element: <Shop></Shop>,
        },

        {
          path: '/shop',
          element: <Shop></Shop>,
        },

        {
          path: '/orders',
          element: <Orders></Orders>,
        },

        {
          path: '/inventory',
          element: <Inventory></Inventory>,
        },

        {
          path: '/about',
          element: <About></About>,
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
