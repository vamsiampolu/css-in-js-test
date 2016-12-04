/* eslint-env node,mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SimpleImage from '../app/SimpleImage';

describe('SimpleImage', () => {
  describe('renders a wrapper with an image when status is PENDING', () => {
    const wrapper = shallow(<SimpleImage width={200} height={200} status="PENDING" />);
    expect(wrapper.find('div').length).to.equal(1);
    expect(wrapper.find('img').length).to.equal(1);
  });
});
