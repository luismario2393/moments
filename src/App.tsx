import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import firebase, { FirebaseContext } from "./firebase";
import useAuthentication from "./hooks/useAuthentication";
import { Register, Login, Home } from "./modules";
import { Capture, Share } from "./modules/capture";

function App() {
  const user = useAuthentication();

  return (
    <FirebaseContext.Provider value={{ firebase, user }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/capture" element={<Capture />} />
          <Route path="/share" element={<Share />} />
        </Routes>
      </BrowserRouter>
    </FirebaseContext.Provider>
  );
}

export default App;
