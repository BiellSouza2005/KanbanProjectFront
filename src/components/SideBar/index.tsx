import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';
import Button from '@mui/material/Button';
import { useRouter } from '../../router/hooks';

const Sidebar: React.FC = () => {
  const router = useRouter();
  
  const handleSignIn = useCallback(() => {
    router.push('/sign-in');
  }, [router]);

    const Logout = () => {
        sessionStorage.clear();
        //window.location.reload(); 

        handleSignIn();
    }

    return (
        <nav className="sidebar">
            <ul>
                <li><Link to="/board">Board</Link></li>
                <li><Link to="/create-task">Create Task</Link></li>
                <li><Link to="/account">Account Information</Link></li>
                {/* Adicione outros links conforme necessário */}
            </ul>
            <Button 
                variant="contained" 
                onClick={() => Logout()}
                style={{margin: '50px' }}
            >
                Logout
            </Button>
        </nav>
    );
};

export default Sidebar;
