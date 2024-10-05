import {  useLoaderData, useNavigate} from "react-router-dom";

const Update = () => {
    const user = useLoaderData();
    const navigate = useNavigate();
    const handleUpdate = (e)=>{
        e.preventDefault();
        const form = new FormData(e.target)
        const formData = Object.fromEntries(form.entries());
        console.log(formData);
        fetch(`http://localhost:5000/updates/${user._id}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            navigate('/users')
        })
    }
    return (
        <div>
            <h1>update details of{user?.name}</h1>
            <form onSubmit={handleUpdate}>
                <input type="text" name="name" defaultValue={user.name} id="" />
                <br />
                <input type="email" name="email" defaultValue={user.email} id="" />
                <br /> <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default Update;