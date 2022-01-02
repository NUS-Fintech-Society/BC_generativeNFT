const Token = artifacts.require("Token");

module.exports = function (deployer) {
  deployer.deploy(
    Token,
    "ipfs://QmZbWNKJPAjxXuNFSEaksCJVd1M6DaKQViJBYPK2BdpDEP/"
  );
};
