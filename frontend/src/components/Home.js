import React, { useEffect, useState } from 'react';
import data from '../data.json'
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';



const Home=()=>{
    const [quantity,setQuantity]=useState();
    const [address,setAddress]=useState('');
  
  const contractAddress = process.env.REACT_APP_CONTRACT_ADD;
  const handleSubmit = async () => {
    if (window.ethereum) {
        try {
            const exists=await handleCheckAddress();
            await window.ethereum.enable(); // Request user permission to access their accounts
            const provider = new Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, data, provider);
           
            if(exists)
                {
                // private mint
                    const transaction = await contract.privateMint(quantity);
                    await transaction.wait();
                }
            else{
                console.log('minting')
                const transaction = await contract.mint(quantity);
            await transaction.wait();
            }
            
            
            console.log("Minting successful!");
        } catch (error) {
            console.error("Error:", error);
        }
    } else {
        console.error("Please install MetaMask or another Ethereum provider.");
    }
   
}

const handleCheckAddress = async () => {
    try {
        const response = await fetch(`http://localhost:5000/check-address/${address}`,{
            method:'get'});
        const data = await response.json();
        return data.exists
    } catch (error) {
        console.error('Error checking address:', error);
    }
};

    return(
        <div className="home-container" style={{alignItems:'center',backgroundColor:'black'}}>
            <input style={{width:'400px',height:'40px', position:'absolute',top:'100px',fontSize:'30px',borderRadius:'10px',}} className='inputBox' type="number" placeholder='Enter quantity' onChange={(e)=>setQuantity(parseInt(e.target.value))} value={quantity}/>
            <input style={{width:'400px',height:'40px', position:'absolute',top:'170px',fontSize:'30px',borderRadius:'10px',}} className='inputBox' type="text" placeholder='Enter wallet address' onChange={(e)=>setAddress(e.target.value)} value={address}/>
            <button style={{position:'absolute',top:'300px',width:'100px',height:'50px', borderRadius:'40px',backgroundColor:'#87BAAF',borderColor:'blue', color:'white',fontWeight:'bold',fontSize:'30px',cursor:'pointer'}} onClick={()=>handleSubmit()}>Mint</button>
    </div>
    );
}

export default Home;