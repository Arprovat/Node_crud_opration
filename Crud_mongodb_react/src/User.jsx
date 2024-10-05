import { useLoaderData } from "react-router-dom";
const User = () => {
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
            
        })
    
    }
    const user = useLoaderData();
    console.log(user)
    return (
        <div>
            <h1> Number of user:{user.length}</h1>
            <div>
                {
                    user.map((userA) => <p key={userA._id}> {userA.name}: {userA.email} <button onClick={()=>handleClick(userA._id)}>X</button></p>)
                }
            </div>
        </div>
    );
};

export default User;