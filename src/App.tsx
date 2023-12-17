import { BrowserRouter, Routes, Route } from "react-router-dom";
import firebase, { FirebaseContext } from "./firebase";
import useAuthentication from "./hooks/useAuthentication";

import { Register, Login } from "./modules";

function App() {
  const user = useAuthentication();

  return (
    <FirebaseContext.Provider value={{ firebase, user }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<p>Luis Mario</p>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </FirebaseContext.Provider>
  );
}

export default App;
