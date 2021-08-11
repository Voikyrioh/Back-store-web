export function userListDefaultState() {
    return {loading: true, count: 0, users: []};
}

export const userListActions = {
    ADD: 'add',
    BAN: 'ban',
    EDIT: 'edit',
    FINISHED: 'finished',
    LOADING: 'loading',
    REMOVE: 'remove'
}

export function userListReducer(state, action) {
    switch (action?.type) {
        case userListActions.ADD:
            break;
        case userListActions.BAN:
            break;
        case userListActions.EDIT:
            break;
        case userListActions.FINISHED:
            if (!action.payload || !Array.isArray(action.payload) ) {
                throw new Error();
            }
            return {loading: false, count: action.payload.length, users: action.payload};
        case userListActions.LOADING:
            return userListDefaultState();
        case userListActions.REMOVE:
            return {...state, users: state.users.filter(user => user.key !== action.id)};
        default:
            throw new Error();
    }
}