import React from 'react';
import Sidebar from '../components/SideBar';
import SignInPage from '../pages/sign-in';
import SignUpPage from '../pages/sign-up';

import { Route, Routes, Navigate } from 'react-router-dom';
import CreateTaskPage from '../pages/create-task';

const RoutesConfig: React.FC = () => (
    <Routes>
        <Route path="/" element={<Navigate to="/sign-up" />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/create-task" element={<CreateTaskPage/>} />
    </Routes>
);

export default RoutesConfig;