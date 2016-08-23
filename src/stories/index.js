import React from 'react';
import { storiesOf, action, setAddon, addDecorator } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';

import SmTextarea from '../index';


setAddon(infoAddon);

const styles = {
  bk: { backgroundColor: '#e5e5e5' },
};

let wrapConnector = {
  wrappers: [],
  connect(fn) {
    wrapConnector.wrappers.push(fn);
//    console.log(wrapConnector.wrappers);
  },
  reset() {
    wrapConnector.wrappers = [];
//    console.log('wrapConnector reset');
  },
  setText(text) {
    wrapConnector.wrappers.forEach(val => val(text));
//    console.log(wrapConnector.wrappers.length);
  },
};

class SmartWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };

    this.setText = this.setText.bind(this);

    props.getConnect(this.setText);
//    console.log('SmartWrapper connected')
  }

  setText(text) {
    this.setState({ text });
  }

  render() {
    return <SmTextarea {...this.props} defaultValue={this.state.text} />;
  }

  componentWillUnmount() {
//    console.log('SmartWrapper unmounted');
    wrapConnector.reset();
  }
}

class TextareaWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };

    this.setText = this.setText.bind(this);

    props.getConnect(this.setText);
//    console.log('SmartWrapper connected')
  }

  setText(text) {
    this.setState({ text });
  }

  render() {
    return (<textarea style={{ width: '100%', height: '100%', fontSize: 16, fontFamily: 'Roboto, sans-serif',
}} value={this.state.text}
    />);
  }

  componentWillUnmount() {
//    console.log('SmartWrapper unmounted');
    wrapConnector.reset();
  }
}

let fnObserver = {
  'LEFT_EXIT': false,
  bages: [],
  connect(fn) {
    fnObserver.bages.push(fn);
  },
  reset() {
    fnObserver.bages = [];
  },
  updState(fnState) {
//    console.log(fnObserver);
    fnObserver.bages.forEach(val => val(fnState));
  },
};

class SpaunKey extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: false, flash: false };
    this.updKey = this.updKey.bind(this);
    props.getConnect(this.updKey);
//    console.log('SpaunKey connected')
  }
  updKey(fnState) {
    if (this.props.state == fnState) {
      if (!this.state.checked) {
        this.setState({ checked: true });
      } else {
        this.setState({ flash: true }, () => setTimeout(() => { this.setState({ flash: false }); }, 400));
      }
    }
  }

  render() {
    const style = {
      fontFamily: 'monospace',
      border: 'solid #b1ddc8 1px',
      whiteSpace: 'nowrap',
      background: this.state.checked ? (!this.state.flash ? '#b1ddc8' : '#e5e5e5') : '#e5e5e5',
      color: '#6f6f6f', //! this.state.flash ? '#6f6f6f' : 'black',
      transition: this.state.flash ? 'background 600ms ease 80ms' : 'none',
    };
    return (
      <spaun>
        <spaun> </spaun>
        <spaun style={style}>
          <big>{' '}</big>
          {this.props.name}
        </spaun>
      </spaun>
    );
  }

  componentWillUnmount() {
//    console.log('SpaunKey unmounted');
    fnObserver.reset();
  }
}


addDecorator((story) => (
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    height: '100%',
    backgroundColor: 'rgba(232, 232, 232, 0.38)',
  }}
  >
    <style scoped>
      {'::selection { background: #b1ddc8 }'}
    </style>
    <div style={{

      margin: 0,
      fontSize: 16,
      fontFamily: 'Roboto, sans-serif',
    }}
    >
      <h4>                      </h4>
       <div style={{
         backgroundColor: '#b1ddc8',
         width: 70,
         height: '100%',
       }}
