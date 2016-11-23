import sinon from 'sinon';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';

chai.use(chaiEnzyme());
chai.use(sinonChai);

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;

const testContext = require.context('../test', true);
testContext.keys().forEach(testContext);
