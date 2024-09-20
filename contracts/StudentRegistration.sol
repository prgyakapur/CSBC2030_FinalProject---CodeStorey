// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StudentRegistration is Ownable {
    IERC20 public token;
    uint256 public registrationFee;
    mapping(address => bool) public registeredStudents;

    event StudentRegistered(address indexed student);

    constructor(address tokenAddress, uint256 feeAmount) Ownable(msg.sender) {
        token = IERC20(tokenAddress);
        registrationFee = feeAmount;
    }

    function registerStudent() public {
        require(!registeredStudents[msg.sender], "Already registered");

        // Transfer the registration fee from the student to the contract
        require(token.transferFrom(msg.sender, address(this), registrationFee), "Payment failed");

        // Mark student as registered
        registeredStudents[msg.sender] = true;

        // Calculate the registration reward as 30% of the registration fee
        uint256 registrationReward = (registrationFee * 30) / 100;

        // Transfer the registration reward to the student
        token.transfer(msg.sender, registrationReward);

        emit StudentRegistered(msg.sender);
    }
}
