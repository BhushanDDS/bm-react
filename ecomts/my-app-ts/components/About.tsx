import React, { useEffect,useState } from 'react'
import axios from 'axios'

function About() {


    const [data, setdata] = useState<any>()
useEffect(()=>{

const getLink= async ()=>{

        const res= await axios.get(`https://api.github.com/users/BhushanDDS`)
        setdata(res.data)
        if(res){
            throw new Error("err");
        }

    }

getLink()
},[])

  return (
<>

<div>
    <img src={data.avatar_url} alt="alt" />
    <p>Title : {data.login}</p>
    <p>Link : {data.html_url}</p>
</div>

</>
)
}

export default About

