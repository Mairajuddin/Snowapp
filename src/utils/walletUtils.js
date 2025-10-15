import { ethers } from "ethers";
//dev branch

import stakingAbi from "./StakingManager.json";
import ERC20ABI from "./ERC20.json"; // ERC20 standard ABI


const Cycle = {
  0: "Rest",
  1: "Staking",
  2: "Claiming",
};
const zeroAddress = "0x0000000000000000000000000000000000000000";



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
    } catch (error) { }
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
  // if (Number(cycleId) === 0) {
  //   return { success: false, message: "No active cycle" };
  // }
  const latestCycleId = Number(cycleId);

  // ✅ Chain setup
  const NETWORKS = {
    DEVNET: {
      chainId: "0x539",
      chainName: "Public node",
      rpcUrls: [import.meta.env.VITE_RPC_URL],
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
    },
    TESTNET: {
      chainId: "0xaa36a7",
      chainName: "Sepolia Test Network",
      rpcUrls: [import.meta.env.VITE_RPC_URL],
      nativeCurrency: { name: "SepoliaETH", symbol: "ETH", decimals: 18 },
      blockExplorerUrls: ["https://sepolia.etherscan.io/"],
    },
    MAINNET: {},
  };
  const paramCheck = import.meta.env.VITE_NETWORK
  const PARAMS = NETWORKS[paramCheck];
  console.log(PARAMS, 'sdkhgsd')

  // const PARAMS = {
  //   chainId: "0x539",
  //   chainName: "Public node",
  //   rpcUrls: [import.meta.env.VITE_RPC_URL],
  //   nativeCurrency: {
  //     name: "Ethereum",
  //     symbol: "ETH",
  //     decimals: 18,
  //   },
  // };
  console.log(PARAMS.chainId, 'jhasdhaskjhdkjjas')

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
    console.log(cycleInfo,'jhhgasdhjgashgdashg')
    const cycleId = cycleInfo?.cycle;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    const stakingContract = new ethers.Contract(
      STAKING_ADDRESS,
      stakingAbi.abi,
      signer
    );


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
    console.log(cycleInfo?.rewardToken, 'ksjadhjsadkjhajkshkdjash')
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



// -------------------------GET CYCLE INFO--------------------------------------------------
export const getCycleInfo = async () => {
  try {
    if (!window.ethereum) throw new Error("MetaMask not installed");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

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
    const cycleInfo = await stakingContract.getCycle(latestCycleId);

    // const phase = await stakingContract._computePhase(latestCycleId);
    // console.log(phase,'check my pase')
    let Phase = await stakingContract._computePhase(latestCycleId);
    Phase = Cycle[Number(Phase)];
    console.log(Phase, 'check my hase here');
    const {
      phase,
      startTimestamp,
      stakingEnd,
      claimEnd,
      rewardToken,
      stakedToken,
      totalStaked,
      tokenVersionAddress,
    } = cycleInfo;

    const block = await provider.getBlock("latest");
    const now = block.timestamp;

    let previoustoken = zeroAddress;

    if (latestCycleId > 0) {
      const previousCycleId = latestCycleId - 1;
      const cycle = await stakingContract.getCycle(previousCycleId);
      previoustoken = cycle?.tokenVersionAddress;
    }

    const stakedTokenContract = new ethers.Contract(
      stakedToken,
      ERC20ABI.abi,
      signer
    );

    const stakedTokenDecimals = await stakedTokenContract.decimals();
    const totalStakedToken = ethers.formatUnits(totalStaked, stakedTokenDecimals);



    let data = {
      cycle: latestCycleId,
      phase: Cycle[Number(phase)],
      totalStaked: Number(totalStakedToken),
      startTimestamp: Number(startTimestamp),
      stakingEnd: Number(stakingEnd),
      claimEnd: Number(claimEnd),
      rewardToken: rewardToken,
      stakedToken: stakedToken,
      tokenVersionAddress,
      previoustoken,
      cycleEnded: now >= Number(claimEnd) ? true : false,
    };

    if (rewardToken !== zeroAddress) {
      const token = new ethers.Contract(rewardToken, ERC20ABI.abi, signer);
      const name = await token.name();
      const symbol = await token.symbol();
      const decimals = await token.decimals();
      const supply = await token.totalSupply();
      const totalSupply = ethers.formatUnits(supply, decimals);

      const reward = {
        rewardToken,
        name,
        symbol,
        decimals: decimals.toString(),
        totalSupply,
      };

      data.reward = reward;
    }

    return { success: true, data, message: "success" };
  } catch (error) {
    console.error("Get Cycle Info Error:", error);
    return {
      success: false,
      message: "Something went wrong",
      error: error.message,
    };
  }
};


