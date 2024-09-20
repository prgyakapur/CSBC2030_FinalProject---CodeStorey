const express = require('express');
const { ethers } = require('ethers');

const router = express.Router();

// Token Reward Contract setup
const tokenRewardABI = require('../abis/TokenRewardABI.json');
const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/a24856c45e4a46af865db95f38c1e48e"); 
const tokenRewardAddress = "0xE09d7f9451f9240551c90A2E1B525e908C0F9fac";
const tokenRewardContract = new ethers.Contract(tokenRewardAddress, tokenRewardABI, provider);

// Reward tokens to a student
router.post('/reward', async (req, res) => {
    const { studentAddress, rewardAmount } = req.body;
    try {
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const contractWithSigner = tokenRewardContract.connect(wallet);
        const tx = await contractWithSigner.rewardTokens(studentAddress, ethers.utils.parseUnits(rewardAmount.toString(), 18));
        const receipt = await tx.wait();
        res.send({ receipt });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Fetch total rewards for a student
router.get('/rewards/:studentAddress', async (req, res) => {
    try {
        const totalRewards = await tokenRewardContract.getTotalRewards(req.params.studentAddress);
        res.send({ totalRewards: ethers.formatUnits(totalRewards, 'ether') });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
