import { ethers } from "ethers";

// import STAKING_MANAGER_ABI from "./StakingManager.json";
import stakingAbi from "./StakingManager.json";
import ERC20ABI from "./ERC20.json"; // ERC20 standard ABI

export const connectWalletFunc = async (tokenAddressData) => {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask not found. Please install it.");
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    localStorage.setItem("providerCheck", provider);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const tokenAddress =
      tokenAddressData || localStorage.getItem("XXssf23TAddress");
    const tokenFinalAddress =
      tokenAddress || "0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B";

    console.log(tokenFinalAddress, "kjhjhdjdjhdkjhdkjhd");
    const token = new ethers.Contract(tokenFinalAddress, ERC20ABI.abi, signer);
    console.log(token, "token check kjsakjsh");
    const address = await signer.getAddress();
    let balance = 0;
    try {
      const rawBalance = await token.balanceOf(address);
      const decimals = await token.decimals();
      balance = ethers.formatUnits(rawBalance, decimals);
      console.log({ try: balance });
    } catch (error) {}
    console.log({ balance });

    // const address = await signer.getAddress();
    localStorage.setItem("xsigner1234", JSON.stringify(signer));

    const message = `Log into CyclX - ${new Date().toISOString().slice(0, 10)}`;
    const signature = await signer.signMessage(message);

    localStorage.setItem("session_signature", signature);
    localStorage.setItem("wallet_address", address);

    return { address, signature, balance };
  } catch (err) {
    alert(err?.code === "ACTION_REJECTED" ? "Action Rejected" : err.message);
    return null;
  }
};

export const disconnectWalletFunc = () => {
  localStorage.removeItem("session_signature");
  localStorage.removeItem("wallet_address");
  return true;
};

//||"0xCfEB869F69431e42cdB54A4F4f105C19C080A601"; //stakingmanager network
const STAKING_ADDRESS = import.meta.env.VITE_STAKING_ADDRESS;
const ChecktokenAddress = localStorage.getItem("XXssf23TAddress");
const TestTOKEN_ADDRESS =
  ChecktokenAddress || "0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B";
const TOKEN_ADDRESS = TestTOKEN_ADDRESS;
const Wallet_address = localStorage.getItem("wallet_address");

export const stakeTokenFunc = async (amount, info) => {
  console.log(amount, "sakjjhdasjkh");
  if (!window.ethereum) throw new Error("MetaMask not installed");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();

  const stakingContract = new ethers.Contract(
    STAKING_ADDRESS,
    stakingAbi.abi,
    signer
  );
  // const cycleId = await stakingContract.currentCycleId();
  const cycleId = info?.cycle;
  console.log("cycle", info, cycleId);

  // ✅ Cycle check
  if (Number(cycleId) === 0) {
    return { success: false, message: "No active cycle" };
  }
  const latestCycleId = Number(cycleId);

  // ✅ Chain setup
  const GANACHE_PARAMS = {
    chainId: "11155111",
    chainName: "Public node",
    rpcUrls: [import.meta.env.VITE_RPC_URL],
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
  };
  const PARAMS = {
    chainId: "0xaa36a7",
    chainName: "Sepolia Test Network",
    rpcUrls: [import.meta.env.VITE_RPC_URL],
    nativeCurrency: { name: "SepoliaETH", symbol: "ETH", decimals: 18 },
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  };

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: PARAMS.chainId }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [PARAMS],
      });
    } else {
      console.error("Switch error:", switchError);
      return;
    }
  }

  // ✅ Token setup
  const TAddress = info?.stakedtoken || localStorage.getItem("XXssf23TAddress"); //Token address
  console.log(TAddress, "asdjajldkajld");
  if (!TAddress) {
    throw new Error("Token address not found in localStorage");
  }

  const token = new ethers.Contract(TAddress, ERC20ABI.abi, signer);
  const decimals = await token.decimals();

  // ✅ Parse amount correctly
  if (!amount || isNaN(amount)) {
    throw new Error("Invalid amount");
  }
  console.log(amount, "sjksdhjkdshdkfsj");
  const stakeAmountWei = ethers.parseUnits(amount.toString(), decimals);

  // ✅ Balance check
  const rawBalance = await token.balanceOf(userAddress);
  if (rawBalance < stakeAmountWei) {
    alert("Insufficient tokens to stake");
    return;
  }

  console.log(
    "Balance:",
    ethers.formatUnits(rawBalance, decimals),
    "Stake:",
    ethers.formatUnits(stakeAmountWei, decimals)
  );
  console.log(STAKING_ADDRESS, "sakjskjsahashasjhsak", stakeAmountWei);
  // ✅ Allowance check
  const allowance = await token.allowance(userAddress, STAKING_ADDRESS);
  if (allowance < stakeAmountWei) {
    const approveTx = await token.approve(STAKING_ADDRESS, stakeAmountWei);
    await approveTx.wait();
    console.log("✅ Tokens approved");
  }
  console.log("✅ Tokens approved", latestCycleId, stakeAmountWei);

  // ✅ Staking tx
  const tx = await stakingContract.stake(latestCycleId, stakeAmountWei, {
    gasLimit: 1000000,
  });

  await tx.wait();
  console.log(
    `✅ Successfully staked ${amount} tokens in cycle ${latestCycleId}`
  );
  return { success: true, message: "Stake successful" };
};
// export const stakeTokenFunc = async (amount, cycle) => {
//   console.log(amount, "sakjjhdasjkh");
//   if (!window.ethereum) throw new Error("MetaMask not installed");

