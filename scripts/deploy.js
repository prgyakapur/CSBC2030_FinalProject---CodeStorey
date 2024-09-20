const hre = require("hardhat");

async function main() {
  try {
    // Get deployer's account
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", hre.ethers.formatEther(balance));

    // Deploy MyToken contract
    const MyToken = await hre.ethers.getContractFactory("Token");
    const myToken = await MyToken.deploy();
    await myToken.waitForDeployment();
    console.log("MyToken deployed to:", myToken.target);

    // Deploy StudentRegistration contract
    const StudentRegistration = await hre.ethers.getContractFactory(
      "StudentRegistration"
    );
    const studentRegistration = await StudentRegistration.deploy(
      myToken.target,
      hre.ethers.parseEther("1")
    );
    await studentRegistration.waitForDeployment();
    console.log("StudentRegistration deployed to:", studentRegistration.target);

    // Deploy AssignmentSubmission contract
    const AssignmentSubmission = await hre.ethers.getContractFactory(
      "AssignmentSubmission"
    );
    const assignmentSubmission = await AssignmentSubmission.deploy();
    await assignmentSubmission.waitForDeployment();
    console.log(
      "AssignmentSubmission deployed to:",
      assignmentSubmission.target
    );

    // Deploy TokenReward contract
    const TokenReward = await hre.ethers.getContractFactory("TokenReward");
    const tokenReward = await TokenReward.deploy(
      myToken.target,
      assignmentSubmission.target,
      hre.ethers.parseEther("0.3")
    );
    await tokenReward.waitForDeployment();
    console.log("TokenReward deployed to:", tokenReward.target);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
