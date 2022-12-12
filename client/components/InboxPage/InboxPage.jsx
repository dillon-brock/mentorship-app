import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import ChatInbox from "../ChatInbox/ChatInbox";
import Header from "../Header/Header";
import styles from './inboxPage.module.css';

export default function InboxPage() {
  const { user, doneGettingUser } = useUserContext();
  const { pathname } = useLocation();

  if (doneGettingUser && !user) return <Navigate to={`/auth/sign-in?callback=${pathname}`} />
  return (
    <div style={{ height: '90vh'}}>
      <Header />
      <h1 className={styles.title}>Your Inbox</h1>
      <ChatInbox />
    </div>
  )
}