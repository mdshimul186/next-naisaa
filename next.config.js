module.exports = {
    webpack: (config, { isServer }) => {
      if (isServer) {
        require('./components/generateSiteMap')
      }
  
      return config
    }
  }