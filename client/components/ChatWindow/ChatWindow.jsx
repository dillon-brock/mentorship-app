import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import { Button, Image } from 'react-bootstrap';

export default function ChatWindow({ primaryUser, secondaryUser, handleClose }) {
  const chatboxEl = useRef();
  const [talkLoaded, setTalkLoaded] = useState(false);
  const [recipient, setRecipient] = useState({});

  useEffect(() => {
    Talk.ready.then(() => setTalkLoaded(true));

    if (talkLoaded) {
      const currentUser = new Talk.User({
        id: primaryUser.id,
        name: `${primaryUser.firstName} ${primaryUser.lastName}`,
        photoUrl: primaryUser.imageUrl,
        role: 'default'
      });

      const otherUser = new Talk.User({
        id: secondaryUser.userId,
        name: `${secondaryUser.firstName} ${secondaryUser.lastName}`,
        photoUrl: secondaryUser.imageUrl,
        role: 'default'
      });

      setRecipient(otherUser);

      const session = new Talk.Session({
        appId: process.env.TALK_APP_ID,
        me: currentUser,
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      console.log(conversation);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createChatbox({ showChatHeader: false });
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded]);

  return (
    <div style={{ height: '72vh', width: '300px', position: 'fixed', bottom: '0px', right: '0px', transform: 'translate(-25%, 0)' }}>
      <div className="chatboxHeader d-flex align-items-center justify-content-between" style={{ height: '90px', width: '100%', border: '1px solid black' }}>
        <Image roundedCircle src={recipient.photoUrl} style={{ height: '80px', width: '80px'}}/>
        <p style={{ margin: '0'}}>{recipient.name}</p>
        <Button onClick={handleClose}>X</Button>
      </div>
      <div style={{ height: '60vh', width: '100%'}} ref={chatboxEl} />;
    </div>
  ) 
}