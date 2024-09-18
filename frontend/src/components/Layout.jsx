import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <main className="py-6 lg:py-10 px-4 md:px-8 lg:px-12 flex-grow">
      <Outlet />
    </main>
  );
}

export default Layout;
