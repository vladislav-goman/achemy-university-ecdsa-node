const { secp256k1 } = require('ethereum-cryptography/secp256k1.js');
const { toHex } = require('ethereum-cryptography/utils.js');
const { keccak256 } = require('ethereum-cryptography/keccak.js');

function generate() {
  const privateKey = secp256k1.utils.randomPrivateKey();
  const publicKey = secp256k1.getPublicKey(privateKey);

  function getAddress(publicKey) {
    const ethAddress = publicKey.slice(1);
    const hash = keccak256(ethAddress);
    return hash.slice(hash.length - 20);
  }

  const address = getAddress(publicKey);

  return {
    privateKey: toHex(privateKey),
    publicKey: toHex(publicKey),
    address: toHex(address),
  };
}
