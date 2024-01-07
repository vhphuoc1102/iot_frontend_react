import { useRoutes, Navigate } from "react-router-dom";
import SignInSide from "./components/SignInSide";
import SignUp from "./components/SignUp";
import Root from "./routes/Root";
import ErrorPage from "./components/ErrorPage";
import Main from "./components/Main";
import { ProtectedRoute } from "./authentication/ProtectedRoute";
import Crops from "./components/Crops";
import CropsInformation from "./components/CropsInformation";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);
export default function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signin",
      element: <SignInSide></SignInSide>,
    },
    {
      path: "/signup",
      element: <SignUp></SignUp>,
    },
    {
      path: "/main/*",
      element: (
        <ProtectedRoute>
          <Main></Main>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <Navigate to="crops" />,
        },
        {
          path: "crops",
          element: <Crops />,
          children: [
            {
              path: ":cropId",
              element: <CropsInformation  />,
            },
          ],
        },
        {
          path: "fertilizer",
          element: <div>2</div>,
        },
        {
          path: "pesticide",
          element: <div>3</div>,
        },
        {
          path: "help",
          element: <div>4</div>,
        },
      ],
    },
  ]);
  return routes;
  // return <RouterProvider router={router} />
}
