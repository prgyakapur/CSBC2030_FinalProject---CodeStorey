// contracts/TokenReward.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./AssignmentSubmission.sol";

contract TokenReward is Ownable {
    IERC20 public token;
    AssignmentSubmission public assignmentContract;
    uint256 public rewardAmount;

    event TokensRewarded(address indexed studentAddress, uint256 amount);

    constructor(address tokenAddress, address assignmentAddress, uint256 reward) Ownable(msg.sender) {
        token = IERC20(tokenAddress);
        assignmentContract = AssignmentSubmission(assignmentAddress);
        rewardAmount = reward;
    }

    function rewardTokens(uint256 assignmentId, address studentAddress) public onlyOwner {
        AssignmentSubmission.Submission memory submission = assignmentContract.getSubmission(assignmentId, studentAddress);
        require(submission.isGraded, "Assignment not graded");

        token.transfer(studentAddress, rewardAmount);
        emit TokensRewarded(studentAddress, rewardAmount);
    }

    function updateRewardAmount(uint256 newReward) public onlyOwner {
        rewardAmount = newReward;
    }
}