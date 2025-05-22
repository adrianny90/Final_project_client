import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth context not available');

  return context;
};
