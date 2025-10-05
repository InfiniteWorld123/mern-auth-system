import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function RootLayout() {
  const backendURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${backendURL}`);
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [backendURL]);

  return (
    <div className="bg-gray-950 min-h-screen w-full flex justify-center items-center py-12 px-4">
      <Outlet />
    </div>
  );
}

export default RootLayout;