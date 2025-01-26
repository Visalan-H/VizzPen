import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import Loading from './Components/Loading/Loading';
import axios from 'axios';

export default function ProtectedRoute({ children }) {
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState('')

    useEffect(() => {
        const checkToken = async () => {
            try {
                const res = await axios.get(`${ import.meta.env.VITE_BASE_URL}/user/protected`, { withCredentials: true });
                setUser(res.data.user);
                setIsVerified(true);
                
            } catch (error) {
                setIsVerified(false);
            }
            finally {
                setLoading(false);
            }
        }
        checkToken();
    }, []);

    if (loading) return <Loading />


    return isVerified ? React.cloneElement(children, { user: user }) : <Navigate to='/login' />

}
