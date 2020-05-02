import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS, UPDATE_REMINDER } from '../constants';
import { read_cookie, bake_cookie } from 'sfcookies';
import { clearReminders } from '../actions';

const reminder = (action) => {
    let { text, dueDate } = action;
    return {
        id: Math.random(),
        text,
        dueDate
    }
}

const removeById = (state = [], id) => {
    const reminders = state.filter(reminder => reminder.id !== id)
    console.log('new reduced reminders', reminders)
    return reminders
}

const updateById = (state = [], action) => {
    let { text, id } = action;
    console.log('actionid', action.id)
    console.log('state', state)

    const reminder = state.map(e => {
        if (e.id == id) {
            return {
                ...e,
                text: text
            }
        }
        return e
    })

    return [...state, reminder]
}

const reminders = (state = [], action) => {
    let reminders = null;
    state = read_cookie('reminders')
    switch (action.type) {
        case ADD_REMINDER:
            reminders = [...state, reminder(action)]
            bake_cookie('reminders', reminders)
            return reminders
        case DELETE_REMINDER:
            reminders = removeById(state, action.id)
            bake_cookie('reminders', reminders)
            return reminders
        case CLEAR_REMINDERS:
            reminders = []
            bake_cookie('reminders', reminders)
            return reminders
        case UPDATE_REMINDER:
            reminders = state.map(reminder => {
                if (reminder.id == action.id) {
                    return {
                        ...reminder,
                        text: action.text
                    }
                }
                return reminder
            })
            bake_cookie('reminders', reminders)
            return reminders
        default:
            return state;
    }

}

export default reminders;