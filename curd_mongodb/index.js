const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;

require('dotenv').config()
 app.use(express.json())
 app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pc17z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

const database = client.db("userDB");
const documents = database.collection('user')

app.get('/users',async (req, res) => {
    const users = await documents.find().toArray();
    res.send(users);
})
app.get('/updates/:id', async (req, res) => {
  const filter ={_id: new ObjectId(req.params.id)}
  const result = await documents.findOne(filter);
  res.send(result);
});
app.put('/updates/:id', async (req, res) => {
  
  const user = req.body;
  console.log(user,req.params.id);
  const filter = {_id : new ObjectId(req.params.id)}
  const option = { upsert:true}
  const update ={
    $set:{
      name:user.name,
      email:user.email
    }
  }
  const result = await documents.updateOne(filter,update,option)
  res.send(result);
});
app.post('/users',async(req,res) => {
    const user = req.body;
   const result = await documents.insertOne(user)
   res.send(result);
})
 
app.delete('/users/:id', async (req, res) => {
        const id= req.params.id;
        const query ={_id: new ObjectId(id)};
        const result = await documents.deleteOne(query)
res.send(result);
})
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('Welcome')
})

app.listen(port,() => {
    console.log('listening on port', port);
});
