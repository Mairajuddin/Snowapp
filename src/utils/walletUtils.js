import { ethers } from 'ethers';

// import STAKING_MANAGER_ABI from "./StakingManager.json";
import stakingAbi from "./StakingManager.json";
import ERC20ABI from "./ERC20.json"; // ERC20 standard ABI

const CYCLE = {
  0: 'Rest',
  1: 'Staking',
  2: 'Claiming'
}



export const connectWalletFunc = async () => {
  if (typeof window.ethereum === 'undefined') {
    alert('MetaMask not found. Please install it.');
    return null;
  }

  try {

    const provider = new ethers.BrowserProvider(window.ethereum);
    localStorage.setItem('providerCheck', provider)
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const tokenAddress = localStorage.getItem("XXssf23TAddress")
    const tokenFinalAddress = tokenAddress || "0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B"
    console.log(tokenFinalAddress, 'kjhjhdjdjhdkjhdkjhd')
    const token = new ethers.Contract(tokenFinalAddress, ERC20ABI.abi, signer);
    console.log(token, 'token check kjsakjsh')
    const address = await signer.getAddress();
    const rawBalance = await token.balanceOf(address);

    // const rawBalance = await token.balanceOf(Wallet_address);
    const decimals = await token.decimals();

    const balance = ethers.formatUnits(rawBalance, decimals);



    // const address = await signer.getAddress();
    localStorage.setItem('xsigner1234', JSON.stringify(signer))

    const message = `Log into CyclX - ${new Date()
      .toISOString()
      .slice(0, 10)}`;
    const signature = await signer.signMessage(message);

    localStorage.setItem('session_signature', signature);
    localStorage.setItem('wallet_address', address);

    return { address, signature, balance };
  } catch (err) {
    alert('❌ Error: ' + err.message);
    return null;
  }
};

export const disconnectWalletFunc = () => {
  localStorage.removeItem('session_signature');
  localStorage.removeItem('wallet_address');
  return true;
};

const STAKING_ADDRESS = "0xCfEB869F69431e42cdB54A4F4f105C19C080A601"; //stakingmanager network
const ChecktokenAddress = localStorage.getItem("XXssf23TAddress")
const TestTOKEN_ADDRESS = ChecktokenAddress || "0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B"
const TOKEN_ADDRESS = TestTOKEN_ADDRESS
const Wallet_address = localStorage.getItem("wallet_address")



export const stakeTokenFunc = async (amount) => {

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();


  const stakingContract = new ethers.Contract(
    STAKING_ADDRESS,
    stakingAbi.abi,
    signer
  );
  let cycleId = await stakingContract.currentCycleId();

  if (Number(cycleId) === 0) {
    return { success: false, message: "No active cycle" };
  }


  const latestCycleId = Number(cycleId) - 1;

  const GANACHE_PARAMS = {
    chainId: "0x539",
    chainName: "Ganache (Dev)",
    rpcUrls: ["https://labubu3.4xbrokers.com/"],
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
  };


  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: GANACHE_PARAMS.chainId }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [GANACHE_PARAMS],
      });
    } else {
      console.error("Switch error:", switchError);
      return;
    }
  }

  if (!window.ethereum) throw new Error("MetaMask not installed");

  // const provider = new ethers.BrowserProvider(window.ethereum);
  // const signer = await provider.getSigner();
  // const userAddress = await signer.getAddress();

  const TAddress = localStorage.getItem("XXssf23TAddress") //Token address
  console.log(TAddress, 'kjsdhkjdh')

  const token = new ethers.Contract(TAddress, ERC20ABI.abi, signer);
  const staking = new ethers.Contract(STAKING_ADDRESS, stakingAbi.abi, signer);


  const decimals = 18;


  const stakeAmountWei = ethers.parseUnits(amount.toString(), decimals); // BigInt (wei)

  const rawBalance = await token.balanceOf(userAddress);

  const balance = ethers.formatUnits(rawBalance, decimals);
  console.log(balance, 'Insufficient tokens to stake', stakeAmountWei, amount);


  if (rawBalance < stakeAmountWei) {
    alert('Insufficient tokens to stake');
    return;
  }

  console.log(
    "Balance:", ethers.formatUnits(rawBalance, decimals),
    "Stake:", ethers.formatUnits(stakeAmountWei, decimals)
  );


  const allowance = await token.allowance(userAddress, STAKING_ADDRESS);
  if (allowance < stakeAmountWei) {
    const approveTx = await token.approve(STAKING_ADDRESS, stakeAmountWei);
    await approveTx.wait();
    console.log("✅ Tokens approved");
  }

  let nonce = await provider.getTransactionCount(Wallet_address);
  const tx = await staking.stake(latestCycleId, stakeAmountWei, {
    gasLimit: 1000000,
    nonce,
  });

  await tx.wait();
  console.log(`✅ Successfully staked ${amount} tokens in cycle ${latestCycleId}`);
};



