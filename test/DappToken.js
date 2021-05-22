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
})