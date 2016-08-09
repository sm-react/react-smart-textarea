import React, { Component, PropTypes } from 'react';

export const LEFT_EXIT  = 'LEFT_EXIT';
export const RIGHT_EXIT = 'RIGHT_EXIT';
export const ENTER_EXIT = 'ENTER_EXIT';
export const ESC_EXIT   = 'ESC_EXIT';
export const TAB_EXIT   = 'TAB_EXIT';
export const DEL_EXIT   = 'DEL_EXIT';
export const BCSP_EXIT  = 'BCSP_EXIT';

const HEIGHT_SHIFT = 8;

export default class ReactInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.defaultValue,
            height: 30,
            width: 100,
            onMouseOver:false,
            focusOn: false
        }
        this.shadow=null;
        this.input =null;
        this.ready =false;
        this.readyTrans=1;

        this.styleFont = {
            width: '100%', /*fixme: проблемы из за разной ширины*/
            fontSize: 16,
            fontFamily: 'Roboto, sans-serif',
            padding: 0,
            border: 'none',
            resize: 'none',
            overflowY: 'hidden',
            outline: 'none',
//          lineHeight: 24,
            /*top: 0,
            position: 'absolute'*/
        }
        this.styleInput = {

            /*overflowY: 'hidden',
            resize: 'none',
            border: 'none',*/
            /*outline: 'none',*/
            backgroundColor: 'transparent',
            color: 'rgb(66, 66, 66)',
        }
        this.styleTransition = { transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms' }

        this.focus = this.focus.bind(this);

    }

    updateComp = (text, callback) => {
        if(text==undefined) {
            text = this.state.text;
        }
        this.shadow.value=text;
        this.setState({text, height:this.shadow.scrollHeight, width: this.input.clientWidth}, callback)
    }

    textareaInit(elem) {
        if(!elem) return;
        if(this.shadow && this.input) return;

        if(elem.name=='shadow') {

            this.shadow = elem;
//            console.log(`textareaInit: ${this.shadow.scrollHeight}`) ;
        }
        if(elem.name=='input') {
            this.input = elem;
        }


    }

    onkeyDown(event) {
//        event.persist();

        if(!this.props.handleFuncKeys) return;
        const stopit = ()=>{event.stopPropagation();event.preventDefault();};

        const keyCode = event.keyCode;
        const selectionStart = this.input.selectionStart;
        const textLength = this.input.textLength;

        if((keyCode==37 || keyCode==38) && selectionStart==0) {
            stopit();
            this.props.onFuncKeyDown(keyCode,LEFT_EXIT,selectionStart);
        }
        if((keyCode==39 || keyCode==40) && selectionStart==textLength) {
            stopit();
            this.props.onFuncKeyDown(keyCode,RIGHT_EXIT,selectionStart);
        }
        if(keyCode==13) {
            stopit();
            this.props.onFuncKeyDown(keyCode,ENTER_EXIT,selectionStart);
        }
        if(keyCode==27) {
            stopit();
            this.props.onFuncKeyDown(keyCode,ESC_EXIT,selectionStart);
        }
        if(keyCode==46 && selectionStart==textLength) {
            stopit();
            this.props.onFuncKeyDown(keyCode,DEL_EXIT,selectionStart);
        }
        if(keyCode== 8 && selectionStart==0) {
            stopit();
            this.props.onFuncKeyDown(keyCode,BCSP_EXIT,selectionStart);
        }
        if(keyCode== 9) {
            stopit();
            this.props.onFuncKeyDown(keyCode,TAB_EXIT,selectionStart);
        }

        /*textLength*/
//        console.log(`keyCode= ${event.keyCode} selectionStart=${this.input.selectionStart}`);

   /*
        LEFT_EXIT
        RIGHT_EXIT
        ENTER_EXIT
        ESC_EXIT
        DEL_EXIT
        BCSP_EXIT
        TAB_EXIT
        */
    }

    onchange(event) {
        //event.persist();
        if(event.type/*=="change"*/) { //todo: почему только "change"?
            const input = event.target;
            this.updateComp(input.value);
            this.props.onChange(input.value);
            console.log('input changed')
        }
    }

    onfocus(event) {
       this.setState({focusOn: true});
    }

    onblur(event) {
        this.setState({focusOn: false});
        this.props.onBlur();
    }

    focus(pos) {
        if(this.input) {
            this.input.focus();
            let position = (pos>=0) ? pos : this.input.textLength + pos +1
            this.input.setSelectionRange(position, position); //fixme
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.focus!=null && this.props.focus!=undefined) {
            this.setState({focusOn: true});
        }
        this.updateComp( (nextProps.defaultValue != this.props.defaultValue) ? nextProps.defaultValue : null);
        //todo: оптимизировать скорость
    }


    componentWillUpdate(nextProps, nextState) {
        if(nextState.height!=this.state.height) {
            this.props.onChangeHeight(nextState.height+HEIGHT_SHIFT);
        }
//        console.log(nextState.height+HEIGHT_SHIFT);
    }


    render() {
        const styleMouseOver = this.state.onMouseOver? this.props.styleMouseOver : {} ;
        const styleFocus = this.state.focusOn? this.props.styleFocus : {} ;
        const styleTrans = this.readyTrans < 0? this.styleTransition : {} ;
        const styleDiv = {
                        marginTop: 0,
                        marginLeft: 0,
                        height: this.state.height+HEIGHT_SHIFT,
                        ...styleTrans,
                        ...this.props.style,
                        ...styleMouseOver,
                        ...styleFocus
                 }
        this.readyTrans--;
//        console.log('ReactInput');
        return <div
          style={styleDiv}
          onMouseOver={()=>this.setState({onMouseOver:true},this.props.onMouseOver)}
          onMouseOut ={()=>this.setState({onMouseOver:false},this.props.onMouseOut)}
          onFocus={()=>this.setState({onFocus:true},this.props.onFocus)}
          onBlur={()=>this.setState({onFocus:false},this.props.onFocusOut)}
          >
           <div style={{margin:0/*, position: 'relative'*/}}>

                           <textarea
                           name='input'
                           type='text'
                           value={this.state.text ? this.state.text : this.state.focusOn ? "" : this.props.hintText}
                           onKeyDown={this.onkeyDown.bind(this) /*fixme: remove bind */}
                           onChange={this.onchange.bind(this)}
                           onFocus={this.onfocus.bind(this)}
                           onBlur ={this.onblur.bind(this)}
                           rows='1'
                           style={{/*top: 0,*/ /*position: 'relative',*/ marginTop: 2, height:this.state.height+0, ...this.styleFont,  ...this.styleInput}}
                           ref={this.textareaInit.bind(this)}
                           />


                          <textarea
                           name='shadow'
                           type='text'
                           value={this.state.text ? this.state.text : this.state.focusOn ? "" : this.props.hintText}
                           rows='1'
                           onChange={()=>(null)}
                           style={{visibility: 'hidden', height: 1, marginTop: -5,
                       top: -15, position: 'relative',
                           /*border: 'solid 2px red',*/
                            ...this.styleFont }}
                           ref={this.textareaInit.bind(this)}

                           />

                           </div>

        </div>
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.focus!=null && !prevProps.focus) {
            console.log(`Focus: ${this.props.focus} delay ${this.props.focusDelay}`);
            if(this.props.focusDelay) {
                setTimeout(()=>{this.focus(this.props.focus);}, this.props.focusDelay)
            } else {
                this.focus(this.props.focus);
            }
        }
    }

    componentDidMount() {
        this.updateComp(undefined, ()=>this.props.onChangeHeight(this.state.height+HEIGHT_SHIFT) );
        ;
        //this.shadow.value=this.input.value;
//        console.log(`componentDidMount: ${this.shadow.scrollHeight}`)
        /*this.setState({height:this.shadow.scrollHeight, width: this.input.clientWidth},
                      ()=>{}
                     );*/
//        ;
    }
}

ReactInput.defaultProps = {
    handleFuncKeys: false,
    hintText : 'Enter your text here...',
    hintColor:  'rgba(126, 126, 126, 0.72)',
    style : {},
    styleMouseOver : {
        backgroundColor: '#aad4f4',
    },
    onMouseOver: ()=>{},
    onMouseOut: ()=>{},
    styleFocus : {
        backgroundColor: '#e6e8d7',
    },
    focus: null, /* =pos */
    focusDelay: null,
    onFocus: ()=>{},
    onBlur : ()=>{},
    /*onFocusOut: ()=>{},*/
    onFuncKeyDown: ()=>{},
    onChange: ()=>{},
    onChangeHeight: ()=>{},
    index: 0
}

/*
<div style={{'-webkit-user-modify':'read-write'}}>{this.state.text}</div>

*/

