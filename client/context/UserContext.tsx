import { useState, useContext, createContext, useEffect, PropsWithChildren, Dispatch, SetStateAction } from 'react';
import { getUser } from '../services/auth/auth';

export interface User {
  id: string;
  email: string;
  type: string | null;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  studentId?: string;
  teacherId?: string;
}

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  doneGettingUser: boolean;
}

const UserContext = createContext({} as UserContextType);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [doneGettingUser, setDoneGettingUser] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser: () => Promise<void> = async () => {
      try {
        const data: User | null = await getUser();
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