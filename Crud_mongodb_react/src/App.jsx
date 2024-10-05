
import './App.css'

function App() {
 const handleSubmit = (e)=>{
  e.preventDefault();
  const formData = new FormData(e.target);
  const FormObj = Object.fromEntries(formData.entries());
  console.log(FormObj);

  fetch('http://localhost:5000/users',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(FormObj)
  })
  .then((res) =>{
    res.json()
  })
  .then(()=>{
    alert('Success');
    e.target.reset();
  })
 }
  return (
    <>
    <h1>CURD Operation</h1>
     <form onSubmit={handleSubmit}>
    <input type="text" name='name' /> <br />
    <input type="email" name="email" id="" /><br />
    <input type="submit" value="submit" />

     </form>
    </>
  )
}

export default App
