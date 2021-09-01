import React from 'react';

class ScoreCounter extends React.Component {
    render() {
        return(
            <React.Fragment>
                <h1 style={this.props.counterStyle}>Clicks: {this.props.clickScore} | CPS: {this.props.CPS} | Time: {this.props.remainingTime}</h1>
            </React.Fragment>
        );
    }
}

export default ScoreCounter;