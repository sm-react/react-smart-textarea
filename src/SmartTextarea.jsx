import React, { Component, PropTypes } from 'react';

export const LEFT_EXIT = 'LEFT_EXIT';
export const RIGHT_EXIT = 'RIGHT_EXIT';
export const ENTER_EXIT = 'ENTER_EXIT';
export const ESC_EXIT = 'ESC_EXIT';
export const TAB_EXIT = 'TAB_EXIT';
export const DEL_EXIT = 'DEL_EXIT';
export const BCSP_EXIT = 'BCSP_EXIT';

const HEIGHT_SHIFT = 8;

const propTypes = {
    defaultValue: PropTypes.string,
    onSelect: PropTypes.func,
    handleFuncKeys: PropTypes.bool,
    hintText: PropTypes.string,
    hintColor: PropTypes.string,
    style: PropTypes.object,
    styleMouseOver: PropTypes.object,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    styleFocus: PropTypes.object,
    focus: PropTypes.number /* null*/,
    focusDelay: PropTypes.number /* null*/,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onFuncKeyDown: PropTypes.func,
    onChange: PropTypes.func,
    onChangeHeight: PropTypes.func,
    onSelecting: PropTypes.func,
    disabled: PropTypes.bool,
};

const defaultProps = {
    handleFuncKeys: false,
    hintText: 'hint text...',
    hintColor: 'rgba(57, 57, 57, 0.6)',
    style: {},
    styleMouseOver: {},
    onMouseOver: () => {},
    onMouseOut: () => {},
    styleFocus: {},
    focus: null, /* =pos */
    focusDelay: null,
    onFocus: () => {},
    onBlur: () => {},
    onFuncKeyDown: () => {},
    onChange: () => {},
    onChangeHeight: () => {},
    onSelecting: () => {},
};

