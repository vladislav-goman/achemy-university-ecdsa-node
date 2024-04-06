import { useState } from 'react';
import server from './server';
import { createTransaction, signTransaction } from './util';

function Transfer({ setBalance, privateKey, address }) {
  const [sendAmount, setSendAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const transaction = createTransaction({
        amount: parseInt(sendAmount),
        recipient,
        sender: address,
      });
      const { signatureHex, recovery } = signTransaction(
        transaction,
        privateKey
      );

      const {
        data: { balance },
      } = await server.post(`send`, {
        signatureHex,
        recovery,
        transaction,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