// -------------------------------CREATE CYCLE----------------------------------------

export const createCycle = async () => {
  try {

    if (!window.ethereum) throw new Error("MetaMask not installed");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();
    console.log(userAddress, 'aksdkjsdfkjsdhfhksdjfsjdsfkj')

    const stakingContract = new ethers.Contract(
      STAKING_ADDRESS,
      stakingAbi.abi,
      signer
    );

    let cycleId = await stakingContract.currentCycleId();
    cycleId = Number(cycleId);
    const now = (await provider.getBlock("latest")).timestamp;

    const savedRewardToken = localStorage.getItem("rewardToken");
    const tokenToUse = savedRewardToken || import.meta.env.VITE_TOKEN_ADDRESS;

    let newCycleId;

    // Case 1: No cycle exists
    if (cycleId === 0) {
      // newCycleId = await createNewCycle(stakingContract,provider, userAddress);
      newCycleId = await createNewCycle(stakingContract, tokenToUse, provider, userAddress);
    }
    // Case 2: Cycle exists
    else if (cycleId > 0) {
      const cycleInfo = await stakingContract.getCycle(cycleId - 1);
      const { startTimestamp, stakingEnd, claimEnd, phase, tokenVersionAddress } = cycleInfo;

      const startTime = Number(startTimestamp);
      const stakeEnd = Number(stakingEnd);
      const claimEndNum = Number(claimEnd);


      const cycleEnded = Number(claimEnd) < Math.floor(Date.now() / 1000);


      if (cycleEnded) {

        newCycleId = await createNewCycle(stakingContract, tokenToUse, provider, userAddress);
        // newCycleId = await createNewCycle(stakingContract,provider, userAddress);
      } else {
        return {
          success: false,
          message: "Current cycle is still active. Cannot create a new cycle yet."
        };
      }
    }

    return {
      success: true,
      message: "Cycle created successfully",
      cycleId: newCycleId
    };
  } catch (error) {
    console.error("Create Cycle Error:", error);
    return {
      success: false,
      message: "Something went wrong",
      error: error?.message || error,
    };
  }
};


const createNewCycle = async (stakingContract, tokenAddr, provider, userAddress) => {
  console.log(import.meta.env.VITE_TOKEN_ADDRESS, tokenAddr, 'sjhakdhsjkhfsdkfbsd')
  let nonce = await provider.getTransactionCount(userAddress, "latest");
  let tx;

  try {
    console.log("CREATING NEW CYCLE WITH NONCE", nonce);
    // tx = await stakingContract.createCycle(tokenAddr, {
    //   gasLimit: 1_000_000,
    // });
    tx = await stakingContract.createCycle({
      gasLimit: 1_000_000,
    });
  } catch (error) {
    console.log("TRYING TO CREATE CYCLE AGAIN WITH NONCE", nonce + 1);
    // tx = await stakingContract.createCycle(tokenAddr, {
    //   nonce: nonce + 1,
    //   gasLimit: 1_000_000,
    // });
    tx = await stakingContract.createCycle({
      nonce: nonce + 1,
      gasLimit: 1_000_000,
    });
  }

  const receipt = await tx.wait();

  const event = receipt.logs
    .map((log) => {
      try {
        return stakingContract.interface.parseLog(log);
      } catch {
        return null;
      }
    })
    .find((e) => e && e.name === "CycleCreated");

  const newCycleId = event.args.cycleId.toString();
  console.log(`NEW CYCLE CREATED: CyclexV${newCycleId}`);

  return newCycleId;
};



