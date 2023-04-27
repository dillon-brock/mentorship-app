import { useEffect, useRef } from 'react';
import Talk from "talkjs";
import { useUserContext } from '../../context/UserContext';

export default function ChatInbox() {
  const inboxEl = useRef(null);
  const { user, doneGettingUser } = useUserContext();

  useEffect(() => {
      Talk.ready.then(() => {
        if (doneGettingUser && user.id) {
          const currentUser = new Talk.User({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            photoUrl: user.imageUrl,
            role: 'default'
          });
      
          const session = new Talk.Session({
            appId: process.env.TALK_APP_ID,
            me: currentUser
          })
      
          const inbox = session.createInbox();
          inbox.mount(inboxEl.current);
      
          return () => session.destroy();
        }
      })
  }, [user]);

  return (
    <div style={{ height: '85%' }} className="inbox-container" ref={inboxEl}>Loading...</div>
  )
}