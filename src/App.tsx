import {useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RoutesConfig from './router/routes';
import Sidebar from './components/SideBar';
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      // Verifica se o token está salvo no localStorage
      const token = sessionStorage.getItem('authtoken');
      if (token !== null) {
          setIsAuthenticated(true);
      }  else {
          setIsAuthenticated(false);
      }
  }, []);

  return (
    <Router>
        <Routes>
            {/* Rota de Cadastro */}
            <Route
                path="/sign-up"
                element={
                    <SignUpPage /> 
                }
            />

            {/* Rota de Login */}
            <Route
                path="/sign-in"
                element={
                    <SignInPage /> 
                }
            />

            {/* Rotas protegidas com a Sidebar */}
            <Route
                path="/*"
                element={
                    <div style={{ display: 'flex' }}>
                        <Sidebar />
                        <div style={{ marginLeft: '200px', padding: '20px', width: '100%' }}>
                            <RoutesConfig />
                        </div>
                    </div>
                }
            />
        </Routes>
    </Router>
  )
}

export default App
