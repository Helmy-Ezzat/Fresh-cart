import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container px-4 mx-auto min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
