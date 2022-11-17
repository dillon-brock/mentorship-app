// import { useEffect, useRef, useState } from 'react';
// import Talk from "talkjs";
// import { useUserContext } from '../../context/UserContext';

// export default function ChatInbox() {
//   const inboxEl = useRef();
//   const { user } = useUserContext();
//   const [talkLoaded, setTalkLoaded] = useState(false);

//   useEffect(() => {
//     Talk.ready.then(() => setTalkLoaded(true));

//     if (talkLoaded && user) {
//       const currentUser = new Talk.User({
//         id: user.id,
//         name: `${user.firstName} ${user.lastName}`,
//         photoUrl: user.imageUrl,
//         role: 'default'
//       });

//       const session = new Talk.Session({
//         appId: process.env.TALK_APP_ID,
//         me: currentUser
//       })

//       const inbox = session.createInbox();
//       inbox.mount(inboxEl.current);

//       return () => session.destroy();
//     }
//   }, [talkLoaded, user]);

//   return <div style={{height: '500px'}} className="inbox-container" ref={inboxEl}>Loading...</div>

// }

import { Component, Fragment } from 'react';
import Talk from "talkjs";

class Messaging extends Component {

    constructor(props) {
        super(props);
        this.inbox = undefined;

    }

    componentDidMount() {
        Talk.ready
          .then(() => {
            if (this.props.user) {
              const me = new Talk.User({
                id: this.props.user.id,
                name: `${this.props.user.firstName} ${this.props.user.lastName}`,
                photoUrl: this.props.user.imageUrl,
                role: 'default'
              });
              if (!window.talkSession) {
                  window.talkSession = new Talk.Session({
                      appId: process.env.TALK_APP_ID,
                      me: me
                  });
              }
          
              this.inbox = window.talkSession.createInbox();
              this.inbox.mount(this.container);

            }

          })
          .catch(e => console.error(e));
    }

    render() {
        return (
            <Fragment>
                <div style={{height: '500px'}} className="inbox-container" ref={c => this.container = c}>Loading...</div>
            </Fragment>
        );
    }
  }
  
  export default Messaging;