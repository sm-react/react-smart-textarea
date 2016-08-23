import React from 'react';
var TestUtils = require('react/lib/ReactTestUtils');
import { shallow, mount } from 'enzyme';
import SmTextarea from '../index';
import { expect } from 'chai';
import sinon from 'sinon';
const { describe, it } = global;

var fs = require('fs');


describe('SmartTextarea', () => {
  const defaultValue = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius sed, voluptates natus, officiis nam dicta veritatis eligendi possimus? Quae quo in aspernatur necessitatibus vero placeat aliquid non consequatur dicta, numquam? Totam animi perferendis consectetur obcaecati veritatis voluptatem atque! Beatae cumque aspernatur ea voluptatem, ad voluptatum modi eius asperiores minus necessitatibus, dolores nulla laboriosam odit omnis suscipit est mollitia. Exercitationem architecto, fuga porro. Dolorem dolore odit ducimus ea magni ab ullam quidem itaque, autem dolor et, omnis, incidunt, provident excepturi. Veniam ab, illum eius eaque sapiente iste voluptatum temporibus, consequatur unde, rerum nisi pariatur laudantium impedit reiciendis quasi, illo quibusdam inventore hic aperiam nesciunt maxime culpa neque! Ab sapiente earum, non asperiores quaerat maxime quae cumque officiis maiores amet.';
  const smartTextarea = (
    <SmTextarea
      disabled
      defaultValue={defaultValue}
    />);

  it('DOM nodes root', () => {
    const wrapper = shallow(smartTextarea);
//    fs.writeFileSync('test_log.txt', wrapper.find('textarea').at(1).childAt(0).html());
//    fs.writeFileSync('test_log.txt', wrapper.childAt(0).html());
    fs.writeFileSync('test_log.txt', wrapper.html());

//    console.log(wrapper.props());
    console.log(wrapper.is('div'));

    expect(wrapper.is('div.smart-textarea')).to.equal(true);

//    expect(wrapper.prop('defaultValue')).to.equal('Lorem ipsum');
//    expect(wrapper.find({disabled: true})).to.have.length(1); // .be.equal(10);
//    expect(wrapper.find({disabled: true})).to.have.length(1); // .be.equal(10);
  });


  it('DOM nodes elements', () => {
    const wrapper = shallow(smartTextarea);
//    expect(wrapper.contains('textarea')).to.equal(true);
    expect(wrapper.find('textarea')).to.have.length(2);
    expect(wrapper.find('div')).to.have.length(2);

  });



//   it('should render with the correct DOM', () => {
///*    var children = [
//      {name: "Billy", age: 4, sex: 'm'},
//      {name: "Sally", age: 6, sex: 'f'},
//    ];*/
//    var myComponent = TestUtils.renderIntoDocument(
//      <SmTextarea
//        disabled
//        defaultValue={defaultValue}
//      />);
//    var renderedDOM = () => {React.findDOMNode(myComponent)};
//
//    expect(renderedDOM.tagName).toBe('div');
//    expect(renderedDOM.classList).toEqual(['smart-textarea']);
//    //...
//
///*    var children = renderedDOM.querySelectorAll('li.child');
//    expect(children.length).toBe(2);
//    expect(children[0]).toEqual({name: "Billy", age: 4, sex: 'm'});*/
//    //...
//  });

  /*
  it('should show the given text', () => {
    const wrapper = shallow(smartTextarea);
    expect(wrapper.text()).to.be.equal(defaultValue);
  });
*/
/*

  it('should handle the click event', () => {
    const onFocus = sinon.stub();
    // Here we do a JSDOM render. So, that's why we need to
    // wrap this with a div.
    const wrapper = mount(
      <div>
        <SmTextarea
          defaultValue={defaultValue}
          onFocus={onFocus}
        />
      </div>
    );

    wrapper.find('SmTextarea').simulate('click');
    expect(onFocus.callCount).to.be.equal(1);
  });
*/

});
