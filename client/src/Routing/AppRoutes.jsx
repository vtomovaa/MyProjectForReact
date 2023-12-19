import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import AllOrchids from "../components/Orchid/AllOrchids/AllOrchids";
import OrchidDetails from "../components/Orchid/OrhidDetails/OrchidDetails";
import Register from "../components/Register/Register";
import ErrorPage from "../pages/ErrorPage";
import NavBar from "../components/NavBar/NavBar";
import Path from "../paths";
import AuthGuard from "../components/guards/AuthGuard";
import Footer from "../components/Footer/Footer";
import Logout from "../components/Logout/Logout";
import Profile from "../components/Profile/Profile";
import AddOrchid from "../components/Orchid/AddOrchid/AddOrchid";
import OrchidEdit from "../components/Orchid/OrchidEdit/OrchidEdit.jsx";
import MyOrchids from "../components/MyOrchids/MyOrchids.jsx";
import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const routes = [
    {
      path: Path.Home,
      element: <Home />,
    },
    {
      path: Path.Login,
      element: isAuthenticated ? <Home /> : <Login />,
    },
    {
      path: Path.Register,
      element: isAuthenticated ? <Home /> : <Register />,
    },
    {
      path: Path.AllOrchids,
      element: <AllOrchids />,
    },
    {
      path: Path.SingleOrchid,
      element: <OrchidDetails />,
    },
    {
      path: Path.Footer,
      element: <Footer />,
    },
    {
      path: Path.Error,
      element: <ErrorPage />,
    },
  ];

  const generateRoutes = () => {
    return routes.map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ));
  };

  return (
    <div className="app-routes">
      <NavBar />

      <Routes>
        {generateRoutes()}
        <Route element={<AuthGuard />}>
          <Route path={Path.CreateOrchid} element={<AddOrchid />} />
          <Route path={Path.OrchidEdit} element={<OrchidEdit />} />
          <Route path={Path.Logout} element={<Logout />} />
          <Route path={Path.Profile} element={<Profile />} />
          <Route path={Path.MyOrchids} element={<MyOrchids />} />
          <Route path={Path.MyOrchids} element={<MyOrchids />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default AppRoutes;