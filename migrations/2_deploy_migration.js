const DappToken = artifacts.require('./DappToken.sol');

module.exports = (deployer) => {
    deployer.deploy(DappToken ,10);
}