>
        <div style={{ top: 200, height: 400, position: 'relative' }}>
          <div style={{ transform: 'rotateZ(-90deg)' }}>
            <h2 style={{ color: 'white', fontSize: 32 }}>smARTLight</h2>
          </div>
        </div>
      </div>
    </div>

    <div style={{
      flexGrow: 1,
      minWidth: 250,
      margin: 10,
      fontSize: 16,
      fontFamily: 'Roboto, sans-serif',
    }}
    >
      <h4>Smart Textarea </h4>
      {story()}
      <br /><br /><br /><br /><hr />
       <a href="https://github.com/sm-react" target="_blank">
        <img src="https://img.shields.io/badge/github-smARTLight-red.svg" alt="sm-react" />
      </a>
      <spaun> </spaun>
      <a href="https://github.com/UsulPro" target="_blank">
        <img src="https://img.shields.io/badge/github-UsulPro-blue.svg" alt="UsulPro" />
      </a>
      <spaun> </spaun>
      <a href="https://github.com/sm-React/react-smart-textarea" target="_blank">
        <img src="https://img.shields.io/github/forks/badges/shields.svg?style=social&label=Fork&maxAge=2592000" alt="fork" />
      </a>

      {/*
      [![GitHub forks](https://img.shields.io/github/forks/badges/shields.svg?style=social&label=Fork&maxAge=2592000)](https://github.com/sm-React/react-smart-textarea)

      [![@UsulPro](https://img.shields.io/badge/github-UsulPro-blue.svg)](https://github.com/UsulPro)
      [![@sm-react](https://img.shields.io/badge/github-smARTLight-red.svg)](https://github.com/sm-react)*/}
    </div>

    <div style={{
      width: 200,
      minWidth: 150,
      margin: 10,
      fontSize: 16,
      fontFamily: 'Roboto, sans-serif',
    }}
    >
      <h4>Lorem ipsum </h4>
      <div style={{ marginBottom: 10, color: '#60776c', '::selection': 'background: #ccc' }} > <small>
        <i>This lorem ipsum here is just for your convenience. <spaun style={{ backgroundColor: '#b1ddc8' }}>Select a range of text</spaun> to see it inside Smart Textarea</i></small></div>

      {loremIpsum()}
    </div>


  </div>


));

