const express = require('express');
const app = express();
require('./db/config');
const User = require('./db/User');
const Wallet = require('./db/Wallet');
const cors = require('cors')


app.use(express.json());
app.use(cors({
    origin:'*'
}));


app.post('/register',async (req,resp)=>{
    let user= new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
})



app.post('/login', async (req,resp)=>{
    let user =  await User.findOne(req.body);
    if(req.body.password && req.body.email)
    {
        let user = await User.findOne(req.body).select("-password");
        if(user){
            resp.send(user)
        }
        else{
            resp.send({result:'No user found'})
        }
    }
    else{
        resp.send({result:'No user found'})
    }
})

app.get('/check-address/:address', async (req, res) => {
    const { address } = req.params;

    try {
        const existingWallet = await Wallet.findOne({ address });
console.log('inside',existingWallet)
        if (existingWallet) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error("Error checking address:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/insert-address', async (req, res) => {

    try {
        const newWallet = new Wallet(req.body)
        const result=await newWallet.save();
        res.send(result)
    } catch (error) {
        console.error("Error inserting address:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(5000);