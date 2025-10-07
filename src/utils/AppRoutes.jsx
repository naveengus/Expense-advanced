import Login from "../components/Login";
import SignUp from "../components/SignUp";
import ProtectedRoute from "./ProductedRoute";
import SideBar from "../components/SideBar";
import Dashboard from "../pages/Dashboard";
import AddClient from "../pages/AddClient";
import AddIncome from "../pages/AddIncome";
import AddExpence from "../pages/AddExpence";
import Transition from "../pages/Transition";
import Categories from "../pages/Categories"
import EditClient from "../pages/EditClient";
import AddEmploye from "../pages/AddEmploye";
import Settings from "../pages/Settings";

export default [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Signup",
    element: <SignUp />,
  },
  {
    path: "/Dashboard",
    element: (
      <>
        {/* <ProtectedRoute> */}
        <SideBar />
        <div style={{ marginLeft: "250px", padding: "20px" }}>
          <Dashboard />
        </div>{" "}
        {/* </ProtectedRoute> */}
      </>
    ),
  },
  {
    path: "/AddClient",
    element: (
      <>
        <SideBar />
        <div style={{ marginLeft: "250px", padding: "20px" }}>
          <AddClient />
        </div>
      </>
    ),
  },
    {
    path: "/EditClient/:id",
    element: (
      <>
        <SideBar />
        <div style={{ marginLeft: "250px", padding: "20px" }}>
          <EditClient />
        </div>
      </>
    ),
  },
   {
    path: "/AddEmploye",
    element: (
      <>
        <SideBar />
        <div style={{ marginLeft: "250px", padding: "20px" }}>
          <AddEmploye />
        </div>
      </>
    ),
  },
  {
    path: "/AddIncome",
    element: (
      <>
        <SideBar />
        <div style={{ marginLeft: "250px", padding: "20px" }}>
          <AddIncome />
        </div>
      </>
    ),
  },
  {
    path: "/AddExpence",
    element: (
      <>
        <SideBar />
        <div style={{ marginLeft: "250px", padding: "20px" }}>
          <AddExpence />
        </div>
      </>
    ),
  },
  {
    path: "/Transition",
    element: (
      <>
        <SideBar />
        <div style={{ marginLeft: "250px", padding: "20px" }}>
          <Transition />
        </div>
      </>
    ),
  },
   {
    path: "/Categories",
    element: (
      <>
        <SideBar />
        <div style={{ marginLeft: "250px", padding: "20px" }}>
          <Categories />
        </div>
      </>
    ),
  },
   {
    path: "/Settings",
    element: (
      <>
        <SideBar />
        <div style={{ marginLeft: "250px", padding: "20px" }}>
          <Settings />
        </div>
      </>
    ),
  },
];
