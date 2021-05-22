const DappToken = artifacts.require('./DappToken.sol');
let tokenInstance;
contract('DappToken', (accounts) => {
    it('initialise contract with correct value', async() => {
        const instance = await DappToken.deployed();
        const name = await instance.name();
        const symbol = await instance.symbol();
        const statndard = await instance.statndard();
        assert.equal(name , "DappToken" , "name must be DappToken");
        assert.equal(symbol , "Dapp" , "symbol must be Dapp");
        assert.equal(statndard , "Dapp token v1.0" , "statndard must be Dapp token v1.0");
    })


    it('it allocates initial supply on deployment' , () => {
        return DappToken.deployed().then((instance)=>{
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then((data) => {
            assert.equal(data.toNumber() , 10 , 'set total supplt to 1M');
            return tokenInstance.balanceOf(accounts[0]);
        }).then((adminBalance) => {
                assert.equal(adminBalance.toNumber() , 10 , 'it shobe be 10 not to be 0' )
        })  
    })

    // it('transfer ownership',()=> {
    //         return DappToken.deployed().then(instance => {
    //             tokenInstance = instance;
    //             return tokenInstance.transfer(accounts[1], 100);
    //         }).then(assert.fail).catch(err=> {
    //             assert(err.message.indexOf('revert') >= 0, 'error message contain revert');
    //             return tokenInstance.transfer(accounts[1], 5);
    //         }).then((recipiet) => {
    //             console.log(recipiet)
    //              return tokenInstance.balanceOf(accounts[1]);
    //         }).then((balance1) => {
    //             assert.equal(balance1.toNumber() , 5, 'adds the amount to reciving account');
    //             return tokenInstance.balanceOf(accounts[0]);
    //        }).then((balance0) => {
    //             assert.equal(balance0.toNumber() , 5, 'amount deducted from sending account');
    //        })
    // })

    it('transfer ownership',async()=> {
        const instance = await DappToken.deployed();
        try{
            await instance.transfer.call(accounts[1], 100, {from: accounts[0]});
        }catch(err){
            assert(err.message.indexOf('revert') >= 0, 'error message contain revert');
        }
        const success = await instance.transfer.call(accounts[1], 1, {from: accounts[0]});
        assert.equal(success , true , 'it must be true')
        const receipt = await instance.transfer(accounts[1], 5);
        await assert.equal(receipt.logs.length , 1, 'trigger one event');
        await assert.equal(receipt.logs[0].event,'Transfer' , 'Should be Transfer');
        await assert.equal(receipt.logs[0].args._from,accounts[0] , 'Match from account');
        await assert.equal(receipt.logs[0].args._to,accounts[1] , 'Match to account');
        await assert.equal(receipt.logs[0].args._value, 5, 'Match transfer amount');
        const balance1 = await instance.balanceOf(accounts[1]);
        assert.equal(balance1.toNumber() , 5, 'adds the amount to reciving account');
        const balance0 = await instance.balanceOf(accounts[0]);
        assert.equal(balance0.toNumber() , 5, 'amount deducted from sending account');

    })
})