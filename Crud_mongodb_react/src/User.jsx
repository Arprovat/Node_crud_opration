import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
const User = () => {
    const loaderUser = useLoaderData();
    const [Users,setUsers] = useState(loaderUser);
    const handleClick =(id)=>{
        fetch(`http://localhost:5000/users/${id}`,{
            method:'DELETE'
            
        })
        .then((res)=>{
            res.json()
        })
        .then((data)=>{
            console.log(data)
    
                alert('Successfully deleted');
                const remainUsers = Users.filter((user)=> user._id !== id);
                setUsers(remainUsers);
                
            
        })
    
    }
    return (
        <div>
            <h1> Number of user:{Users.length}</h1>
            <div>
                {
                    Users.map((userA) => <p key={userA._id}> {userA.name}: {userA.email} <Link to={`/updates/${userA._id}`}><button>Update</button></Link> <button onClick={()=>handleClick(userA._id)}>X</button></p>)
                }
            </div>
        </div>
    );
};

export default User;