//   const provider = new ethers.BrowserProvider(window.ethereum);
//   const signer = await provider.getSigner();
//   const userAddress = await signer.getAddress();

//   const stakingContract = new ethers.Contract(
//     STAKING_ADDRESS,
//     stakingAbi.abi,
//     signer
//   );
//   const cycleId = await stakingContract.currentCycleId();
//   console.log("cycle", cycle, cycleId);

//   // ✅ Cycle check
//   if (Number(cycleId) === 0) {
//     return { success: false, message: "No active cycle" };
//   }
//   const latestCycleId = Number(cycleId) - 1;

//   // ✅ Chain setup
//   const GANACHE_PARAMS = {
//     chainId: "0x539",
//     chainName: "Ganache (Dev)",
//     rpcUrls: [import.meta.env.VITE_RPC_URL],
//     nativeCurrency: {
//       name: "Ethereum",
//       symbol: "ETH",
//       decimals: 18,
//     },
//   };

//   try {
//     await window.ethereum.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: GANACHE_PARAMS.chainId }],
//     });
//   } catch (switchError) {
//     if (switchError.code === 4902) {
//       await window.ethereum.request({
//         method: "wallet_addEthereumChain",
//         params: [GANACHE_PARAMS],
//       });
//     } else {
//       console.error("Switch error:", switchError);
//       return;
//     }
//   }

//   // ✅ Token setup
//   const TAddress = localStorage.getItem("XXssf23TAddress"); //Token address
//   console.log(TAddress, "asdjajldkajld");
//   if (!TAddress) {
//     throw new Error("Token address not found in localStorage");
//   }

//   const token = new ethers.Contract(TAddress, ERC20ABI.abi, signer);
//   const decimals = await token.decimals();

//   // ✅ Parse amount correctly
//   if (!amount || isNaN(amount)) {
//     throw new Error("Invalid amount");
//   }
//   console.log(amount, "sjksdhjkdshdkfsj");
//   const stakeAmountWei = ethers.parseUnits(amount.toString(), decimals);

//   // ✅ Balance check
//   const rawBalance = await token.balanceOf(userAddress);
//   if (rawBalance < stakeAmountWei) {
//     alert("Insufficient tokens to stake");
//     return;
//   }

//   console.log(
//     "Balance:",
//     ethers.formatUnits(rawBalance, decimals),
//     "Stake:",
//     ethers.formatUnits(stakeAmountWei, decimals)
//   );
//   console.log(STAKING_ADDRESS, "sakjskjsahashasjhsak", stakeAmountWei);
//   // ✅ Allowance check
//   const allowance = await token.allowance(userAddress, STAKING_ADDRESS);
//   if (allowance < stakeAmountWei) {
//     const approveTx = await token.approve(STAKING_ADDRESS, stakeAmountWei);
//     await approveTx.wait();
//     console.log("✅ Tokens approved");
//   }
//   console.log("✅ Tokens approved", latestCycleId, stakeAmountWei);

