import User from "../User";

type UserListProps = { userList: { name: string; age: number }[] };




const UserList = (props:UserListProps) => {
  return (
    <>
    
    {props.userList.map((i, index) => (
        <User key={index} user={i} index={index} />
      ))}
    </>
  )
}

export default UserList