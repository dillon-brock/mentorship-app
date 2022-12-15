import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import { Button, Image } from 'react-bootstrap';
import styles from './chatWindow.module.css';

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
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createChatbox({ showChatHeader: false });
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.recipientInfo}>
          <Image className={styles.image} roundedCircle src={recipient.photoUrl} />
          <p className={styles.name}>{recipient.name}</p>
        </div>
        <Button className={styles.button} onClick={handleClose}>X</Button>
      </div>
      <div className={styles.window} ref={chatboxEl} />;
    </div>
  ) 
}