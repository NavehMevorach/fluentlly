import React, { Component } from 'react'

class Stopwatch extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
    })
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart,
      })
    }, 10)
  }

  stopTimer = () => {
    this.setState({ timerOn: false })
    clearInterval(this.timer)
  }

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0,
    })
  }

  render() {
    const { timerTime } = this.state
    let seconds = ('0' + (Math.floor(timerTime / 1000) % 60)).slice(-2)
    let minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2)

    return (
      <div className='stopwatch'>
        <span className='stopwatch__score'>
          {minutes} : {seconds}
        </span>
        {this.state.timerOn === false && this.state.timerTime === 0 && (
          <button onClick={this.startTimer}>Start</button>
        )}
        {this.state.timerOn === true && (
          <button onClick={this.stopTimer}>Stop</button>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <button onClick={this.startTimer}>Resume</button>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <button
            onClick={() => {
              this.resetTimer()
              const scores = this.props.scores
              let score = document.querySelector('.stopwatch__score').innerText
              score = `${score.slice(0, 2)}${score.slice(5, 7)}`
              scores.push(score)
              this.props.setScores({ scores })
              localStorage.setItem('scores', JSON.stringify(scores))
            }}
          >
            Reset
          </button>
        )}
      </div>
    )
  }
}

export default Stopwatch
