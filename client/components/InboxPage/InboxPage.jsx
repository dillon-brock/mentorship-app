import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import ChatInbox from "../ChatInbox/ChatInbox";
import Header from "../Header/Header";

export default function InboxPage() {
  const { user, doneGettingUser } = useUserContext();
  const { pathname } = useLocation();

  if (doneGettingUser && !user) return <Navigate to={`/auth/sign-in?callback=${pathname}`} />
  return (
    <>
      <Header />
      <ChatInbox />
    </>
  )
}