const WalletConnectProvider = window.WalletConnectProvider.default;


// Chosen wallet provider given by the dialog window
let provider;


// Address of the selected account
let selectedAccount;

const metamaskButton = document.getElementById("metamask");
const mintButton = document.getElementById("mint");
const commentDiv = document.getElementById("text_comment");


const contract_abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"address payable","name":"relayerAddress","type":"address"},{"indexed":false,"internalType":"bytes","name":"functionSignature","type":"bytes"}],"name":"MetaTransactionExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"PermanentURI","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bytes","name":"functionSignature","type":"bytes"},{"internalType":"bytes32","name":"sigR","type":"bytes32"},{"internalType":"bytes32","name":"sigS","type":"bytes32"},{"internalType":"uint8","name":"sigV","type":"uint8"}],"name":"executeMetaTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"flipAllSaleStates","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipPreSaleState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipReveal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipSaleState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"numberOfTokens","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"numberOfTokens","type":"uint256"}],"name":"mintReserved","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI_","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newRate","type":"uint256"}],"name":"setDevFeeRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"placeholderURI_","type":"string"}],"name":"setPlaceholderURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"provenanceHash_","type":"string"}],"name":"setProvenanceHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"wallet","type":"address"}],"name":"setTeamWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawDev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawTeam","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_proxyRegistryAddress","type":"address"},{"internalType":"address","name":"teamWallet","type":"address"},{"internalType":"address","name":"devWallet","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ERC712_VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getChainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDomainSeperator","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"nonce","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReservedTokenCount","outputs":[{"components":[{"internalType":"uint256","name":"_value","type":"uint256"}],"internalType":"struct Counters.Counter","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenCount","outputs":[{"components":[{"internalType":"uint256","name":"_value","type":"uint256"}],"internalType":"struct Counters.Counter","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPreSaleActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isRevealed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isSaleActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_NFT_PURCHASE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NFT_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"provenanceHash","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

window.onload=function(){
mintButton.addEventListener('click', (e) => {
  console.log('Minting NFT...');
  e.preventDefault();
  var nbNFTtoMint = document.getElementsByName("quantity")[0].value;
  mintTokens(nbNFTtoMint);
});
}
function getAccounts(callback) {
  web3.eth.getAccounts((error,result) => {
      if (error) {
          console.log(error);
      } else {
          callback(result);
      }
  });
}


async function mintTokens(nb,acc) {
  var contract_addr = "0xf94F8421fBcacEdb45c059402c4568D199D05cb8";
  // The Metamask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  //const signer = provider.getSigner()
  const web3 = new Web3(Web3.givenProvider)
  var contract = new web3.eth.Contract(contract_abi, contract_addr, {
    from : "0x2538137867AEA631a3C880F26C1cC04eb843b8F9"
  });
  //0x1d50c978D66E9d6f71AA6663271F068A22DB6768
  //const accounts = await window.ethereum.send("eth_requestAccounts");
  //var selectedAccount = account; //l'account est déjà connecté normalement
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  var selectedAccount = accounts[0]; 
  var price = nb * 0.065;// 56000000000000000 wei
  var ethPrice = new web3.utils.BN(
    web3.utils.toWei(price.toString(),'ether')
);
  //var bal = web3.utils.BN(web3.eth.getBalance(selectedAccount).toString());
  var bali = await web3.eth.getBalance(selectedAccount);
  const weii = 1000000000000000000;
  var res = bali/weii;
  //var balance = web3.utils.fromWei(bal,'ether'); //Will give value in.
  //console.log("data de fonciton :",getData)
  //var ethPrice = web3.utils.toWei(toString(price),"ether");
  //var ethPrice = new 
  web3.eth.defaultAccount = selectedAccount;
  console.log("account : ", selectedAccount);
  console.log("nbre de token à mint :",nb);
  console.log("prix en eth: ",ethPrice);
  console.log("balance of account :",res.toString());
  if(res < price) {
    commentDiv.innerText = "Insufficient funds !"
    commentDiv.style.color = "#FF0000";
  }
  else {
  //check du compte et si ça fait le taff ou pas ;) tu mets message d'erreur ou tu laisses mint ;) 
  //MINTING 
  let nonce = await web3.eth.getTransactionCount(selectedAccount, 'pending');
  //let extraData =  await contract.methods.mint(nb);
  //let data = extraData.encodeABI();
  await contract.methods.mint(nb).send({ from: selectedAccount, value:ethPrice });
  //alert("NFT minted successfully");

  // alert("Mint Successful !")
  commentDiv.innerText = "Mint Successful !";
  commentDiv.style.color = "#e56a1e";
  }
}

   


function init() {

  console.log("Initializing example");
  console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);

}



async function onConnect() {
  //console.log("in da function");
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      console.log("account: ",account);
      //disable button 
      metamaskButton.disabled = true;
      metamaskButton.innerText = account;
      metamaskButton.style.color = "#fff";
      metamaskButton.style.fontSize = "16px";
      metamaskButton.style.fontWeight = 500;
      metamaskButton.style.background = "#e56a1e";
      metamaskButton.style.padding = "6px 12px";
      metamaskButton.style.border = "1px solid #e56a1e";
    } catch (error) {
      /*if (error.code === 4001) {
        console.log(error);
      }*/
      console.log(error);
      //setError(error);
    }
  }
}

/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
  init();
  metamaskButton.addEventListener("click", onConnect);
  metamaskButton.addEventListener("click", onConnect);
  //metamaskDisconnect.addEventListener("click", onDisconnect);
});