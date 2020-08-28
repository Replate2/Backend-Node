
const authTestSuite1 = require('./authTestSuite1.js');
const replate2TestSuite2 = require('./replate2TestSuite2.js');

describe('sequentially run tests', () => {
    authTestSuite1(),
    replate2TestSuite2()
 });