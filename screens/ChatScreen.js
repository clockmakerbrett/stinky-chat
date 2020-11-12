import React from "react";
import firebase from "../Firebase";
import { GiftedChat } from "react-native-gifted-chat";
import { UserContext } from "../Contexts";
import { View, Text } from "react-native";

const db = firebase.firestore();
const chatsRef = db.collection("chats");

export default function ChatScreen() {
  const { user } = React.useContext(UserContext);

  const [messages, setMessages] = React.useState([]);

  const appendMessages = React.useCallback(
    (curMessages) => {
      setMessages((prevMessages) => GiftedChat.append(prevMessages, curMessages));
    },
    [messages]
  );

  React.useEffect(() => {
    return () => {
      chatsRef.onSnapshot((snapshot) => {
        const messages = snapshot
          .docChanges()
          .filter((document) => document.type === "added")
          .map(({ doc }) => {
            const message = doc.data;
            return { ...message, createdAt: message.createdAt.toDate() };
          })
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        appendMessages(messages);
      });
    };
  }, []);

  const handleSend = async (messages) => {
    const newMessage = messages.map((message) => chatsRef.add(message));
    await Promise.all(newMessage);
  };

  return <GiftedChat user={user} messages={messages} onSend={handleSend} />;
}
