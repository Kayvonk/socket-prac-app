import "../styles/OpenChats.css";

export default function OpenChats({rooms}) {
  return (
    <section id="openChatsContainer">
      <div id="OpenChatsLabel">Open Chats:</div>

      {rooms.map((roomName) => {return <div key={roomName}> {roomName}</div>})}
    </section>
  );
}
