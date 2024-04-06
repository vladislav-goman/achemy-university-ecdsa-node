const {
  utf8ToBytes,
  toHex,
  hexToBytes,
} = require('ethereum-cryptography/utils.js');
const { secp256k1 } = require('ethereum-cryptography/secp256k1.js');
const { keccak256 } = require('ethereum-cryptography/keccak.js');

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  const hash = keccak256(bytes);

  return hash;
}

function getAddress(publicKeyHex) {
  const publicKey = hexToBytes(publicKeyHex);
  const ethAddress = publicKey.slice(1);
  const hash = keccak256(ethAddress);
  return toHex(hash.slice(hash.length - 20));
}

function verifyTransaction(signatureHex, transaction, recovery) {
  const signature = secp256k1.Signature.fromCompact(signatureHex);
  const recoverySignature = signature.addRecoveryBit(recovery);
  const transactionHash = hashMessage(JSON.stringify(transaction));
  const publicKey = recoverySignature
    .recoverPublicKey(transactionHash)
    .toRawBytes();

  const isValid = secp256k1.verify(
    recoverySignature,
    transactionHash,
    publicKey
  );

  return { isValid, publicKey: toHex(publicKey) };
}

module.exports = { hashMessage, getAddress, verifyTransaction };