storiesOf('SmartTextarea', module)
  .addWithInfo('appearance', '', () => {
//    wrapConnector.reset();
//    const smTextarea = <SmartWrapper getConnect={wrapConnector.connect} />;
//    const items = ['default view', 'modern style', 'new style']
//    const list = items.map(val=>listItem(smTextarea, val, '#ffffff'));
    return (
    <div>
    <p> A few examples of possible appearance</p>
      <table style={{
        width: '100%',
      }}
    >
       <tbody>
        {listItem('default style', '#ffffff')}
        {listItem('chrome style', '#ffffff', chromeStyle)}
        {listItem('explorer style', '#ffffff', explorerStyle)}
        {listItem('material style', '#ffffff', materialStyle)}
        {listItem('bootstrap style', '#ffffff', bootstrapStyle)}
        {listItem('dark style', '#4b4b4b', darkStyle, { hintText: 'dark style', hintColor: 'rgba(201, 201, 201, 0.5)' })}


       </tbody>
      </table>
    </div>);
  }, { inline: false, propTables: false, source: true })

  .addWithInfo('Prop Types', () => {
//  wrapConnector.reset();
    return (
      <table style={{
        width: '100%',
      }}
    >
        <tbody>
           {listItem('bootstrap style', '#ffffff',
              bootstrapStyle,
              { hintText: 'bootstrap style' })}
        </tbody>
      </table>
    );
  }, { inline: true, propTables: [SmTextarea], source: false, header: false })

  .addWithInfo('Events',
               `
      Source:
      ~~~js
      <SmTextarea
        style={{border: "solid 1px rgb(169, 169, 169)", padding: {4}, paddingLeft: {8}, …}}
        styleMouseOver={{}}
        styleFocus={{outlineColor: "rgb(77, 144, 254)", outlineOffset: {-2}, outlineStyle: "auto", …}}
        handleFuncKeys
        onFuncKeyDown={onFuncKeyDown()}
        onFocus={eventLogger()}
        onBlur={eventLogger()}
        onSelect={eventLogger()}
        onSelecting={eventLogger()}
        onMouseOver={eventLogger()}
        onMouseOut={eventLogger()}
        onChange={eventLogger()}
        onChangeHeight={eventLogger()}
        hintText="chrome style"
      />
      <p/>
      <SmTextarea
        style={{border: "solid 1px rgb(169, 169, 169)", padding: {4}, paddingLeft: {8}, …}}
        styleMouseOver={{border: "solid 1px rgb(77, 144, 254)"}}
        styleFocus={{border: "solid 1px rgb(67, 67, 67)"}}
        handleFuncKeys
        onFuncKeyDown={onFuncKeyDown()}
        onFocus={eventLogger()}
        onBlur={eventLogger()}
        onSelect={eventLogger()}
        onSelecting={eventLogger()}
        onMouseOver={eventLogger()}
        onMouseOut={eventLogger()}
        onChange={eventLogger()}
        onChangeHeight={eventLogger()}
        hintText="explorer style (disabled)"
        disabled
      />
      ~~~
     `
 ,
 () => {
//  wrapConnector.reset();
//  fnObserver.reset();

//  console.info('Events')

   function onEvent(eventName) {
     return function eventLogger(event) {
       const title = eventName || event.type;
       fnObserver[title] = true;
       fnObserver.updState(title);
       action(title)(event);
     };
   }
   const props = {
     handleFuncKeys: true,
     onFuncKeyDown(keyCode, fnState, pos) {
       fnObserver[fnState] = true;
       fnObserver.updState(fnState);
       action(fnState)(keyCode, pos);
     },
     onFocus: onEvent(),
     onBlur: onEvent(),
     onSelect: onEvent(),
     onSelecting: onEvent('onSelecting'), // action('onSelecting'),
     onMouseOver: onEvent(),
     onMouseOut: onEvent(),
     onChange: onEvent('onChange'), // action('onChange'),
     onChangeHeight: onEvent('onChangeHeight'), //action('onChangeHeight'),

   };
   return (
    <div>
      <SmartWrapper
        getConnect={wrapConnector.connect}
        style={chromeStyle.style}
        styleMouseOver={chromeStyle.mouseOver}
        styleFocus={chromeStyle.focus}
        {...props}
        hintText = "chrome style"
   />
         <p />
      <SmartWrapper
        getConnect={wrapConnector.connect}
        style={explorerStyle.style}
        styleMouseOver={explorerStyle.mouseOver}
        styleFocus={explorerStyle.focus}
        disabled
        {...props}
        hintText = "explorer style (disabled)"
   />
          <br />
           <small>
             Notes:
             <ul style={{ lineHeight: '20px' }}>
               <li>
                 handleFuncKeys = true - sets own handlers on KeyDown events. Check the response to pressing:<spaun> </spaun>
                 <SpaunKey name=" Enter " state="ENTER_EXIT" getConnect={fnObserver.connect} />,
                 <SpaunKey name=" Dell " state="DEL_EXIT" getConnect={fnObserver.connect} />,
                 <SpaunKey name=" Backspace " state="BCSP_EXIT" getConnect={fnObserver.connect} />,
                 <SpaunKey name=" Tab " state="TAB_EXIT" getConnect={fnObserver.connect} />,
                 <SpaunKey name=" Shift tab " state="TAB_EXIT" getConnect={fnObserver.connect} />,
                 <SpaunKey name=" Escape " state="ESC_EXIT" getConnect={fnObserver.connect} />,
                 <SpaunKey name=" Left & Up arrows " state="LEFT_EXIT" getConnect={fnObserver.connect} />,
                 <SpaunKey name=" Right & Down arrows " state="RIGHT_EXIT" getConnect={fnObserver.connect} />. You will see FunkKey state and [keyCode, cursor position] in Action Logger

               </li>
               <li>
                 Note that <SpaunKey name="LEFT_EXIT" state="LEFT_EXIT" getConnect={fnObserver.connect} /><spaun> </spaun> and <SpaunKey name="BCSP_EXIT" state="BCSP_EXIT" getConnect={fnObserver.connect} /> are only possible when the cursor is at the beginning of the text, while <SpaunKey name="RIGHT_EXIT" state="RIGHT_EXIT" getConnect={fnObserver.connect} /> and <SpaunKey name="DEL_EXIT" state="DEL_EXIT" getConnect={fnObserver.connect} /> only at the end
               </li>
               <li>
                 Due to the fact that <SpaunKey name="ENTER_EXIT" state="ENTER_EXIT" getConnect={fnObserver.connect} /> is intercepted, you will not have multi-line (but you can still handle it outside component and put it back via props).
               </li>
               <li>
                 Test other events: <SpaunKey name="onFocus" state="focus" getConnect={fnObserver.connect} />,
                 <SpaunKey name="onBlur" state="blur" getConnect={fnObserver.connect} />,
                 <SpaunKey name="onSelect" state="select" getConnect={fnObserver.connect} />,
                 <SpaunKey name="onSelecting" state="onSelecting" getConnect={fnObserver.connect} />,
                 <SpaunKey name="onChange" state="onChange" getConnect={fnObserver.connect} />,
                 <SpaunKey name="onChangeHeight" state="onChangeHeight" getConnect={fnObserver.connect} />,
                 <SpaunKey name="onMouseOver" state="mouseover" getConnect={fnObserver.connect} />,
                 <SpaunKey name="onMouseOut" state="mouseout" getConnect={fnObserver.connect} />,

               </li>
             </ul>
           </small>
    </div>);
 }, { inline: true, /* propTables: [SmTextarea],*/ source: false, header: false })
  .addWithInfo('Compare with pure <textarea>', () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        minHeight: 100,
        backgroundColor: '#b1ddc8',
      }}
      >
        <div style={{ width: 200, flexGrow: 1 }} >
           <SmartWrapper getConnect={wrapConnector.connect} />
        </div>
        <div style={{ width: 200, flexGrow: 1 }} >
          <TextareaWrapper getConnect={wrapConnector.connect} />
        </div>
      </div>
    );
  })
  .add('Null test', () => {
     return <p>Hello</p>
   })


