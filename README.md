[![GitHub version](https://badge.fury.io/gh/sm-react%2Freact-smart-textarea.svg)](https://badge.fury.io/gh/sm-react%2Freact-smart-textarea)
[![@airbnb](https://img.shields.io/badge/code%20style-Airbnb-brightgreen.svg)](https://github.com/sm-react/react-smart-textarea/blob/development/.eslintrc)
[![@UsulPro](https://img.shields.io/badge/github-UsulPro-blue.svg)](https://github.com/UsulPro)
[![@sm-react](https://img.shields.io/badge/github-smARTLight-red.svg)](https://github.com/sm-react)
[![Coverage Status](https://coveralls.io/repos/github/sm-react/react-smart-textarea/badge.svg?branch=master)](https://coveralls.io/github/sm-react/react-smart-textarea?branch=master)
[![codecov](https://codecov.io/gh/sm-react/react-smart-textarea/branch/master/graph/badge.svg)](https://codecov.io/gh/sm-react/react-smart-textarea)

# react-smart-textarea
React textarea: easy, transparent textarea component for ReactJS (autoheight, adjustable, responsive text input element) access to textarea attributes and textarea style

## Live demo
https://sm-react.github.io/react-smart-textarea/

## Usage
~~~jsx
import SmTextarea from 'SmartTextarea.jsx';
~~~
#### simple
~~~jsx
<SmTextarea 
  onChange={(e) => console.log(e)}
/>
~~~

#### set hint text
~~~jsx
<SmTextarea
  onChange={(e) => console.log(e)} 
  hintText="enter text here"
/>
~~~

#### some style
~~~jsx
<SmTextarea
        style={{border: "solid 1px rgb(169, 169, 169)", padding: {4}, paddingLeft: {8}, …}}
        styleMouseOver={{}}
        styleFocus={{outlineColor: "rgb(77, 144, 254)", outlineOffset: {-2}, outlineStyle: "auto", …}}
        hintText="chrome style"
      />
~~~