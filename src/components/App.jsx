import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReminder, deleteReminder, clearReminders, updateReminder } from '../actions'
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
        this.setState({
            text: '',
            dueDate: this.state.dueDate
        })
        document.querySelector(".text-input").value = ""

    }

    deleteReminder(id) {
        this.props.deleteReminder(id)
    }

    updateReminder(id, text) {
        updateReminder(id, text)
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
            <div>
                <div id="title1" className="shadow-sm">
                    Reminder Pro <img id="time-logo" alt="time-logo" src={time} />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="input-wrapper col-md-5">
                            <div className="reminder-form">
                                <div className="inline-block">
                                    <textarea rows="3" className="form-control text-input" placeholder="write something here..."
                                        onChange={event => this.setState({ text: event.target.value })} ></textarea>
                                    <div id="error-text">*This field cannnot be empty</div>
                                </div>
                                <div className="inline-block">
                                    <input className="form-control date-input" type="datetime-local" onChange={event => this.setState({ dueDate: event.target.value })} />
                                    <button type="submit" className="btn btn-success" onClick={() => this.addReminder()}>Add Reminder</button>
                                </div>
                                {!this.props.reminders[0] &&
                                    <div className="inline-block tip-text1">
                                        Tips: Let's create your first reminder by using the button above.
                                </div>
                                }
                            </div>
                        </div>
                        {this.props.reminders[0]
                            ? <div className="output-wrapper col-md-7">
                                <div>
                                    <div className="row reminder-wrapper">
                                        <ul className="list-group">
                                            {
                                                this.props.reminders.map((reminder, index) => {
                                                    return (
                                                        <ReminderList key={index} reminder={reminder} deleteReminder={this.props.deleteReminder} updateReminder={this.props.updateReminder} />
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="row delete-wrapper">
                                        <button type="button" className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete all items?')) this.props.clearReminders() }}>Clear All</button>
                                    </div>
                                </div>
                            </div>
                            : <div className="col-md-7 tip-text2">
                                <em>*Your reminders will appear here</em>
                            </div>
                        }
                    </div>
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

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders, updateReminder })(App);
