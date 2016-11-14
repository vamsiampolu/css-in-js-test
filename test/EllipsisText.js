/* eslint-env node, mocha*/
import chai, { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import EllipsisText from '../app/EllipsisText';

chai.use(chaiEnzyme());

describe('EllipsisText', function() {

  it('has default props expandable and limit', function() {
    const wrapper = mount(<EllipsisText />);
    const props = wrapper.props();
    expect(props.expandable).to.be.false;
    expect(props.limit).to.equal(300);
    expect(props.text).to.equal('');
  });

  it('is blank when no text is provided', function() {
    const wrapper = shallow(<EllipsisText />);
    expect(wrapper).to.be.blank();
  });

  it('displays full text when text is within the limit', function(){
    const text = 'Hello, Mars. Sayonara Earthlings';
    const wrapper = shallow(<EllipsisText text={text} />);
    const subject = wrapper.find('div').text();
    expect(subject).to.equal(text);
  });

  it('displays a ... after limit and truncates text by default', function() {
    const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
    const wrapper = shallow(<EllipsisText text={text} />);
    const subject = wrapper.find('div').text();
    expect(subject).to.have.lengthOf(303);
    expect(subject).to.have.string('...');
  });

  it('displays a button with `More` if expandable is set', function() {
    const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
    const wrapper = shallow(<EllipsisText text={text} expandable={true} />);
    const button = wrapper.find('button');
    expect(button).to.exist;
    expect(button.text()).to.equal('More');
  });

  it('expands the text when button is clicked if expandable is set', function() {
    const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

    const wrapper = shallow(<EllipsisText text={text} expandable={true} />);
    wrapper.find('button').simulate('click');

    const divText = wrapper.find('div').text();
    const btnText = wrapper.find('button').text();

    expect(wrapper.state('expanded')).to.be.true;
    expect(divText).to.have.length.above(307);
    expect(btnText).to.equal('Less');
  });

  it('collapses the text when button is clicked after expanding if expandable is set', function() {
    const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

    const wrapper = shallow(<EllipsisText text={text} expandable={true} />);

    wrapper.find('button').simulate('click');
    wrapper.find('button').simulate('click');

    const divText = wrapper.find('div').text();
    const btnText = wrapper.find('button').text();

    expect(wrapper.state('expanded')).to.be.false;
    expect(btnText).to.equal('More');
    expect(divText).to.have.lengthOf(307);
  });
});
