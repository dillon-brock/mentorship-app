import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import ChatInbox from "../ChatInbox/ChatInbox";
import Header from "../Header/Header";

export default function InboxPage() {
  const { user, doneGettingUser } = useUserContext();

  if (doneGettingUser && !user) return <Navigate to='/auth/sign-in' />
  return (
    <>
      <Header />
      <ChatInbox />
    </>
  )
}