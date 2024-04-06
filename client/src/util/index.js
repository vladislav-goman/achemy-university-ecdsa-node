import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils.js';
import { secp256k1 } from 'ethereum-cryptography/secp256k1.js';
import { keccak256 } from 'ethereum-cryptography/keccak.js';

export function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  const hash = keccak256(bytes);

  return hash;
}

export function signMessage(msg) {
  const hash = hashMessage(msg);
  const signature = secp256k1.sign(hash, PRIVATE_KEY);

  return signature;
}

export function getAddress(publicKey) {
  const ethAddress = publicKey.slice(1);
  const hash = keccak256(ethAddress);
  return hash.slice(hash.length - 20);
}

export function getAddressFromPrivateKey(privateKey) {
  let address = '';
  try {
    const publicKey = secp256k1.getPublicKey(privateKey);
    address = toHex(getAddress(publicKey));
  } catch (e) {
    console.error(e);
  }

  return address;
}

export function createTransaction({ amount, sender, recipient }) {
  return {
    amount,
    recipient: recipient,
    sender,
    date: Date.now(),
    nonce: Math.ceil(Math.random() * 10000),
  };
}

export function signTransaction(transaction, privateKey) {
  const transactionHash = hashMessage(JSON.stringify(transaction));

  const signature = secp256k1.sign(transactionHash, privateKey);
  const { recovery } = signature;
  const signatureHex = signature.toCompactHex();

  return { signatureHex, recovery };
}