// ----------------------Update cycle------------------------------
export const updateCycle = async () => {
  try {
    if (!window.ethereum) throw new Error("MetaMask not installed");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    const stakingContract = new ethers.Contract(
      STAKING_ADDRESS,
      stakingAbi.abi,
      signer
    );

    let cycleId = await stakingContract.currentCycleId();
    cycleId = Number(cycleId);

    if (cycleId === 0) {
      return { success: false, message: "No active cycle" };
    }

    const latestCycleId = cycleId - 1;

    let nonce = await provider.getTransactionCount(userAddress, "latest");
    let tx;

    try {
      console.log("UPDATING PHASE WITH NONCE", nonce);
      tx = await stakingContract.updatePhase(latestCycleId, {
        gasLimit: 1_000_000,
        nonce,
      });
    } catch (error) {
      console.log("TRYING TO UPDATE PHASE AGAIN WITH NONCE", nonce + 1);
      tx = await stakingContract.updatePhase(latestCycleId, {
        gasLimit: 1_000_000,
        nonce: nonce + 1,
      });
    }

    await tx.wait();

    console.log("✅ Phase updated successfully");
    return { success: true, message: "Phase updated successfully" };
  } catch (error) {
    console.error("Update Cycle Error:", error);
    return {
      success: false,
      message: "Something went wrong",
      error: error.message,
    };
  }
};
// -----------------------------------finalize token
export const finalizeCycle = async (info) => {
  try {
    if (!window.ethereum) throw new Error("MetaMask not installed");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    const stakingContract = new ethers.Contract(
      STAKING_ADDRESS,
      stakingAbi.abi,
      signer
    );

    // 1️⃣ Get current cycle ID
    let cycleId = info?.cycle


    if (cycleId === 0) {
      return { success: false, message: "No active cycle" };
    }

    const latestCycleId = cycleId;
    const cycleInfo = await stakingContract.getCycle(latestCycleId);

    const { phase, rewardToken } = cycleInfo;

    // Optional: your phase enum (can match backend Cycle enum)
    //     const Cycle = ["Staking", "Claiming", "Rest"]; // update according to your contract
    // console.log(Cycle[Number(phase)] ,'check phase')
    // if (Cycle[Number(phase)] !== "Claiming") {   

    if (info?.phase !== "Claiming") {
      return {
        success: false,
        message: `Cycle is under ${info?.phase}`,
      };
    }

    const zeroAddress = "0x0000000000000000000000000000000000000000";

    if (rewardToken !== zeroAddress) {
      return {
        success: false,
        message: "Cycle already finalized.",
      };
    }

    console.log("✅ Finalizing cycle and deploying new reward token...");

    let nonce = await provider.getTransactionCount(userAddress, "latest");
    const feeData = await provider.getFeeData();

    let tx;
    try {
      console.log("FINALIZING WITH NONCE", nonce);
      tx = await stakingContract.finalizeCycleAndCreateToken(latestCycleId, {
        nonce,
        gasLimit: 1_000_000,
        maxFeePerGas: feeData.maxFeePerGas * 2n,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas * 2n,
      });
    } catch (error) {
      console.log("TRYING AGAIN WITH NONCE", nonce + 1);
      tx = await stakingContract.finalizeCycleAndCreateToken(latestCycleId, {
        nonce: nonce + 1,
        gasLimit: 1_000_000,
        maxFeePerGas: feeData.maxFeePerGas * 2n,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas * 2n,
      });
    }

    const receipt = await tx.wait();

    console.log("✅ Finalization successful:", receipt);
    const updatedCycle = await stakingContract.getCycle(latestCycleId);
    console.log("🎯 Reward Token Address:", updatedCycle.rewardToken);
    if (updatedCycle.rewardToken && updatedCycle.rewardToken !== zeroAddress) {
      localStorage.setItem("rewardToken", updatedCycle.rewardToken);
      console.log("💾 Reward token saved to localStorage:", updatedCycle.rewardToken);
    }

    return {
      success: true,
      message: "Cycle finalized and new reward token created successfully",
      receipt,
    };
  } catch (error) {
    console.error("❌ Finalize Cycle Error:", error);
    return {
      success: false,
      message: "Something went wrong while finalizing the cycle",
      error: error.message,
    };
  }
};

