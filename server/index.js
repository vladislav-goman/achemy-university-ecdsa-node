const express = require('express');
const app = express();
const cors = require('cors');
const { getAddress, verifyTransaction } = require('./utils/utils');
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  '87d876046d32a6c6f1ec56d86cacd65a4a00ecac': 100,
  '18b325c6f62658823e1d315787604889b2f339c5': 50,
  df88c91c816d7fec68fe7d9bde972f563eb624b9: 75,
};

const usedNonce = [];

app.get('/balance/:address', (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const { signatureHex, recovery, transaction } = req.body;
  const { isValid, publicKey } = verifyTransaction(
    signatureHex,
    transaction,
    recovery
  );

  const senderFromPublicKey = getAddress(publicKey);
  const { recipient, amount, sender, nonce } = transaction;

  if (sender != senderFromPublicKey) {
    return res.status(400).send({ message: 'Sender not match' });
  }

  if (!isValid) {
    return res.status(400).send({ message: 'Sender not confirmed' });
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    return res.status(400).send({ message: 'Not enough funds!' });
  }

  if (usedNonce.includes(nonce)) {
    console.log('Transaction nonce has been used before.');
    return res.status(400).send({
      message:
        'Transaction nonce has been used before. Potential replay attack.',
    });
  }

  balances[sender] -= amount;
  balances[recipient] += amount;
  usedNonce.push(nonce);
  return res.send({ balance: balances[sender] });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
