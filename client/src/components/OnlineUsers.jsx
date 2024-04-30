import "../styles/OnlineUsers.css";

export default function OnlineUsers({ users }) {
  return (
    <section id="onlineUsersContainer">
      <div id="onlineeUsersLabel">Online Users:</div>
      {users && users.length > 0
        ? users.map((user) => {
            return <div className="onlineUser" key={user.socketID}>{user.userName}</div>;
          })
        : null}
    </section>
  );
}
