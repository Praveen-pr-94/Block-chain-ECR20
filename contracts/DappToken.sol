pragma solidity ^0.5.16;

contract DappToken {
    uint public totalSupply;
    string public name= "DappToken";
    string public symbol= "Dapp";
    string public statndard= "Dapp token v1.0";

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    mapping(address => uint) public balanceOf;

    constructor(uint _intialSupply ) public{
        balanceOf[msg.sender] = _intialSupply;
        totalSupply = _intialSupply;
    }

    // transfer from one account to another
    function transfer(address _to , uint _value) public returns (bool success){
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender]-= _value;
        balanceOf[_to]+= _value;

        emit Transfer(msg.sender , _to , _value);
        return true;
    }
}