const chromeStyle = {
  style: {
    border: 'solid 1px rgb(169, 169, 169)',
    padding: 4,
    paddingLeft: 8,
    fontSize: 16,
    fontFamily: 'Roboto, sans-serif',
  },

  mouseOver: {
  },

  focus: {
    'outlineColor': 'rgb(77, 144, 254)',
    'outlineOffset': -2,
    'outlineStyle': 'auto',
    'outlineWidth': 5,
  },
};

const explorerStyle = {
  style: {
    border: 'solid 1px rgb(169, 169, 169)',
    padding: 4,
    paddingLeft: 8,
    fontSize: 16,
    fontFamily: 'Roboto, sans-serif',
  },

  mouseOver: {
    border: 'solid 1px rgb(77, 144, 254)',
  },

  focus: {
    border: 'solid 1px rgb(67, 67, 67)',
  },
};

const materialStyle = {
  style: {
    padding: 2,
    fontSize: 16,
    fontFamily: 'Roboto, sans-serif',

    border: 0,
//    borderTop: 0,
//    borderRight: 0,
//    borderLeft: 0,
    borderBottom: '2px solid rgb(169, 169, 169)',
//    transform: 'scaleX(0.5)',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  },

  mouseOver: {
//    border: 'solid 1px rgb(77, 144, 254)'
  },

  focus: {
//    transform: 'scaleX(1)'
    borderBottom: '2px solid rgb(0, 188, 212)',
    // todo: outline!
  },
};

const bootstrapStyle = {
  style: {
    border: 'solid .8px rgb(230, 230, 230)',
//    border: 'solid .8px rgba(82, 168, 236, 0.8)',
    borderRadius: 4,
//    boxShadow: /*'rgba(0, 0, 0, 0.0117647) 0px 0px 2px 1px inset, */ 'rgba(82, 168, 236, 0.3) 0px 0px 4px 2px',
    padding: 4,
    paddingLeft: 8,
    fontSize: 16,
    fontFamily: 'Roboto, sans-serif',
    transition: 'all 100ms linear 0ms',
  },

  mouseOver: {
//    border: 'solid 2px rgb(77, 144, 254)',
//    borderRadius: 5,
  },

  focus: {
    border: 'solid .8px rgba(82, 168, 236, 0.8)',
    boxShadow: 'rgba(82, 168, 236, 0.3) 0px 0px 4px 2px, rgba(0, 0, 0, 0.08) 0px 0px 1px 1px inset',
  },
};

const darkStyle = {
  style: {
    border: 'solid 2px #b1ddc8',
    borderRadius: 6,
    background: '#505050',
    color: '#b1ddc8',
//    color: '#c7c7c7',
    padding: 4,
    paddingLeft: 8,
    fontSize: 16,
    fontFamily: 'Roboto, sans-serif',
    transition: 'all 120ms linear 0ms',
    boxShadow: 'rgba(177, 221, 200, 0.4) 0px 0px 3px 2px',
  },

  mouseOver: {
    border: 'solid 2px #b1ddc8',
    background: '#5d5d5d',
    color: '#c7c7c7',
  },

  focus: {
    border: 'solid 2px rgb(255, 255, 255)',
    background: '#5d5d5d',
    color: '#dddddd',
    boxShadow: 'rgba(255, 255, 255, 0.5) 0px 0px 4px 2px',
  },
};


function listItem(info, color, styles, props) {
  if (!styles) {
    styles = { style: {}, mouseOver: {}, focus: {} };
  }
  const styleCell = {

    border: 'rgba(232, 232, 232, 0.38) solid 1px',
    backgroundColor: color || '',
    padding: 20,
  };
  return (
    <tr>

     <td style={styleCell}>
       {info}
     </td>
     <td style={styleCell}>
       <SmartWrapper
         getConnect={wrapConnector.connect}
         style={styles.style}
         styleMouseOver={styles.mouseOver}
         styleFocus={styles.focus}
         {...props}
       />
     </td>

    </tr>
  );
}
function listItem2(chld, info, color) {
  const styleCell = {
    flexGrow: 1,
    border: '#d0d0d0 inset 1px',
    backgroundColor: color || '',
    padding: 20,
  };
  return (
    <td style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      alignItems: 'stretch',
    }}
    >

     <tr style={styleCell}>
       {info}
     </tr>
     <tr style={styleCell}>
       {chld}
     </tr>

    </td>
  );
}

