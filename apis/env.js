const env = {
  development: {
    baseURL:'http://localhost:5555'
  },
  test: {
    baseURL:'http://112.74.26.159:8205'
  },
  joint: {
    // baseURL:'http://112.74.26.159:8205'
    baseURL:'http://47.89.11.105:8091'
  },
  production: {
    baseURL:'http://47.89.11.105:8091',
    // baseURL:'http://mg.valp.io'
  }
};

// console.log( env[process.env.ENV_NAME || process.env.NODE_ENV] )


export default env[process.env.ENV_NAME || process.env.NODE_ENV]
