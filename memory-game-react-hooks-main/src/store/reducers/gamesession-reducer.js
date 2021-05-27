import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/actionTypes'

const loginStart = (state, action) => {
    state = undefined;
    return updateObject(state, { error: null, loading: true });
};

const loginSuccess = (state, action) => updateObject(state, {
    gameMode: gameMode,
    gameSessionId: gameSessionId,
    error: null,
    loading: false,
});

const loginFail = (state, action) => updateObject(state, {
    error: action.error,
    loading: false,
});

const logout = (state, action) => updateObject(state, {
    token: null,
    userId: null,
});

const gameSessionReducer = (state, action = {}) => {
    const { type } = action
    switch (type) {
        case LOGIN_START: {
            return loginStart(state, action)
        }
        case LOGIN_SUCCESS: {
            return loginSuccess
        }
        case LOGIN_FAIL: {
            return loginFail
        }

        default:
            return state
    }
}

export default counterReducer