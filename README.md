## Demonstration of new Constantinople Reentrancy

### Install

* Install dependencies: `npm i`
* Install ganache@beta: `npm i -g ganache-cli@beta` (at least ganache-cli@6.3.0-beta.0)

### To test the attack

* Run ganache: `ganache-cli --hardfork=constantinople`
* Run tests: `truffle test`

### To compare with the current state in byzantium 

* Run ganache: `ganache-cli --hardfork=byzantium`
* Run (failing) tests: `truffle test`

## Demonstration of Constantinople with EIP 1283 and the reentrancy vulnerability removed

### Install

* Install dependencies: `npm i`
* Install ganache@eip1283: `npm i -g ganache-cli@eip1283`

### To test the reentrancy vulnerability no longer exists

* Run ganache: `ganache-cli --hardfork=constantinople-1283-removed`
* Run (failing) tests: `truffle test`

### Contact

In case of questions or comments, please contact contact@chainsecurity.com
