const { ENV } = process.env;
const TEST_ENV = 'env_test';

const onError = (funName, res, err) => {
  if (err.stack && ENV !== TEST_ENV) {
    console.log(`Error in: ${funName}: ${JSON.stringify(err.stack)}`);
  } else if (ENV !== TEST_ENV) {
    console.log(`Error in: ${funName}: ${JSON.stringify(err)}`);
  }
};

const onLog = (message = '', details = '') => {
  if (ENV !== TEST_ENV) {
    console.log(message, details);
  }
};

module.exports = {
  onError,
  onLog,
};
