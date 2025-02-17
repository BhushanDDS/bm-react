import React, { useState } from 'react'
import '../form.css';

interface FormData {
    fname: string;
    lname: string;
    age: number;
    gender: string;
    skills: string[];
    email: string;
    phone: string;
    address: string;
}

function Form() {
    const [data, setdata] = useState<FormData>({
        fname: "",
        lname: "",
        age: 0,
        gender: "", 
        skills: [],
        email: "",
        phone: "",
        address: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', data)
    }

    return (

        <>
        
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label htmlFor="fname">First Name:</label>
                <input
                    type="text"
                    id="fname"
                    value={data.fname}
                    onChange={(e) => setdata({ ...data, fname: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label htmlFor="lname">Last Name:</label>
                <input
                    type="text"
                    id="lname"
                    value={data.lname}
                    onChange={(e) => setdata({ ...data, lname: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    value={data.age}
                    onChange={(e) => setdata({ ...data, age: Number(e.target.value) })}
                />
            </div>

            <div className="form-group">
                <label>Gender:</label>
                <div className="btn-group">
                    {['male', 'female', 'other'].map((gender) => (
                        <label key={gender} className={`btn btn-primary ${data.gender === gender ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="gender"
                                value={gender}
                                checked={data.gender === gender}
                                onChange={(e) => setdata({ ...data, gender: e.target.value })}
                            />
                            {gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </label>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="skills">Skills:</label>
                <select
                    id="skills"
                    multiple
                    value={data.skills}
                    onChange={(e) => setdata({
                        ...data,
                        skills: [...e.target.selectedOptions].map(option => option.value)
                    })}
                >
                    {['Java', 'C++', 'C', 'JS' , 'PYTHON'].map((skill) => (
                        <option key={skill} value={skill.toLowerCase()}>
                            {skill}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={data.email}
                    onChange={(e) => setdata({ ...data, email: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                    type="tel"
                    id="phone"
                    value={data.phone}
                    onChange={(e) => setdata({ ...data, phone: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label htmlFor="address">Address:</label>
                <textarea
                    id="address"
                    value={data.address}
                    onChange={(e) => setdata({ ...data, address: e.target.value })}
                />
            </div>

            <button type="submit" className="submit-btn">Submit</button>
        </form>

        <div>
            <h1>Output :</h1>
            <h4>Name : {data.fname} </h4>
            <h4>Last Name : {data.lname}</h4>
            <h4>Age : {data.age}</h4>
            <h4>Gender : {data.gender}</h4>
            <h4>Skills : {data.skills.join(', ')}</h4>
            <h4>Email : {data.email}</h4>
            <h4>Phone : {data.phone}</h4>
            <h4>Address : {data.address}</h4>
            
        </div>
        </>
        
    )
}

export default Form