const DappToken = artifacts.require('./DappToken.sol');
contract('DappToken', (accounts) => {
    it('set total supply on deployment' , () => {
        return DappToken.deployed().then((instance)=>{
            totalInstance = instance;
            return totalInstance.totalSupply();
        }).then((data) => {
            assert.equal(data.toNumber() , 10 , 'set total supplt to 1M')
        })

    })
})