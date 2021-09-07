import React from 'react';
import ClickButton from './ClickButton';
import ScoreCounter from './ScoreCounter';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { TextField, Typography } from '@material-ui/core';

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
    },
    page: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'red',
        width: '100%',
        height: '100%'
    },
    game: {
        flex: 4,
        backgroundColor: 'green',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    scoreBoardHistory: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'blue',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    scoreBoardTop: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'yellow',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
            clickerCPS: 0,
            topScores: []
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

        if(localStorage.topScore===undefined) {
            localStorage.setItem("topScore", this.state.clickerCPS);
        } else if(this.state.clickerCPS>parseInt(localStorage.topScore)) {
            localStorage.setItem("topScore", this.state.clickerCPS);
        }

        if(localStorage.score===undefined) {
            let s = [];
            s[0] = this.state.clickerCPS;
            localStorage.setItem("score", JSON.stringify(s))
        } else {
            let s = JSON.parse(localStorage.getItem("score"));

            if(s.length===10) {
                s.shift();
            }

            s.push(this.state.clickerCPS);
            localStorage.setItem("score", JSON.stringify(s));
        }

        setTimeout(this.enableButton, 3000)
        }
    }

    componentDidMount() {
        this.getTopScores();
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

    generate = () => {
        return JSON.parse(localStorage.score).reverse().map((value) =>
            <ListItem>
                <ListItemText primary={value}/>
            </ListItem>
        );
      }

    getTopScores = () => {
        let res = axios.get(url + '/score/top10')
        .then((response) => {
            console.log(response);
            this.setState({topScores: response.data.msg})
          }, (error) => {
            console.log(error);
        });
    }

    generateTopScores = () => {
        return this.state.topScores.map((value) =>
            <ListItem>
                <ListItemText primary={value.clickerCPS + " " + value.username}/>
            </ListItem>
        );
    }  

    render() {
        return(
            <React.Fragment>
                <div style={styles.page}>
                    <div style={styles.scoreBoardTop}>
                        {this.generateTopScores()}
                    </div>

                    <div style={styles.game}>
                        <ScoreCounter clickScore={this.state.clickCount} counterStyle={styles.scoreCounterStyle} CPS={this.state.clickerCPS} remainingTime={this.state.time}/>
                        <ClickButton buttonStyle={styles.clickButtonStyle} clickHandler={this.handleClick}/>
                    </div>
                    <div style={styles.scoreBoardHistory}>
                    <Typography>
                        Previous Scores
                    </Typography>
                    <List>
                        {this.generate()}
                    </List>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default HomePage;