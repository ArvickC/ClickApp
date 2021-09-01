import React from 'react';
import ClickButton from './ClickButton';
import ScoreCounter from './ScoreCounter';
import axios from 'axios';

// Styles
const styles = {
    clickButtonStyle: {
      width: "40%",
      height: "40%",
      fontSize: "150px",
      fontFamily: "Roboto"
    },
    scoreCounterStyle: {
      fontSize: "50px",
      fontFamily: "Roboto",
      marginBottom: "150px"
    }
  }

  
var counterStart = false;
var disableButton = false;
var url = "http://localhost:4000"

class HomePage extends React.Component {
    // State
    constructor(props) {
        super(props);
        this.state = {
        time: 10,
        clickCount: 0,
        clickerCPS: 0
        };
    }

    // Starts timer for test
    timerStart = () => {
        this.timer = setInterval(this.tick, 1000);
    }

    // Test finsh/each tick
    tick = () => {
        this.setState({
        time: this.state.time-1,
        clickerCPS: this.state.time===10 ? 0 : (this.state.clickCount/(10-this.state.time)).toFixed(2)
        })

        // End
        if(this.state.time<=0) {
        counterStart = false;
        disableButton = true;
        clearInterval(this.timer);
        if(localStorage.name!=undefined) {
          axios.post(url + '/score/create-score', {username: localStorage.name, clickCount: this.state.clickCount, clickerCPS: this.state.clickerCPS})
        }

        setTimeout(this.enableButton, 3000)
        }
    }

    // Enables click button
    enableButton = () => {
        disableButton = false;
        this.setState({
        time: 10,
        clickCount: 0,
        clickerCPS: 0
        })
    }

    // Handle button click
    handleClick = () => {
        console.log(disableButton);
        if(disableButton) return;
        this.setState({
        clickCount: this.state.clickCount + 1
        });
        if(!counterStart) {
        counterStart = true;
        this.timerStart();
        }
    }

    render() {
        return(
            <React.Fragment>
                <ScoreCounter clickScore={this.state.clickCount} counterStyle={styles.scoreCounterStyle} CPS={this.state.clickerCPS} remainingTime={this.state.time}/>
                <ClickButton buttonStyle={styles.clickButtonStyle} clickHandler={this.handleClick}/>
            </React.Fragment>
        );
    }
}

export default HomePage;