// --------------------------GET USER STAKES-----------------------------------------------

export const getUserStakes = async ( cycleIdParam = null) => {
  try {
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    // Contract instance
    const stakingContract = new ethers.Contract(
      STAKING_ADDRESS,
      stakingAbi.abi,
      signer
    );


    let cycleId = await stakingContract.currentCycleId();

    if (Number(cycleId) === 0) {
      return { success: false, message: "No active cycle" };
    }


    const latestCycleId =
      cycleIdParam !== null ? Number(cycleIdParam) : Number(cycleId) - 1;

    console.log({ latestCycleId });

    var data = await stakingContract.getUserStake(
      latestCycleId,
      userAddress
    );

    const walletProvider = new ethers.BrowserProvider(window.ethereum);


    const tokenAddress = localStorage.getItem("XXssf23TAddress")
    const tokenFinalAddress = tokenAddress || "0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B"
    console.log(tokenFinalAddress, 'kjhjhdjdjhdkjhdkjhd')

    const token = new ethers.Contract(tokenFinalAddress, ERC20ABI.abi, walletProvider);
    console.log(token, 'token check kjsakjsh')
    const rawBalance = await token.balanceOf(Wallet_address);
    const decimals = await token.decimals();

    const balance = ethers.formatUnits(rawBalance, decimals);
    console.log(balance, 'asksjdlkjslkjlksd')
 let userStakes
    if (Number(data) != 0) {
     

      const totalStakedToken = ethers.formatUnits(data, decimals);
      userStakes = totalStakedToken;
      
    } else userStakes = Number(data);
console.log(userStakes)
    const responseData = {
      userStakes: userStakes,
      userBalance: balance
    };

    console.log(data, 'jhjksdhkjhfsdkjfhskhfskdj')

    return { success: true, responseData, message: "success" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong",
      error: error.message,
    };
  }
};

// -----------------CLAIM TOKENS-----------------------------------------


export const claimTokens = async () => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    const stakingContract = new ethers.Contract(
      STAKING_ADDRESS,
      stakingAbi.abi,
      signer
    );

    let cycleId = await stakingContract.currentCycleId();
    if (Number(cycleId) === 0) {
      throw new Error("No active cycle");
    }

    // ⚠️ Try without -1 first
    const latestCycleId = Number(cycleId) - 1;

    let userStakes = await stakingContract.getUserStake(latestCycleId, userAddress);
    console.log("User stakes:", Number(userStakes));

    if (Number(userStakes) === 0) {
      throw new Error("No stakes found in this cycle");
    }

    const cycleInfo = await stakingContract.getCycle(latestCycleId);
    console.log("Cycle info jhjhhjjjhjhhjhj:", cycleInfo);

    const phase = Number(cycleInfo.phase);
    if (CYCLE[phase] !== 'Claiming') {
      throw new Error(`Cycle is currently in phase: ${CYCLE[phase]}`);
    }
    if (
      cycleInfo?.rewardToken == "0x0000000000000000000000000000000000000000"
    ) {
      throw new Error(` Cycle not finalized`);

    }



    // let nonce = await provider.getTransactionCount(Wallet_address, "latest")
    const tx = await stakingContract.claim(latestCycleId, {
      gasLimit: 1_000_000, // adjust if needed
    });

    await tx.wait();

    console.log("Claim Tx:", tx.hash);
    return { success: true, hash: tx.hash };

  } catch (error) {
    console.error("Claim error:", error);
    return { success: false, message: error.message };
  }
};