//   // ✅ Staking tx
//   const tx = await stakingContract.stake(latestCycleId, stakeAmountWei, {
//     gasLimit: 1000000,
//   });

//   await tx.wait();
//   console.log(
//     `✅ Successfully staked ${amount} tokens in cycle ${latestCycleId}`
//   );
//   return { success: true, message: "Stake successful" };
// };

export const getUserStakes = async (
  cycleIdParam = null,
  tokenAddressData,
  info
) => {
  // try {
  console.log(cycleIdParam, "kjashkjdhkh");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();

  // Contract instance
  const stakingContract = new ethers.Contract(
    STAKING_ADDRESS,
    stakingAbi.abi,
    signer
  );

  // let cycleId = await stakingContract.currentCycleId();
  let cycleId = info?.cycle;
  if (Number(cycleId) === 0) {
    return { success: false, message: "No active cycle" };
  }
  const latestCycleId = Number(cycleId);
  // const latestCycleId =
  //   cycleIdParam !== null ? Number(cycleIdParam) : Number(cycleId) - 1;

  console.log({ latestCycleId });
  console.log(userAddress, "jjasdks", latestCycleId);
  var data = await stakingContract.getUserStake(latestCycleId, userAddress);

  const walletProvider = new ethers.BrowserProvider(window.ethereum);

  const tokenAddress =
    tokenAddressData || localStorage.getItem("XXssf23TAddress");
  const tokenFinalAddress =
    tokenAddress || "0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B";
  console.log(tokenFinalAddress, "kjhjhdjdjhdkjhdkjhd");

  const token = new ethers.Contract(
    tokenFinalAddress,
    ERC20ABI.abi,
    walletProvider
  );
  console.log(token, "token check kjsakjsh");
  const rawBalance = await token.balanceOf(userAddress);
  const decimals = await token.decimals();

  const balance = ethers.formatUnits(rawBalance, decimals);
  console.log(balance, "asksjdlkjslkjlksd");

  let userStakes = Number(data);
  if (Number(data) != 0) {
    const totalStakedToken = ethers.formatUnits(data, decimals);
    console.log(totalStakedToken, "ssffskjfkfsjkfsd");
    data = totalStakedToken;
  } else data = Number(data);

  console.log(userStakes);
  const responseData = {
    userStakes: data,
    userBalance: balance,
  };

  console.log(responseData, "jhjksdhkjhfsdkjfhskhfskdj");

  return { success: true, responseData, message: "success" };
  // } catch (error) {
  //   console.error(error);
  //   return {
  //     success: false,
  //     message: "Something went wrong",
  //     error: error.message,
  //   };
  // }
};

// -----------------CLAIM TOKENS-----------------------------------------

export const claimTokens = async (cycleInfo) => {
  try {
    const cycleId = cycleInfo?.cycle;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    const stakingContract = new ethers.Contract(
      STAKING_ADDRESS,
      stakingAbi.abi,
      signer
    );

    // let cycleId = await stakingContract.currentCycleId();
    // if (Number(cycleId) === 0) {
    //   throw new Error("No active cycle");
    // }

    // // ⚠️ Try without -1 first
    // const latestCycleId = Number(cycleId) - 1;
    const latestCycleId = cycleId;

    let userStakes = await stakingContract.getUserStake(
      latestCycleId,
      userAddress
    );
    console.log("User stakes:", Number(userStakes));

    if (Number(userStakes) === 0) {
      throw new Error("No stakes found in this cycle");
    }

    // const cycleInfo = await stakingContract.getCycle(latestCycleId);
    console.log("Cycle info jhjhhjjjhjhhjhj:", cycleInfo);

    const phase = cycleInfo.phase;

    if (phase !== "Claiming") {
      throw new Error(`Cycle is currently in phase: ${phase}`);
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
