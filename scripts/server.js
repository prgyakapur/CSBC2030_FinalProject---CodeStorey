const express = require('express');
const { ethers } = require('ethers');
const fs = require('fs');
require('dotenv').config();
const myTokenRoutes = require('../routes/myToken');
const studentRegistrationRoutes = require('../routes/studentRegistration');
const assignmentSubmissionRoutes = require('../routes/assignmentSubmission');
const tokenRewardRoutes = require('../routes/tokenReward');



// Set up Express app
const app = express();
app.use(express.json());
 
// Connect to the Ethereum network (Infura Sepolia)
const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/a24856c45e4a46af865db95f38c1e48e");

// Load ABIs from separate files
const myTokenABI = require('../abis/MyTokenABI.json');
const studentRegistrationABI = require('../abis/StudentRegistrationABI.json');
const assignmentSubmissionABI = require('../abis/AssignmentSubmissionABI.json');
const tokenRewardABI = require('../abis/TokenRewardABI.json');

// Contract addresses
const myTokenAddress = "0x560c24a0BA9221E27f65417bbfD96B7df62b723F";
const studentRegistrationAddress = "0x29d5A412F957E9b181c2caD21f2f179b1e3eB58a";
const assignmentSubmissionAddress = "0x41f9a3Cb8E6e4f5870a9D2C05a150DcAe581C073";
const tokenRewardAddress = "0xE09d7f9451f9240551c90A2E1B525e908C0F9fac";

// Initialize Contracts
const myTokenContract = new ethers.Contract(myTokenAddress, myTokenABI, provider);
const studentRegistrationContract = new ethers.Contract(studentRegistrationAddress, studentRegistrationABI, provider);
const assignmentSubmissionContract = new ethers.Contract(assignmentSubmissionAddress, assignmentSubmissionABI, provider);
const tokenRewardContract = new ethers.Contract(tokenRewardAddress, tokenRewardABI, provider);

// Set up a signer for sending transactions (replace with your wallet private key)
// const walletPrivateKey = process.env.PRIVATE_KEY;
// const wallet = new ethers.Wallet(walletPrivateKey, provider);


// Define a route to register a student (transaction)
// app.post('/register', async (req, res) => {
//   const { studentAddress, studentName } = req.body;
//   try {
//       // Connect the student registration contract to the wallet for signing the transaction
//       const studentRegistrationWithSigner = studentRegistrationContract.connect(wallet);

//       const tx = await studentRegistrationWithSigner.registerStudent(studentAddress, studentName);
//       const receipt = await tx.wait(); // Wait for the transaction to be mined

//       res.send({ receipt });
//   } catch (error) {
//       res.status(500).send({ error: error.message });
//   }
// });

// Start the server
app.use('/myToken', myTokenRoutes);
app.use('/studentRegistration', studentRegistrationRoutes);
app.use('/assignmentSubmission', assignmentSubmissionRoutes);
app.use('/tokenReward', tokenRewardRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});