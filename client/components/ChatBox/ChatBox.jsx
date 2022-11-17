import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';

export default function ChatBox({ primaryUser, secondaryUser }) {
  const chatboxEl = useRef();

  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

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

      const session = new Talk.Session({
        appId: process.env.TALK_APP_ID,
        me: currentUser,
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      console.log(conversation);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      console.log(conversation);

      return () => session.destroy();
    }
  }, [talkLoaded]);

  return <div style={{ height: '60vh', width: '20vw', position: 'fixed', bottom: '0px', right: '0px', transform: 'translate(-25%, 0)' }}ref={chatboxEl} />;
}