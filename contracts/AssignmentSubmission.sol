// contracts/AssignmentSubmission.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AssignmentSubmission is Ownable {
    struct Assignment {
        string description;
        uint256 maxGrade;
        bool isActive;
    }

    struct Submission {
        address studentAddress;
        uint256 studentGrade;
        bool isGraded;
    }

    mapping(uint256 => Assignment) public assignments;
    mapping(uint256 => mapping(address => Submission)) public submissions;
    uint256 public assignmentCount;

    event AssignmentCreated(uint256 indexed assignmentId, string description);
    event AssignmentSubmitted(uint256 indexed assignmentId, address indexed studentAddress);
    event AssignmentGraded(uint256 indexed assignmentId, address indexed studentAddress, uint256 studentGrade);

    constructor() Ownable(msg.sender) {}

    function createAssignment(string memory assignmentDescription, uint256 maxGradeForAssignment) public onlyOwner {
        assignments[assignmentCount] = Assignment(assignmentDescription, maxGradeForAssignment, true);
        emit AssignmentCreated(assignmentCount, assignmentDescription);
        assignmentCount++;
    }

    function submitAssignment(uint256 assignmentId) public {
        require(assignments[assignmentId].isActive, "Assignment not active");
        submissions[assignmentId][msg.sender] = Submission(msg.sender, 0, false);
        emit AssignmentSubmitted(assignmentId, msg.sender);
    }

    function gradeAssignment(uint256 assignmentId, address studentAddress, uint256 studentGrade) public onlyOwner {
        require(submissions[assignmentId][studentAddress].studentAddress == studentAddress, "No submission found");
        require(!submissions[assignmentId][studentAddress].isGraded, "Already graded");
        require(studentGrade <= assignments[assignmentId].maxGrade, "Grade exceeds max grade");

        submissions[assignmentId][studentAddress].studentGrade = studentGrade;
        submissions[assignmentId][studentAddress].isGraded = true;
        emit AssignmentGraded(assignmentId, studentAddress, studentGrade);
    }

    function getSubmission(uint256 assignmentId, address studentAddress) public view returns (Submission memory) {
        return submissions[assignmentId][studentAddress];
    }
}