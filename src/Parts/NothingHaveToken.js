import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function useTokenCheck() {
  const usenavigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('jwttoken');

    if (!token) {
        // Token is empty or not found, log the user out
        toast.error('Token is empty. Logging out...');
        usenavigate('/'); // Redirect to the login page
        window.location.href = '/';
    }
},[usenavigate]);
}

export default useTokenCheck;
