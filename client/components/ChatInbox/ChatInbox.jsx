import { useEffect, useRef, useState, Fragment } from 'react';
import Talk from "talkjs";
import { useUserContext } from '../../context/UserContext';

export default function ChatInbox() {
  const inboxEl = useRef();
  const { user } = useUserContext();
  // const [talkLoaded, setTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => {
      if (user.id) {
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
  <Fragment>
    <div style={{height: '500px'}} className="inbox-container" ref={inboxEl}>Loading...</div>
  </Fragment>
  )
}