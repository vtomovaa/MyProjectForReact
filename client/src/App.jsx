import "./App.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import AppRoutes from "./Routing/AppRoutes.jsx";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
