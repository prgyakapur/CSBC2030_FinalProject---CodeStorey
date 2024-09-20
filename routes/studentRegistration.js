const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config();

const router = express.Router();

// Initialize Ethers provider and contracts
const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/a24856c45e4a46af865db95f38c1e48e"); 
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const myTokenABI = require('../abis/MyTokenABI.json');
const studentRegistrationABI = require('../abis/StudentRegistrationABI.json');

const myTokenAddress = "0x560c24a0BA9221E27f65417bbfD96B7df62b723F";
const studentRegistrationAddress = "0x29d5A412F957E9b181c2caD21f2f179b1e3eB58a";

const tokenContract = new ethers.Contract(myTokenAddress, myTokenABI, wallet);
const studentRegistrationContract = new ethers.Contract(studentRegistrationAddress, studentRegistrationABI, wallet);

// Approve tokens for registration
router.post('/approve', async (req, res) => {
    const { amount } = req.body;

    try {
        const tx = await tokenContract.approve(studentRegistrationAddress, ethers.parseUnits(amount.toString(), 18));
        const receipt = await tx.wait();
        res.send({ receipt });
    } catch (error) {
        console.error('Error in /approve endpoint:', error);
        res.status(500).send({ error: error.message });
    }
});

// Register a new student
// router.post('/register', async (req, res) => {
//     try {
//         const contractWithSigner = studentRegistrationContract.connect(wallet);
//         const tx = await contractWithSigner.registerStudent();
//         const receipt = await tx.wait();
//         res.send({ receipt });
//     } catch (error) {
//         console.error('Error in /register endpoint:', error);
//         if (error.code === 'CALL_EXCEPTION') {
//             console.error('Call exception:', error.data);
//         }
//         res.status(500).send({ error: error.message });
//     }
// });

module.exports = router;
