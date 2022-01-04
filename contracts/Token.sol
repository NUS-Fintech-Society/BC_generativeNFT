// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Token is ERC721Enumerable, ERC721Pausable, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; // For indexing of tokens

    uint256 public constant MAX_SUPPLY = 250;
    uint256 public constant PRICE = 0.01 ether;

    string public baseTokenURI;

    /// @param baseURI IPFS URL holding JSON Metadata for NFT
    constructor(string memory baseURI) ERC721("NUSToken", "NUS") {
        setBaseURI(baseURI);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    /// @dev Allows owner of contract to change baseTokenURI after contract has been deployed
    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    /// @dev Allows owner of contract to pause contract
    function pause() public onlyOwner {
        _pause();
    }

    /// @dev Allows owner of contract to unpause contract
    function unpause() public onlyOwner {
        _unpause();
    }

    /// @dev Allows owner of contract to withdraw the whole balance to own account
    function withdraw() public payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ether to withdraw");
        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transaction failed");
    }

    /// @dev Front facing function to mint Tokens
    function mintTokens(uint256 _noOfTokens) public payable {
        uint256 totalMinted = _tokenIds.current();

        require(
            totalMinted.add(_noOfTokens) <= MAX_SUPPLY,
            "Attempted quantity to mint exceeds max supply if minted"
        );
        require(_noOfTokens > 0, "Number of tokens cannot be zero or negative");
        require(
            msg.value >= PRICE.mul(_noOfTokens),
            "Not enough ether to mint token"
        );

        for (uint256 i = 0; i < _noOfTokens; i++) {
            _mintOneToken();
        }
    }

    function _mintOneToken() private returns (uint256) {
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _tokenIds.increment();
        return newTokenId;
    }

    /// @dev Returns all tokens of a specific address (owner)
    function tokensOfOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokenIds;
    }

    /// @dev Returns all tokens that have been minted
    function tokensOfAll() external view returns (uint256[] memory) {
        uint256 tokenCount = totalSupply();
        uint256[] memory tokenIds = new uint256[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenByIndex(i);
        }

        return tokenIds;
    }

    /// @dev The following functions are overrides required by Solidity
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721Enumerable, ERC721Pausable) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
