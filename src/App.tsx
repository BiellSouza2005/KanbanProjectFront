import {useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RoutesConfig from './router/routes';
import Sidebar from './components/SideBar';
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';
import './App.css'
import { useAuth } from './sections/auth/authContext';

function App() {
    const { isAuthenticated } = useAuth();

  return (
    <Router>
        <Routes>
            {/* Rota de Cadastro */}
            <Route
                path="/sign-up"
                element={
                    isAuthenticated ? <Navigate to="/sidebar" /> : <SignUpPage /> 
                }
            />

            {/* Rota de Login */}
            <Route
                path="/sign-in"
                element={
                    isAuthenticated ? <Navigate to="/sidebar" /> : <SignInPage /> 
                }
            />

            {/* Rotas protegidas com a Sidebar */}
            <Route
                path="/*"
                element={
                    isAuthenticated ? (
                    <div style={{ display: 'flex' }}>
                        <Sidebar />
                        <div style={{ marginLeft: '200px', padding: '20px', width: '100%' }}>
                            <RoutesConfig />
                        </div>
                    </div>
                    ) : (
                         <Navigate to="/sign-in" />
                    )
                }
            />
        </Routes>
    </Router>
  )
}

export default App
