type userAuth ={ user: { name: string; age: number; }; index: number; }

const User = (props:userAuth) => {
  return (

    <>
        <div>
        <h2>User - {props.index}</h2>
      <p>{props.user.name}</p>
      <p>{props.user.age}</p>
        </div>
    </>
  )
}

export default User