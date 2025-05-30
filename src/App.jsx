
import '@mantine/core/styles.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import { MantineProvider } from '@mantine/core';
import Logout from './Pages/Logout';
import { Bounce, ToastContainer } from 'react-toastify';
import Signup from './Pages/Signup';

function App() {

  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </MantineProvider>

  )
}

export default App
