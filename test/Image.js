/* eslint-env node, mocha*/
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Image from '../app/Image';

chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('Image', () => {
  it('exists', () => {
    expect(Image).to.not.equal(null);
  });

  it('renders', () => {
    const wrapper = shallow(<Image />);
    expect(wrapper).to.not.equal(null);
  });

  it('has default props for loadingGlyph, loadingPlaceholder, failurePlaceholder', () => {
    const wrapper = mount(<Image
      src="something.png"
      width={400}
      height={200}
    />);

    expect(wrapper.props().loadingStyle).to.not.equal(null);
    expect(wrapper.props().failureStyle).to.not.equal(null);
    expect(wrapper.props().circle).to.equal(false);
    expect(wrapper.props().rounded).to.equal(true);
  });


  it('has a wrapper div, an indicator div and an img', () => {
    const wrapper = shallow(<Image src="something.png" width={400} height={200} />);
    expect(wrapper).to.have.tagName('div');
    expect(wrapper.childAt(1)).to.have.tagName('img');
    expect(wrapper.childAt(0)).to.have.tagName('div');
  });

  it('has a default state of PENDING', () => {
    const wrapper = shallow(<Image width={400} height={200} />);
    expect(wrapper.state()).to.deep.equal({ status: 'PENDING' });
  });

  it('has a state of LOADING if an src prop is supplied', () => {
    const wrapper = shallow(<Image src="something.png" width={400} height={200} />);
    const status = wrapper.state().status;
    expect(status).to.equal('LOADING');
  });

  it('has a state of LOADED if a good src prop is supplied', () => {
    const wrapper = shallow(<Image
      src="http://lorempixel.com/200/200"
      width={400}
      height={200}
    />);
    const instance = wrapper.instance();
    instance.onLoad = sinon.spy(instance.onLoad, instance);
    wrapper.update();
    const status = wrapper.state().status;
    expect(status).to.equal('LOADED');
    expect(instance.onLoad).to.have.been.called;
  });

  it('has a state of FAILED if a bad src prop is supplied', () => {
    const wrapper = mount(<Image
        src="hsttp://lorempixel.com/200/200"
        width={400}
        height={200}
        />);
    const instance = wrapper.instance();
    instance.onFail = sinon.spy(instance.onFail, instance);
    wrapper.update();
    const status = wrapper.state().status;
    expect(status).to.equal('FAILED');
    expect(instance.onFail).to.have.been.called;
  });

  it('changes from a LOADED/FAILED state to a LOADING state when src updates', () => {
    const wrapper = mount(<Image
        src="hsttp://lorempixel.com/200/200"
        width={400}
        height={200}
        />);
    expect(wrapper.state().status).to.equal('LOADED');
    const oldProps = wrapper.props();
    wrapper.setProps({...oldProps, src: 'https://lorempixel.com/200/200'});
    expect(wrapper.state().status).to.equal('LOADING');
  });
});

