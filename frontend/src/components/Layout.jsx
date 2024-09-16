import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <main className="py-10 px-8 lg:px-12">
      <Outlet />
    </main>
  );
}

export default Layout;
