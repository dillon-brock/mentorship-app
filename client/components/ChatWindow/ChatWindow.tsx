import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import { Button, Image } from 'react-bootstrap';
import styles from './chatWindow.module.css';
import { User } from '../../../server/models/User';
import { Recipient } from '../../types';

type Props = {
  primaryUser: User;
  secondaryUser: Recipient | null;
  handleClose: () => void;
}

export default function ChatWindow({ primaryUser, secondaryUser, handleClose }: Props) {
  if (!secondaryUser) return <div></div>;
  const chatboxEl = useRef<HTMLDivElement>(null);
  const [talkLoaded, setTalkLoaded] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<Talk.User | undefined>();

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

  if (recipient) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.recipientInfo}>
            {recipient.photoUrl &&
              <Image className={styles.image} roundedCircle src={recipient.photoUrl} />
            }
            <p className={styles.name}>{recipient.name}</p>
          </div>
          <Button className={styles.button} onClick={handleClose}>X</Button>
        </div>
        <div className={styles.window} ref={chatboxEl} />;
      </div>
    ) 
  }
  else {
    return <div></div>;
  }
}