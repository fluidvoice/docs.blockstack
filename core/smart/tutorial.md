---

description: Get Started Writing Smart Contracts with Clarity

---

# Hello, World!

## Overview

| Experience | | **Beginner**  |
| Duration | | **18 minutes** |

In the world of smart contracts, everything is a blockchain transaction. You use tokens in your wallet to deploy a smart contract in a transaction, and each call to that contract after it's published is a transaction, too. That means that at each step, tokens are being exchanged as transaction fees. This tutorial introduces you to this mode of programming, which transforms blockchains into powerful state machines capable of executing complex logic.

Clarity, Blockstack's smart contracting language, is based on LISP and uses its parenthesized notation. Clarity is an [interpreted language](https://en.wikipedia.org/wiki/Interpreted_language), and [decidable](https://en.wikipedia.org/wiki/Recursive_language). To learn more basics about the language, see the [Introduction to Clarity](overview.html) topic.

By the end of this tutorial, you will:

* Have a working Clarity starter project and local dev environment
* Understand basic Clarity language design principles
* Deploy a contract to the Stacks 2.0 blockchain and call its public methods
* Understand how to use the Explorer Sandbox functionality

## Prerequisites

### Set up your Node environment

You will need [NodeJS](https://nodejs.org/en/download/) `8.12.0` or higher to complete this tutorial. You can verify your installation by opening up your terminal and run the following command:

```shell
node --version
```

### Check the Stacks 2.0 status

The Stacks 2.0 blockchain is currently in development and could experience resets and downtimes. To make sure you're not running into any challenges related to the status of the network, please open up the [Status Checker](http://status.test-blockstack.com/) and confirm that all systems are operational. If some systems seem to have issues, it is best to wait until they are back up before you proceed with the next steps.

### Optional: Install Visual Studio Code with Clarity Extensions

[Visual Studio Code](https://code.visualstudio.com/) (aka VS Code) is a free development interface for which Blockstack has created custom extensions, to make it easier to create smart contracts with Clarity.

[Install Visual Studio Code](https://code.visualstudio.com/download) and install the following extensions for the best coding experience:

- [Clarity](https://marketplace.visualstudio.com/items?itemName=blockstack.clarity), the official language extension by Blockstack that defines the Clarity language for VS Code and provides auto-complete and syntax highlighting.
- [clarity-lsp](https://marketplace.visualstudio.com/items?itemName=lgalabru.clarity-lsp), which adds inline help functionality for Clarity to VS Code
- [Rainbow Brackets](https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets), which adds helpful colorization of matching pairs of parentheses while you code

## Step 1:Download a starter project

Using your terminal, run the following command to create a new folder and initialize a new project:

```bash
# create and go to new `hello-world` project folder
mkdir hello-world; cd hello-world
npm init clarity-starter
```

After the starter project is loaded up, you have to select a project template (using your arrow keys). Select `Hello World`, which is the default, by hitting ENTER.

```bash
? Select a project template: (Use arrow keys)
❯ Hello World
  Counter
```

## Step 2: Review the contract

In the project folder, open the `contracts/hello-world.clar` file with your editor.

You will see that the program and each statement is enclosed in `()` (parentheses), and the smart contract consists of two functions.

```cl
(define-public (say-hi)
  (ok "hello world"))

(define-read-only (echo-number (val int))
  (ok val))
```

On the first line, a new public function `say-hi` is declared. Public functions are callable from other smart contracts, enabling developers to break complex tasks into smaller, simpler smart contracts (an exercise in [separating concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)).

{% include note.html content="To create private functions, you would use the <code>define-private</code> keyword. Private functions can only be executed by the current smart contract. Only public functions can be called from other contracts." %}

The function doesn't take any parameters and simply returns "hello world" using the [`ok`](clarityRef.html#ok) response constructor.

The second function, `echo-number`, is a [read-only function](clarityRef.html#define-read-only). Read-only functions are also public, but as the name implies, they can not change and variables or datamaps. `echo-number` takes an input parameter of the type `int`. Along with integer, Clarity supports the following [types](clarityRef.html#clarity-type-system):

* `uint`: 16-byte unsigned integer
* `principal`: spending entity, roughly equivalent to a Stacks address
* `boolean`: `true` or `false`
* `buffer`: fixed-length byte buffers
* `tuple`: named fields in keys and values

`echo-number` uses an [`ok`](clarityRef.html#ok) response to return the value passed to the function.

## Step 3: Access the Explorer Sandbox

{% include note.html content="<p>This tutorial uses a developer preview release of the <a href='https://testnet-explorer.blockstack.org/'>Stacks 2.0 Explorer</a>. Please feel free to report issues or request enhancements on the <a href='https://github.com/blockstack/explorer/issues/new'>blockstack/explorer</a> repository. For more details about this release, see this <a href='https://forum.blockstack.org/t/explore-the-stacks-2-0-testnet-with-the-new-explorer-developer-preview/10889'>Blockstack forum post</a>.</p><p>If you encounter trouble using the Explorer Sandbox, try falling back to <a href='#get-familiar-with-cli-optional'>the CLI instructions at the end of this page</a>.</p>" %}

Open up the [Stacks 2.0 Explorer Sandbox view](https://testnet-explorer.blockstack.org/sandbox). The Explorer Sandbox is a web-enabled view of the Stacks 2.0 blockchain, and has tools for validating contracts, testing out transactions, and generating tokens.

Here, we will run the code from `hello-world` right in the browser and create blockchain transactions right in the browser.

You will be asked to sign in with or sign up for a Blockstack ID. Your new ID will include a new Stacks address, which is essentially a wallet that holds funds like STX tokens. STX tokens are consumed as fees to register digital assets on the network and to publish/execute smart contracts, among other functions on the network.

All of the following operations will happen on the Testnet. A Testnet is an alternative Stacks 2.0 blockchain, to be used for testing. Testnet STX tokens are separate and distinct from actual STX tokens, and are never supposed to have any value.

Follow the steps on the screen to complete the process.

![The faucet tab of the Stacks 2.0 Testnet Explorer](images/faucet.png)

Once completed, you will see the Sandbox view and your newly generated Stacks address for testing purposes.

## Step 4: Obtain STX tokens

Uploading and calling smart contracts requires fees to be paid to the network to process the transactions. The Testnet Explorer features the capability to request STX tokens that can be used to pay the fees ("STX faucet").

On the [**STX faucet**](https://testnet-explorer.blockstack.org/sandbox?tab=faucet) screen, your new Stacks address will be prefilled. Click **Request STX** to receive 0.5 STX.

On the right side of the screen ("Recent transactions"), you will notice that a new transaction was generated for you. A transaction usually takes up to a minute to complete, because it needs to be broadcasted and confirmed by the network.

Wait a few seconds until the transaction completes (the loading indicator will disappear and a green dot will show up on the icon). You don't need to refresh the page manually. However, if you wish to see the details of your faucet request, you can click on the transaction.

![Screenshot of faucet request submission](images/faucet-transfer.png)

## Step 5: Deploy the contract

A deployed contract on the Testnet is like a cloud function (comparable to serverless functions). It allows you to execute code remotely on the Stacks 2.0 network. 

On the Sandbox view, switch to the [**Contract deploy**](https://testnet-explorer.blockstack.org/sandbox?tab=contract-deploy) tab, and do the following:

1. Enter a name for the contract under **Contract name** that uses lower-case letters, dashes, and numbers only.
2. Replace code in the text area under **Contract source code (editable)** with the contents of `contracts/hello-world.clar`.
3. Ignore the **Choose from sample** drop-down for now. After completing this tutorial you can come back to the Explorer Sandbox and use this drop-down to try other sample contracts.
4. Ignore the **Fee** field. It should be set to 2000 micro-STX  (1 STX = 1000000 micro-STX)
5. Click **Deploy contract**.

{% include note.html content="In production, you would estimate the fees that are reuqired to be paid using methods provided by the Stacks 2.0 network. The estimate would, for instance, be based on the size of the contract. For the purpose of this tutorial, we will keep it simple and accept the default fee." %}

![deploy](images/contract-deploy.png)

On the right, inside the "Recent transactions" feed, you will notice that another transaction appearing.

Wait a few seconds until the transaction completes. In the meantime, you can click on the transaction and review the details. You will notice that every deployed smart contract's source code is publicly verifiable.

## Step 6: Call the public method

On the Sandbox view, switch to the [**Contract call**](https://testnet-explorer.blockstack.org/sandbox?tab=contract-call) tab, and enter the following details:

* **Contract address**: Your generated Stacks address. Hover over the "identity view" on the top right side of the screen to copy your full address and paste it in here.
* **Contract name**: Whatever you entered as your contract name in the previous step. If you forgot, you can review your recent transactions.

![Screenshot of the Sandbox's contract call screen](images/sandbox-call.png)

After clicking **Search**, you will see the two public methods implemented in the smart contract.

Locate the `(echo-number)` method, provide any integer for the `val` argument (e.g. 42) and click **Submit**. You will see the value you entered echoed back to you below the button:

```cl
Result: (ok 42)
```

![sandbox-call](images/sandbox-calltx.png)

**Congratulations! You just deployed your smart contract and called a public function on the Stacks 2.0 blockchain.**

---

With the completion of this tutorial, you now:

* Have a working Clarity starter project and local dev environment
* Understand basic Clarity language design principles
* Have deployed a contract to the Stacks 2.0 blockchain and called its public methods
* Understand how to use the Explorer Sandbox functionality

## Optional: Get familiar with CLI

The steps above provide an easy way to get started with contract deployment and contract calls. If you want to stay in the terminal and get access to more advanced capabilities, you should use the Blockstack CLI.

The following set of commands will achieve the same goals as the above workflow.

Install an early release of the new Blockstack CLI for Stacks 2.0.

```shell
sudo npm install -g "https://github.com/blockstack/cli-blockstack#feature/stacks-2.0-tx"
```

Create a new Stacks address and save keychain details, using the `-t` flag to target Testnet. The new keychain details will be stored in the file `cli_keychain.json`:

```shell
blockstack make_keychain -t > cli_keychain.json
```

Review your new Stacks address details.

```shell
cat cli_keychain.json | json_pp
```

```json
{
   "mnemonic" : "aaa bbb ccc ddd ...",
   "keyInfo" : {
      "address" : "STJRM2AMVF90ER6G3RW1QTF85E3HZH37006D5ER1",
      "privateKey" : "5a3f1f15245bb3fb...",
      "index" : 0,
      "btcAddress" : "biwSd6KTEvJcyX2R8oyfgj5REuLzczMYC1"
   }
}
```

Make an API call to the Testnet faucet to get STX tokens.

```shell
# replace <stx_address> with `address` property from your keychain
curl -XPOST "https://sidecar.staging.blockstack.xyz/sidecar/v1/faucets/stx?address=<stx_address>" | json_pp
```

The response will include a `txId` property. This is the transaction that was initiated to transfer funds to your Stacks address.

```json
{
"success": true,
"txId": "0xabc123",
"txRaw": "8080000000040..."
}
```

You need to wait up to a minute for the transaction to complete. After that, you can confirm that your balance increase by 0.5 STX.

```shell
blockstack balance -t <stx_address>
```

```json
{
  //  in microstacks (1 STX = 1000000 microstacks)
  "balance": "500000",
  "nonce": 0
}
```

With sufficient funds on your account, you can deploy a contract file to Testnet. In this example, we are deploying the `hello-world.clar` contract with the name `hello-world`.

```shell
# blockstack deploy_contract -t <contract_file_path> <contract_name> <fee> <nonce> <privateKey>
# replace `nonce` with the value from the last balance check
# replace `privateKey` with your private key from your keychain
# replace `fee` with 2000. Usually, an estimate should be used but 2000 will be good enough for this tutorial
blockstack deploy_contract -t ./hello-world.clar hello-world 2000 0 5a3f1f15245bb3fb
```

{% include note.html content="To learn more about the Blockstack CLI commands, you can run `blockstack-cli help all`." %}

The command will return a new contract deploy transaction ID. You have to wait up to a minute for the contract to be broadcasted to the network. Keep in mind that this operation will increase the `nonce` of your account.

As soon as the contract is deployed, you can call a contract method. In this example, we are calling the `echo-number` function of the previously named `hello-world` contract. The method is defined as `read-only` and will return the result without generating a new transactions.

```shell
# blockstack call_read_only_contract_func -t <stx_address> <contract_name> <function_name> <fee> <nonce> <privateKey>
# replace `stx_address` and `privateKey` with values from your keychain
# replace `nonce` with the value from the last balance check + 1
# replace `fee` with 2000. Usually, an estimate should be used but 2000 will be good enough for this tutorial
blockstack call_read_only_contract_func -t <stx_address> hello-world echo-number 2000 1 5a3f1f15245bb3fb
```

**Congratulations! You can now deploy your smart contract and call public functions on the Testnet using the CLI.**

## Where to go next

{:.no_toc}

* <a href="tutorial-counter.html">Next tutorial: Writing a counter smart contract</a>
* <a href="tutorial-test.html">Tutorial: Testing contracts with JavaScript and Mocha</a>