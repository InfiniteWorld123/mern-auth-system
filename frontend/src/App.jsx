import { useEffect } from "react";

function App() {
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
    <div>hello</div>
  );
}

export default App;