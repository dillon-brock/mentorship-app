import { useState, useContext, createContext, useEffect } from 'react';
import { getUser } from '../services/auth/auth.ts';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [doneGettingUser, setDoneGettingUser] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
        setDoneGettingUser(true);
      } catch {
        setDoneGettingUser(true);
      }
    }
    fetchUser();
  }, [])

  return <UserContext.Provider value={{ user, setUser, doneGettingUser }}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, UserContext, useUserContext };