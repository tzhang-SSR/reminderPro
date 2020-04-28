import React, { Component } from 'react'
import moment from 'moment'

export default class ReminderList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    }

    componentDidMount() {
        setInterval(() => this.getTimeUntil(this.props.reminder.dueDate), 1000)
        let a = moment(this.props.reminder.dueDate).format('MM-DD-YYYY')
        console.log(a)
    }

    getTimeUntil(deadline) {
        let currentDate = new Date()
        const time = Date.parse(deadline) - Date.parse(currentDate)

        const seconds = Math.floor((time / 1000) % 60)
        const minutes = Math.floor((time / 1000 / 60) % 60)
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
        const days = Math.floor((time / (1000 * 60 * 60 * 24)))

        this.setState({ days, hours, minutes, seconds })
    }

    addZero = num => {
        return num < 0 ? num : num < 10 ? '0' + num : num
    }

    formatTime(deadline) {
        return moment(deadline).format('LLL')
    }


    render() {
        return (
            <li key={this.props.reminder.id} className="list-group-item shadow-sm reminder-list">
                <div className="list-item">
                    <div className="list-item-content"><p>{this.props.reminder.text}</p></div>
                    <div className="list-item-deadline"><span id="deadline-text">DUE: </span>{this.formatTime(this.props.reminder.dueDate)}</div>
                    <div className="list-item-countdown">
                        <span id="list-item-day">{this.addZero(this.state.days)}:</span>
                        <span id="list-item-hour">{this.addZero(this.state.hours)}:</span>
                        <span id="list-item-min">{this.addZero(this.state.minutes)}:</span>
                        <span id="list-item-sec">{this.addZero(this.state.seconds)}</span>
                    </div>
                </div>
                <div className="list-item delete-button"
                    onClick={() => this.props.deleteReminder(this.props.reminder.id)}>
                        <i className="fa fa-times-circle hvr-grow"></i>
                </div>
            </li>
        )
    }
}
