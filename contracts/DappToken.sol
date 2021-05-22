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

    event Approve(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping(address => uint) public balanceOf;

    mapping(address => mapping(address => uint)) public allowance;

    constructor(uint _intialSupply ) public{
        balanceOf[msg.sender] = _intialSupply;
        totalSupply = _intialSupply;
    }

    function transfer(address _to , uint _value) public returns (bool success){
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender]-= _value;
        balanceOf[_to]+= _value;
        emit Transfer(msg.sender , _to , _value);
        return true;
    }

    function approve(address _spender , uint _value) public returns (bool success){
        allowance[msg.sender][_spender] =_value;
        emit Approve(msg.sender, _spender ,_value);
        return true;
    }
}