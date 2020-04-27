import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReminder, deleteReminder, clearReminders } from '../actions'
import '../index.css'
import moment from 'moment'
import ReminderList from './ReminderList'
import time from '../images/time.png'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: ''
        }
    }

    componentDidMount() {
        let currTime = moment().add(1, 'd').format('YYYY-MM-DDTHH:mm');
        document.querySelector(".date-input").value = String(currTime)
        this.setState({
            text: this.state.text,
            dueDate: String(currTime)
        })
    }

    addReminder() {
        if (this.checkEmpty())
            this.props.addReminder(this.state.text, this.state.dueDate)
    }

    deleteReminder(id) {
        this.props.deleteReminder(id)
    }

    checkEmpty() {
        const textInput = document.querySelector(".text-input");
        const errorText = document.getElementById("error-text");
        if (textInput.value == "") {
            errorText.style.display = "block";
            textInput.style.border = "solid 2px red";
            return false
        } else {
            errorText.style.display = "none";
            textInput.style.border = "";
            return true
        }
    }

    render() {
        return (
            <div className="App">
                <div className="title">
                    Reminder Pro <img id="time-logo" alt="time-logo" src={time} /> 
                </div>
                <div className="reminder-form">
                    <div className="inline-block">
                        <input className="form-control text-input" placeholder="write something here..."
                            onChange={event => this.setState({ text: event.target.value })} />
                        <div id="error-text">*This field cannnot be empty</div>
                    </div>
                    <div className="inline-block">
                        <input className="form-control date-input" type="datetime-local" onChange={event => this.setState({ dueDate: event.target.value })} />
                        <button type="submit" className="btn btn-success" onClick={() => this.addReminder()}>Add Reminder</button>
                    </div>
                </div>
                {/* {this.renderReminders()} */}
                <ul className="list-group col-sm-4">
                    {
                        this.props.reminders.map((reminder, index) => {
                            return (
                                <ReminderList key={index} reminder={reminder} deleteReminder={this.props.deleteReminder} />
                            )
                        })
                    }
                </ul>
                <div>
                    <button type="button" className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete all items?')) this.props.clearReminders() }}>Clear All</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        reminders: state
    }
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);
