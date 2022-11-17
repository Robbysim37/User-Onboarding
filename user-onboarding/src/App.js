import React, {useState} from "react"
import Form from './component/Form';
import UserCard from "./component/UserCard";

function App() {

const [userList,setUserList] = useState([])

  return (
    <div className="App">
      <div>{userList.map(user => <UserCard user={user}></UserCard>)}</div>
      <Form userList={userList} setUserList={setUserList}></Form>
    </div>
  );
}

export default App;
