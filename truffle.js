module.exports = {
  networks: {
    development: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "*" // match any network
    },
    constantinople: {
        host: "172.17.0.6:",
        port: 8545,
        network_id: "*" 
    },
  },
  solc: {
    version: "0.5.2",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};

