import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetch("/user")
        .then((res) => res.json())
        .then((data) => setUserData(data));
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      {!isLoggedIn && (
        <button
          onClick={() => {
            fetch("/login", { method: "post" }).then((res) => {
              if (res.status === 200) setIsLoggedIn(true);
            });
          }}
        >
          Login
        </button>
      )}
      <h2>User Data</h2>
      {userData &&
        Object.keys(userData).map((key) => {
          return (
            <div>
              {key}: {userData[key]}
            </div>
          );
        })}
    </div>
  );
};

export default App;