class SmartTextarea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.defaultValue,
            height: 30,
            width: 100,
            onMouseOver: false,
            focusOn: false,
        };
        this.shadow = null;
        this.input = null;
        this.ready = false;
        this.readyTrans = 1;

        this.styleComn = {
            width: '100%',
            font: 'inherit',
            padding: 0,
            border: 'none',
            resize: 'none',
            overflowY: 'hidden',
            outline: 'none',
        };
        this.styleInput = {
            backgroundColor: 'transparent',
            color: 'rgb(66, 66, 66)',
        };
        this.styleTransition = { transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms' };

        this.selection = '';

        this.focus = this.focus.bind(this);
        this.onmousemove = this.onmousemove.bind(this);
        this.updateComp = this.updateComp.bind(this);
        this.onkeyDown = this.onkeyDown.bind(this);
        this.onchange = this.onchange.bind(this);
        this.onfocus = this.onfocus.bind(this);
        this.onblur = this.onblur.bind(this);
    }

    componentDidMount() {
        this.updateComp(undefined, () =>
                        this.props.onChangeHeight(this.state.height + HEIGHT_SHIFT)
        );
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.focus !== null && this.props.focus !== undefined) {
            this.setState({ focusOn: true });
        }
        this.updateComp((nextProps.defaultValue !== this.props.defaultValue) ?
                    nextProps.defaultValue : null);
    }


    componentWillUpdate(nextProps, nextState) {
        if (nextState.height !== this.state.height) {
            this.props.onChangeHeight(nextState.height + HEIGHT_SHIFT);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.focus !== null && !prevProps.focus) {
            if (this.props.focusDelay) {
                setTimeout(() => {this.focus(this.props.focus);}, this.props.focusDelay);
            } else {
                this.focus(this.props.focus);
            }
        }
    }

    onkeyDown(event) {
        if (!this.props.handleFuncKeys) return;
        const stopit = () => {event.stopPropagation(); event.preventDefault(); };

        const keyCode = event.keyCode;
        const selectionStart = this.input.selectionStart;
        const textLength = this.input.textLength;

        if ((keyCode === 37 || keyCode === 38) && selectionStart === 0) {
            stopit();
            this.props.onFuncKeyDown(keyCode, LEFT_EXIT, selectionStart);
        }
        if ((keyCode === 39 || keyCode === 40) && selectionStart === textLength) {
            stopit();
            this.props.onFuncKeyDown(keyCode, RIGHT_EXIT, selectionStart);
        }
        if (keyCode === 13) {
            stopit();
            this.props.onFuncKeyDown(keyCode, ENTER_EXIT, selectionStart);
        }
        if (keyCode === 27) {
            stopit();
            this.props.onFuncKeyDown(keyCode, ESC_EXIT, selectionStart);
        }
        if (keyCode === 46 && selectionStart === textLength) {
            stopit();
            this.props.onFuncKeyDown(keyCode, DEL_EXIT, selectionStart);
        }
        if (keyCode === 8 && selectionStart === 0) {
            stopit();
            this.props.onFuncKeyDown(keyCode, BCSP_EXIT, selectionStart);
        }
        if (keyCode === 9) {
            stopit();
            this.props.onFuncKeyDown(keyCode, TAB_EXIT, selectionStart);
        }
    }

    onchange(event) {
        const input = event.target;
        this.updateComp(input.value);
        this.props.onChange(input.value);
    }

    onfocus(event) {
        this.setState({ focusOn: true });
        this.props.onFocus(event);
    }

    onblur(event) {
        this.setState({ focusOn: false });
        this.props.onBlur(event);
    }

    onmousemove() {
        const selection = this.input.value.slice(this.input.selectionStart,
                                                 this.input.selectionEnd);
        if (this.selection !== selection) {
            this.selection = selection;
            this.props.onSelecting(this.selection);
        }
    }

    focus(pos) {
        if (this.input) {
            this.input.focus();
            const position = (pos >= 0) ? pos : this.input.textLength + pos + 1;
            this.input.setSelectionRange(position, position); // fixme
        }
    }

    updateComp(text, callback) {
        let updText = text;
        if (updText == undefined) {
            updText = this.state.text;
        }
        this.shadow.value = updText;
        this.setState({
            text: updText,
            height: this.shadow.scrollHeight,
            width: this.input.clientWidth,
        }, callback);
    }


    textareaInit(elem) {
        if (!elem) return;
        if (this.shadow && this.input) return;

        if (elem.name === 'shadow') {
            this.shadow = elem;
        }
        if (elem.name === 'input') {
            this.input = elem;
        }
    }


    render() {
        const styleMouseOver = this.state.onMouseOver ? this.props.styleMouseOver : {};
        const styleFocus = this.state.focusOn ? this.props.styleFocus : {};
        const styleTrans = this.readyTrans < 0 ? this.styleTransition : {};
        const styleDiv = {
            marginTop: 0,
            marginLeft: 0,
            height: this.state.height + HEIGHT_SHIFT,
            ...styleTrans,
            ...this.props.style,
            ...styleMouseOver,
            ...styleFocus,
        };
        const emptyText = this.state.focusOn ? '' : this.props.hintText;
        const emptyColr = this.state.focusOn ? '' : this.props.hintColor;
        this.readyTrans--;
        return (
      <div
        name="SmartTextarea"
        className="smart-textarea"
        style={styleDiv}
        onMouseOver={(e) => this.setState({ onMouseOver: true }, this.props.onMouseOver(e))}
        onMouseOut ={(e) => this.setState({ onMouseOver: false }, this.props.onMouseOut(e))}
        onMouseMove={this.onmousemove}
      >
       <div style={{ margin: 0, height: this.state.height + HEIGHT_SHIFT, overflow: 'hidden' }}>

                       <textarea
                         name="input"
                         className="smart-textarea-input"
                         type="text"
                         value={this.state.text || emptyText}
                         onKeyDown={this.onkeyDown}
                         onChange={this.onchange}
                         onFocus={this.onfocus}
                         onBlur ={this.onblur}
                         rows="1"
                         style={{
                             marginTop: 2,
                             height: this.state.height + 0,
                             ...this.styleComn,
                             ...this.styleInput,
                             color: this.state.text ? this.props.style.color : emptyColr,
                         }}
                         ref={this.textareaInit.bind(this)}
                         disabled={this.props.disabled}
                         onSelect={this.props.onSelect}
                       />

                      <textarea
                        name="shadow"
                        type="text"
                        value={this.state.text || emptyText}
                        rows="1"
                        onChange={() => (null)}
                        style={{ visibility: 'hidden', height: 1, marginTop: -5,
                        top: -15, position: 'relative',
                        ...this.styleComn }}
                        ref={this.textareaInit.bind(this)}
                      />

                       </div>

    </div>);
    }

}


SmartTextarea.propTypes = propTypes;
SmartTextarea.defaultProps = defaultProps;

export default SmartTextarea;

/*
<div style={{'-webkit-user-modify':'read-write'}}>{this.state.text}</div>

*/

