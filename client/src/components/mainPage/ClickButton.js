import React from 'react';

class ClickButton extends React.Component {

    render() {
        return(
            <React.Fragment>
                <button style={this.props.buttonStyle} onClick={(e) => this.props.clickHandler(e)}>Click</button>
            </React.Fragment>
        );
    }
}

export default ClickButton;