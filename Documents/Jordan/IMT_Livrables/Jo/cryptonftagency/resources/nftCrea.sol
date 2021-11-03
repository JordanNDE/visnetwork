// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./openzeppelin/contracts/utils/Counters.sol";
import "./ERC721Tradable.sol";


contract nftCrea is ERC721Tradable {
    using SafeMath for uint256;
    using Address for address;
    using Strings for uint256;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    Counters.Counter private _reservedTokenIdCounter;

    address payable _teamWallet; 
    address payable _devWallet; 
    uint256 private _price; 
  

    uint256 public constant NFT_PRICE = 65000000000000000; // 0.065 ETH
    uint public constant MAX_NFT_PURCHASE = 15; 

    uint256 private constant NFT_PRICE_PRE_SALE = 55000000000000000; // 0.055 ETH for pre-sale
    uint private constant MAX_NFT_PURCHASE_PRE_SALE = 15;

    /*uint256 private constant NFT_PRICE_LOVE = 59000000000000000; // 0.059 ETH for priviledged people (whitelisting)
    uint private constant MAX_NFT_PURCHASE_LOVE = 100; // peut être à désactiver  */

    uint256 public MAX_SUPPLY = 10000;
    /**
     * Reserve tokens for the team and community giveaways
     */
    uint private constant RESERVED_TOTAL = 200;//200;

    string private _baseURIExtended; // true BaseURI
    string private _placeholderURIExtended; // Default URI, waiting for the reveal 
    
    bool public isSaleActive = false;
    bool public isPreSaleActive = false;
    bool public isRevealed = false;

    //address public _governance;

    /*
    event GovernanceTransferred(
        address indexed previousOwner, 
        address indexed newOwner
    ); 
    */

    constructor(
        address _proxyRegistryAddress, //adresse de Opensea : 0xa5409ec958c83c3f309868babaca7c86dcb077c1 
        address teamWallet,
        address devWallet,
        string memory name, 
        string memory symbol
    ) ERC721Tradable(name, symbol, _proxyRegistryAddress) {
        /**
         * Start counting tokens with a reserved shift
         */
        _tokenIdCounter._value = RESERVED_TOTAL;
        _teamWallet = payable(teamWallet);
        _devWallet = payable(devWallet);
        //_governance = msg.sender;
    }

    modifier onlyAuthorized {
        require( msg.sender == _devWallet || msg.sender == _teamWallet || msg.sender == owner(), "only Authorized people only");
        _;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIExtended;
    }
    function setBaseURI(string memory baseURI_) external onlyOwner {
        _baseURIExtended = baseURI_;
    }

    function setPlaceholderURI(string memory placeholderURI_) external onlyOwner {
        _placeholderURIExtended = placeholderURI_;
    }

    function setTeamWallet(address payable wallet) public onlyOwner {
        _teamWallet = wallet;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        if (!isRevealed) {
            return string(abi.encodePacked(_placeholderURIExtended, tokenId.toString()));
        }

        string memory base = _baseURI();

        return string(abi.encodePacked(base, tokenId.toString()));
    }


    function _mintGeneric(
        uint256 CURRENT_NFT_PRICE,
        uint CURRENT_TOKENS_NUMBER_LIMIT,
        uint numberOfTokens
    ) internal {
        require(isSaleActive, "Sale is not active at the moment");
        require(numberOfTokens > 0, "Number of tokens can not be less than or equal to 0");
        require(_tokenIdCounter.current().add(numberOfTokens) <= MAX_SUPPLY, "Purchase would exceed max supply");

        if (isPreSaleActive) {
            CURRENT_NFT_PRICE = NFT_PRICE_PRE_SALE;
            CURRENT_TOKENS_NUMBER_LIMIT = MAX_NFT_PURCHASE_PRE_SALE;
        }

        _price = CURRENT_NFT_PRICE.mul(numberOfTokens);
        

        require(numberOfTokens <= CURRENT_TOKENS_NUMBER_LIMIT, "Tokens amount is out of limit");
        require(_price == msg.value, "Sent ether value is incorrect");

        for (uint i = 0; i < numberOfTokens; i++) {
            _safeMintGeneric(msg.sender, _tokenIdCounter); //we associate this msg.sender with the generated tokenids 
        }
    }


    function mint(uint numberOfTokens) public payable {
        _mintGeneric(NFT_PRICE, MAX_NFT_PURCHASE, numberOfTokens);
    }

    /*function mintLove(uint numberOfTokens) public payable {
        _mintGeneric(NFT_PRICE_LOVE, MAX_NFT_PURCHASE_LOVE, numberOfTokens);
    }*/

    /**
     * Lazily mint some reserved tokens (without paying)
     */

    function mintReserved(uint numberOfTokens) public onlyAuthorized {
        require(
            _reservedTokenIdCounter.current().add(numberOfTokens) <= RESERVED_TOTAL,
            "Minting would exceed max reserved supply"
        );

       for (uint i = 0; i < numberOfTokens; i++) {
            _safeMintGeneric(msg.sender, _reservedTokenIdCounter);
        }
    }
    
    function flipSaleState() public onlyOwner {
        isSaleActive = !isSaleActive;
    }
    function flipPreSaleState() public onlyOwner {
        isPreSaleActive = !isPreSaleActive;
    }
    function flipAllSaleStates() external onlyOwner {
       flipSaleState();
       flipPreSaleState();
    }
    function flipReveal() external onlyOwner {
        isRevealed = !isRevealed;
    }
    
    function getTokenCount() public view returns (Counters.Counter memory) {
        return _tokenIdCounter;
    }

    function getReservedTokenCount() public view onlyOwner returns (Counters.Counter memory) {
        return _reservedTokenIdCounter;
    }


    function getWalletDev() public view onlyOwner returns (address) {
        return _devWallet;
    }

    function getWalletTeam() public view onlyOwner returns (address) {
        return _teamWallet;
    }
    
    function withdraw(uint256 amount) public onlyAuthorized {  
        _teamWallet.transfer(amount);
    }

    function destroySmartContract(address payable _to) public {
        require(msg.sender == owner(), "You are not the owner");
        selfdestruct(_to);
    }
    
}

