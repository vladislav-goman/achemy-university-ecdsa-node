# ECDSA Node

This project was created in scope of Blockchain Cryptography course on [Alchemy University](https://university.alchemy.com/).
ECDSA Node is a simple blockchain project that aims to provide a hands-on understanding of how digital signatures and public key cryptography work.
The project consists of a React front-end that communicates with a centralized server responsible for transferring balances between accounts.

## Goal

The primary goal of ECDSA Node is to implement a use case of Elliptic Curve Digital Signature Algorithm (ECDSA) to learn how to ensure secure transactions within the blockchain network.
By incorporating public key cryptography, only users with the appropriate private key can create valid signatures to authorize fund transfers between accounts. This enhances the security and integrity of transactions within the system.

## Features

- **Public Key Cryptography**: Transactions can only be completed with a valid signature generated using the private key corresponding to the sender's address.
- **Secure Transactions**: Users are required to verify their ownership of the private key before initiating a transaction, ensuring that only authorized individuals can transfer funds.
- **Replay Protection** A nonce-based system is implemented where each transaction from a user must include a unique nonce. The server keeps track of the nonces used by each user to prevent replay attacks. Once a nonce is used, it is invalidated to prevent its reuse.

## Technologies Used

- React: For the front-end user interface.
- Node.js: For the server-side implementation.
- Express.js: As the web framework for the server.
- [ethereum-cryptography](https://www.npmjs.com/package/ethereum-cryptography) npm package.

## Getting Started

To run the project locally, follow these steps:

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at [http://localhost:5173/](http://localhost:5173/)

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

## Usage

1. Upon accessing the application enter a private key (sample private keys could be found in `server\data\generatedData.json`.
2. To initiate a transaction, you must specify the recipient's address and the amount to transfer.
3. The server verifies the signature and processes the transaction if it's valid.
4. If the transaction is valid the server performs it (the data is stored on the server and is not saved to DB).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This project is for educational purposes only and should not be used in production environments without proper security measures and thorough testing. The creators of this project are not liable for any misuse or damage resulting from the use of this software.
