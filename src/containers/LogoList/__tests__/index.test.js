import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';

import LogoList from '../';

// Use Chai Enzyme
chai.use(chaiEnzyme());

describe('<Home />', () => {
  it('should render appropriately', () => {
    const wrapper = shallow(<LogoList />);

    expect(wrapper).to.have.length(1);
  });
});
