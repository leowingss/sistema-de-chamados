import Routes from "./routes";
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from "./contexts/auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3000} theme="dark" />
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
