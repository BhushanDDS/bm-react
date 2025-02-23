import React from 'react'
import {Link ,NavLink} from 'react-router-dom'
function Header() {
  return (
<>
<nav>
    <Link to={"/"}>Home </Link> ||
    <Link to={"/dashboard"}>Admin Page </Link> ||
    <Link to="/">About us  </Link> ||
    
 

</nav>
</>
)
}

export default Header