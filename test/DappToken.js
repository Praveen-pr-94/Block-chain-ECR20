const DappToken = artifacts.require('./DappToken.sol');
let tokenInstance;
contract('DappToken', (accounts) => {

    // it('initialise contract with correct value', async() => {
    //     const instance = await DappToken.deployed();
    //     const name = await instance.name();
    //     const symbol = await instance.symbol();
    //     const statndard = await instance.statndard();
    //     assert.equal(name , "DappToken" , "name must be DappToken");
    //     assert.equal(symbol , "Dapp" , "symbol must be Dapp");
    //     assert.equal(statndard , "Dapp token v1.0" , "statndard must be Dapp token v1.0");
    // })


    it('it allocates initial supply on deployment' , async() => {
        const instance = await DappToken.deployed();
        const data = await instance.totalSupply();
        assert.equal(data.toNumber() , 1000000 , 'set total supplt to 1M');
        const adminBalance = await instance.balanceOf(accounts[0]);
        assert.equal(adminBalance.toNumber() , 1000000 , 'it shobe be 10 not to be 0' );
    })


    // it('transfer ownership',async()=> {
    //     const instance = await DappToken.deployed();
    //     try{
    //         await instance.transfer.call(accounts[1], 100, {from: accounts[0]});
    //     }catch(err){
    //         assert(err.message.indexOf('revert') >= 0, 'error message contain revert');
    //     }
    //     const success = await instance.transfer.call(accounts[1], 1, {from: accounts[0]});
    //     assert.equal(success , true , 'it must be true')
    //     const receipt = await instance.transfer(accounts[1], 5);
    //     assert.equal(receipt.logs.length , 1, 'trigger one event');
    //     assert.equal(receipt.logs[0].event,'Transfer' , 'Should be Transfer');
    //     assert.equal(receipt.logs[0].args._from,accounts[0] , 'Match from account');
    //     assert.equal(receipt.logs[0].args._to,accounts[1] , 'Match to account');
    //     assert.equal(receipt.logs[0].args._value, 5, 'Match transfer amount');
    //     const balance1 = await instance.balanceOf(accounts[1]);
    //     assert.equal(balance1.toNumber() , 5, 'adds the amount to reciving account');
    //     const balance0 = await instance.balanceOf(accounts[0]);
    //     assert.equal(balance0.toNumber() , 5, 'amount deducted from sending account');
    // })

    // it('Approve tokens from delegated transfer' , async() => {
    //     const instance = await DappToken.deployed();
    //     const success = await instance.approve.call(accounts[1], 100 ,{from: accounts[0]});
    //     assert.equal(success , true , 'it must be true');
    //     const receipt = await instance.approve(accounts[1], 5);
    //     assert.equal(receipt.logs.length , 1, 'trigger one event');
    //     assert.equal(receipt.logs[0].event,'Approve' , 'Should be Approve');
    //     assert.equal(receipt.logs[0].args._owner,accounts[0] , 'Match from account');
    //     assert.equal(receipt.logs[0].args._spender,accounts[1] , 'Match to account');
    //     assert.equal(receipt.logs[0].args._value, 5, 'Match amount');
    //     const allowance = await instance.allowance(accounts[0], accounts[1]);
    //     assert.equal(allowance.toNumber() , 5, 'store allowance in delegated transfer');
    // })

    it('handle delegated transfer', async()=> {
        const instance = await DappToken.deployed();
        const fromAccount = accounts[2];
        const toAccount = accounts[3];
        const spendingAccount = accounts[4];
        const transfer = await instance.transfer(fromAccount, 100000 ,{from: accounts[0]});
        const recipet = await instance.approve(spendingAccount, 10000 ,{from: fromAccount});
        try{
           await instance.transferFrom(fromAccount, toAccount, 9999, { from: spendingAccount });
        }catch(err){
            assert(err.message.indexOf('revert') >= 0, 'cant transfer value larger than balance');
        }
        try{
            const data = await instance.transferFrom(fromAccount, toAccount, 20, { from: spendingAccount });
            assert.equal(data , true , 'it must be true')
        }catch(err){
            assert(err.message.indexOf('revert') >= 0, 'cant transfer value larger than balance');
        }
        const success = await instance.transferFrom.call(fromAccount, toAccount, 10, { from: spendingAccount });
        assert.equal(success, true);
        const recipt = instance.transferFrom(fromAccount, toAccount, 10, { from: spendingAccount });
        assert.equal(recipt.logs.length, 1, 'triggers one event');
        assert.equal(recipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
        assert.equal(recipt.logs[0].args._from, fromAccount, 'logs the account the tokens are transferred from');
        assert.equal(recipt.logs[0].args._to, toAccount, 'logs the account the tokens are transferred to');
        assert.equal(recipt.logs[0].args._value, 10, 'logs the transfer amount');
        const fromAccountBal = await instance.balanceOf(fromAccount);
        assert.equal(fromAccountBal.toNumber(), 90, 'deducts the amount from the sending account');

        const toAccountBal = await instance.balanceOf(fromAccount);
        assert.equal(toAccountBal.toNumber(), 10, 'deducts the amount from the sending account');

        const allowanceSpend = await instance.allowance(fromAccount, spendingAccount);
        assert.equal(allowance.toNumber(), 0, 'deducts the amount from the allowance')
    })  
})