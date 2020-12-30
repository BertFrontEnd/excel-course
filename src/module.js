console.log('From module.js');

const start = async () => {
  return await Promise.resolve('Async working...');
};

start().then(console.log());

console.log('0');

/* "webpack": "^5.11.1", */
/* "webpack-cli": "^4.3.0", */
/* "webpack-dev-server": "^3.11.1" */