function loremIpsum1() {
  return (
    <textarea placeholder="placeholder">

    </textarea>
    );
}


function loremIpsum() {
  return (
    <SmTextarea
      onSelecting={(e) => wrapConnector.setText(e)}
      disabled
      defaultValue="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius sed, voluptates natus, officiis nam dicta veritatis eligendi possimus? Quae quo in aspernatur necessitatibus vero placeat aliquid non consequatur dicta, numquam? Totam animi perferendis consectetur obcaecati veritatis voluptatem atque! Beatae cumque aspernatur ea voluptatem, ad voluptatum modi eius asperiores minus necessitatibus, dolores nulla laboriosam odit omnis suscipit est mollitia. Exercitationem architecto, fuga porro. Dolorem dolore odit ducimus ea magni ab ullam quidem itaque, autem dolor et, omnis, incidunt, provident excepturi. Veniam ab, illum eius eaque sapiente iste voluptatum temporibus, consequatur unde, rerum nisi pariatur laudantium impedit reiciendis quasi, illo quibusdam inventore hic aperiam nesciunt maxime culpa neque! Ab sapiente earum, non asperiores quaerat maxime quae cumque officiis maiores amet. Explicabo reiciendis veniam, culpa nostrum esse iste obcaecati sapiente maxime consequatur doloremque provident quia a natus quisquam, itaque neque nihil alias illum aut minima deserunt laboriosam tempora. Quidem, fugiat architecto! Vero laudantium eum praesentium sapiente dolore sint cumque dignissimos! Autem natus quibusdam in eveniet dicta vero accusamus quos repudiandae a, quas numquam, quidem id, officiis molestias fuga blanditiis atque perferendis deserunt cupiditate iste vitae magnam dolorem rem! Error fuga quas, molestiae quod eum recusandae, porro suscipit consequuntur nobis nisi odio ullam cupiditate."
    >

    </SmTextarea>
  );
}
