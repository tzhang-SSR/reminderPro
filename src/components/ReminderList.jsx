import React, { Component } from 'react'
import moment from 'moment'

export default class ReminderList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            value: props.reminder.text,
            id: props.reminder.id,
            edit: false
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

    edit() {
        this.setState({ edit: this.state.edit !== false })
    }


    render() {
        return (
            <li key={this.state.id} className="list-group-item shadow-sm reminder-list">
                <div className="list-item">
                    {
                        this.state.edit === true
                        && <div className="list-item-content">
                            <textarea
                                value={this.state.value}
                                className="list-item-content-edit"
                                autoFocus
                                onFocus={event => {
                                    event.target.value = this.state.value
                                    this.setState({ backup: this.state.value })
                                }}
                                onChange={event => {
                                    this.setState({ value: event.target.value })
                                }}
                                onBlur={() => {
                                    this.setState({ edit: false })
                                    this.props.updateReminder(this.state.id, this.state.value)
                                }}
                                onKeyUp={event => {
                                    if (event.key === 'Escape') {
                                        this.setState({ edit: false, value: this.state.backup })
                                    }
                                }}
                            />
                        </div>
                        || <div className="list-item-content" onClick={() => {
                            this.setState({ edit: this.state.edit !== true })
                        }}>
                            <p>{this.state.value}</p>
                        </div>
                    }
                    <div className="list-item-deadline"><span id="deadline-text">DUE: </span>{this.formatTime(this.props.reminder.dueDate)}</div>
                    <div className="list-item-countdown">
                        <span id="list-item-day">{this.addZero(this.state.days)}:</span>
                        <span id="list-item-hour">{this.addZero(this.state.hours)}:</span>
                        <span id="list-item-min">{this.addZero(this.state.minutes)}:</span>
                        <span id="list-item-sec">{this.addZero(this.state.seconds)}</span>
                    </div>
                </div>
                <div className="list-item delete-button"
                    onClick={() => this.props.deleteReminder(this.state.id)}>
                    <i className="fa fa-times-circle hvr-grow"></i>
                </div>
            </li>
        )
    }
}
