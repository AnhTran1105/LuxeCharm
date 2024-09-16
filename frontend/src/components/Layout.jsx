import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <main className="py-10 md:px-12 px-4">
      <Outlet />
    </main>
  );
}

export default Layout;
