import { ethers } from 'ethers';

import STAKING_MANAGER_ABI from "./StakingManager.json";
import ERC20ABI from "./ERC20.json";




export const connectWalletFunc = async () => {
  if (typeof window.ethereum === 'undefined') {
    alert('MetaMask not found. Please install it.');
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send('eth_requestAccounts', []);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    const message = `Log into CyclX - ${new Date()
      .toISOString()
      .slice(0, 10)}`;
    const signature = await signer.signMessage(message);

    localStorage.setItem('session_signature', signature);
    localStorage.setItem('wallet_address', address);

    return { address, signature };
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


export const stakeToken=async(amount, provider, wallet)=>  {
  try {
    config();

    // const { STAKING_MANAGER_ABI,  ERC20ABI } =
    //   process.env;

    const Cycle = {
      0: "Rest",
      1: "Staking",
      2: "Claiming",
    };

    const networks = Object.keys(STAKING_MANAGER_ABI?.networks)[0];

    const STAKING_MANAGER =
      STAKING_MANAGER_ABI.networks[networks]?.address 

    const stakingContract = new ethers.Contract(
      STAKING_MANAGER,
      STAKING_MANAGER_ABI.abi,
      provider
    );

    const staking = stakingContract.connect(wallet);

    let cycleId = await staking.currentCycleId();

    if (Number(cycleId) === 0) return;

    const latestCycleId = Number(await staking.currentCycleId()) - 1;

    const cycleInfo = await staking.getCycle(latestCycleId);

    const phase = Number(cycleInfo.phase);
    console.log(Cycle[phase], "Rest");

    // if (Cycle[phase] == "Rest") await phraseUpdate(latestCycleId);

    const startTimestamp = Number(cycleInfo.startTimestamp);

    if (startTimestamp <= 0) return;

    // let nonce = await provider.getTransactionCount(wallet?.address);
    // let nonce = await provider.getTransactionCount(wallet.address, "pending");

    // nonce = nonce ? nonce + 1 : null;

    let receipt = null;

    const currentTime = Math.floor(Date.now() / 1000);

    console.log("Debug info:", {
      currentPhase: Cycle[phase],
      cycleId: latestCycleId,
      startTimestamp: Number(cycleInfo.startTimestamp),
      stakingEnd: Number(cycleInfo.stakingEnd),
      currentTime,
      isInStakingPeriod:
        currentTime >= Number(cycleInfo.startTimestamp) &&
        currentTime < Number(cycleInfo.stakingEnd),
    });

    if (Cycle[phase] === "Claiming") {
      // Claiming
      console.log("Claiming rewards...");
      await staking.claim();
    } else if (Cycle[phase] === "Staking") {
      // Staking
      console.log("Staking token...");

      const tokenAddress = await staking.currentStakedToken();

      const token = new ethers.Contract(tokenAddress, ERC20ABI?.abi, wallet);

      const decimals = await token.decimals();

      const parsedAmount = ethers.parseUnits(amount.toString(), decimals);

      const balance = await token.balanceOf(wallet.address);

      console.log("User balance:", ethers.formatUnits(balance, decimals));

      if (balance < parsedAmount) return;

      // Check allowance
      const allowance = await token.allowance(wallet.address, staking.target);
      console.log(
        "Current allowance:",
        ethers.formatUnits(allowance, decimals)
      );

      if (allowance < parsedAmount) {
        console.log("Approving tokens with correct amount...");

        const approveTx = await token.approve(staking.target, parsedAmount);

        await approveTx.wait();
      }

      // Stake
      const stakeTx = await staking.stake(latestCycleId, amount, {
        gasLimit: 1_000_000,
        // nonce,
      });
      console.log({ stakeTx });

      const StakeTxReceipt = await stakeTx.wait();

      console.log({ StakeTxReceipt });

      console.log(`Staked ${amount} TOKENS IN CYCLE: ${latestCycleId}`, "\n");

      return;
    } else {
      console.log("CURRENTLY IN REST PHASE. WAITING FOR THE NEXT CYCLE...\n");
    }

    return;
  } catch (error) {
    console.error(error);
    return;
  }
}
