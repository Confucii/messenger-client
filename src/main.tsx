import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import Error from "./components/Error";
import Layout from "./components/Layout";
import Login from "./components/Login/Login";
import { QueryClient, QueryClientProvider } from "react-query";
import Register from "./components/Register/Register";
import Placeholder from "./components/Placeholder/Placeholder";
import Chat from "./components/Chat/Chat";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Placeholder /> },
      { path: "chat/:postId", element: <Chat /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
