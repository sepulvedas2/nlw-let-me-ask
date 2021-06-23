import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function useAuth() {
    const value = useContext(AuthContext)
    return value;
}

export default useAuth;