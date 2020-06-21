import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme());

Enzyme.configure({ adapter: new Adapter() });

require.extensions['.css', '.sass', '.scss', '.png', '.jpg', 'jpeg'] = function () {
  return null;
};
