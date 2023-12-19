import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import firebase, { FirebaseContext } from "./firebase";
import useAuthentication from "./hooks/useAuthentication";
import { Register, Login, Home } from "./modules";
import { Capture, Share } from "./modules/capture";
import NotFound from "./components/not-found";

function App() {
  const user = useAuthentication();

  return (
    <FirebaseContext.Provider value={{ firebase, user }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/capture" element={<Capture />} />
          <Route path="/share" element={<Share />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </FirebaseContext.Provider>
  );
}

export default App;
