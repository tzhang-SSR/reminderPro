import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS, UPDATE_REMINDER } from '../constants'

export const addReminder = (text, dueDate) => {
    const action = {
        type: ADD_REMINDER,
        text,
        dueDate
    }
    console.log('action in addReminder', action);
    return action
}

export const deleteReminder = (id) => {
    const action ={
        type: DELETE_REMINDER,
        id
    }
    console.log('delete in actions', action)
    return action
}

export const clearReminders = () => {
    return{
        type: CLEAR_REMINDERS
    }
}

export const updateReminder = (id, text) => {
    const action = {
        type: UPDATE_REMINDER,
        id,
        text
    }
    console.log('action in updateReminder', action);
    return action
}