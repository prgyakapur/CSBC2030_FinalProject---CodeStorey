const express = require('express');
const { ethers } = require('ethers');

const router = express.Router();

// Assignment Submission Contract setup
const assignmentSubmissionABI = require('../abis/AssignmentSubmissionABI.json');
const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/a24856c45e4a46af865db95f38c1e48e"); 
const assignmentSubmissionAddress = "0x41f9a3Cb8E6e4f5870a9D2C05a150DcAe581C073";
const assignmentSubmissionContract = new ethers.Contract(assignmentSubmissionAddress, assignmentSubmissionABI, provider);

// Submit an assignment
router.post('/submitAssignment', async (req, res) => {
    const { studentAddress, assignmentId, submissionUrl } = req.body;
    try {
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const contractWithSigner = assignmentSubmissionContract.connect(wallet);
        const tx = await contractWithSigner.submitAssignment(studentAddress, assignmentId, submissionUrl);
        const receipt = await tx.wait();
        res.send({ receipt });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Fetch assignment details
router.get('/assignment/:studentAddress/:assignmentId', async (req, res) => {
    const { studentAddress, assignmentId } = req.params;
    try {
        const assignmentDetails = await assignmentSubmissionContract.getAssignment(studentAddress, assignmentId);
        res.send({ assignmentDetails });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
