[![GitHub version](https://badge.fury.io/gh/sm-react%2Freact-smart-textarea.svg)](https://badge.fury.io/gh/sm-react%2Freact-smart-textarea)
[![@airbnb](https://img.shields.io/badge/code%20style-Airbnb-brightgreen.svg)](https://github.com/sm-react/react-smart-textarea/blob/development/.eslintrc)
[![@UsulPro](https://img.shields.io/badge/github-UsulPro-blue.svg)](https://github.com/UsulPro)
[![@sm-react](https://img.shields.io/badge/github-smARTLight-red.svg)](https://github.com/sm-react)
[![sm-artlight.slack.com](https://img.shields.io/badge/slack%20-%20smARTLight%20-red.svg)](https://sm-artlight.slack.com)


# react-smart-textarea
React textarea: easy, transparent textarea component for ReactJS (autoheight, adjustable, responsive text input element) access to textarea attributes and textarea style

## Live demo
[![Live demo](https://img.shields.io/badge/Live%20Demo-%20Storybook-brightgreen.svg)](https://sm-react.github.io/react-smart-textarea/)



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


###
[ ![Codeship Status for sm-react/react-smart-textarea](https://codeship.com/projects/88a09fa0-471d-0134-a2ae-0a0a8703cfb0/status?branch=master)](https://codeship.com/projects/169096)
