export const loginStart = () => ({
    type: actionTypes.LOGIN_START,
});

export const loginSuccess = (token, userId, channelName) => ({
    type: actionTypes.LOGIN_SUCCESS,
    gameMode: gameMode,
    gameSessionId: gameSessionId

});

export const loginFail = (error) => ({
    type: actionTypes.LOGIN_FAIL,
    error,
});