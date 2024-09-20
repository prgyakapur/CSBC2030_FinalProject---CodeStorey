const express = require('express');
const { ethers } = require('ethers');

// Router setup
const router = express.Router();

// Import and set up the MyToken contract
const myTokenABI = require('../abis/MyTokenABI.json');

// Connect to the Ethereum network (Infura Sepolia)
const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/a24856c45e4a46af865db95f38c1e48e"); 

const myTokenAddress = "0x560c24a0BA9221E27f65417bbfD96B7df62b723F";
const myTokenContract = new ethers.Contract(myTokenAddress, myTokenABI, provider);

// Fetch token balance for an address
router.get('/balance/:address', async (req, res) => {
    try {
               // Fetch the balance for the provided address
               const balance = await myTokenContract.balanceOf('0x1b15241812aB597de38472e9414a792Cc060D31e');
               console.log(balance); 
               // Respond with the balance, formatted in ether
               res.send({ balance: ethers.formatUnits(balance, 18) });
             } catch (error) {
                 res.status(500).send({ error: error.message });
             }
});

// Transfer tokens to another address
router.post('/transfer', async (req, res) => {
    const { to, amount } = req.body;
    try {
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const myTokenWithSigner = myTokenContract.connect(wallet);
        const tx = await myTokenWithSigner.transfer(to, ethers.utils.parseUnits(amount.toString(), 18));
        const receipt = await tx.wait();
        res.send({ receipt });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
