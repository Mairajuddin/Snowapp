// utils/walletUtils.js
import { ethers } from 'ethers';

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

    const message = `Log into Polymarket - ${new Date()
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

export const disconnectWallet = () => {
  localStorage.removeItem('session_signature');
  localStorage.removeItem('wallet_address');
  return true;
};
