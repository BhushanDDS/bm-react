import React from 'react'
type inputAuth=
    { name: string; age: number; }

function Header(props:inputAuth) {
  return (
    <div>
        <h1>{props.age}</h1>
        
        <h1>{props.name}</h1>
    </div>

  )
}

export default Header