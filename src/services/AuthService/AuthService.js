import {HttpMethods, httpRequest} from "../NetworkService";
import {notification} from "antd";
import {AlertOutlined} from "@ant-design/icons";

/**
 * @typedef {Object} UserSession
 * @property {string | null} username - Define for this react app the user's username
 * @property {blob} [profilePicture] - User's profile picture blob
 * @property {string|null} role - The role of the user in app
 */

/**
 * @typedef {Object} sessionInfos
 * @property {number} expiresIn - Time (in seconds) in which the session will be expired (default: 3600).
 * @property {UserSession} [user] - User's session informations send by API.
 */

/**
 * @typedef {Object} User
 * @property {string} username - .
 */

/**
 *
 * @param password
 * @return {string|null}
 */
export function testPassword(password) {
    if (!password) {
        return null;
    }

    // Password Should contain a least :
    // eight characters
    if (password.length < 8) {
        return 'Le mot de passe est trop court';
    }
    // one uppercase letter
    if (!password.match(/[A-Z]/u) || !password.match(/[a-z]/u) || !password.match(/[&@?#!$]/u) || !password.match(/[0-9]/u)) {
        return 'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un charactère spécial (&@?#!$)';
    }
    return null;
}

/**
 * Manage localStorage user session and userSession state.
 * @param {sessionInfos} sessionInfos - login/logout/register API routes response.
 * @param {function} userSession - Function to change user session state, passed by main app.
 * @return {boolean}
 */
function changeLoginState(sessionInfos, userSession) {
    if (!sessionInfos.expiresIn || Number.isNaN(sessionInfos.expiresIn)) {
        console.error('Mauvaise réponse du serveur : ', sessionInfos);
        return false;
    }

    if (sessionInfos.expiresIn > 0) {
        const expireDate = new Date();
        expireDate.setSeconds(expireDate.getSeconds() + sessionInfos.expiresIn);
        const sessionExpiration = expireDate.getTime().toString(10);
        const session = JSON.stringify(sessionInfos.user);

        localStorage.setItem('user_session_expiration', sessionExpiration);
        localStorage.setItem('user_session', session);
    } else {
        localStorage.removeItem('user_session_expiration');
        localStorage.removeItem('user_session');
    }

    userSession(sessionInfos['user']);
    return true;
}

/**
 * Execute when login form is submitted
 * @params {any} event
 * @params {function} onLogged - callback to execute when user is logged
 * @param {function} onError - event to play when an error occur
 * @return {void}
 */
export function loginUser(event, onLogged, onError) {
    httpRequest(
        HttpMethods.post,
        'http://localhost:8081/login/',
        {username: event.username, password: event.password}
    ).then((res) => {
        if (res.error || res?.full?.status > 200 || !res?.body) {
            notification.error({
                message: `une erreur es survenue, désolé`,
                icon: <AlertOutlined />,
                placement: "topRight"
            });
            onError();
            return;
        }
        if(changeLoginState(res.body, onLogged)) {
            notification.success({
                message: `Salut ${event.username} !`,
                description: 'Tu est maintenant connecté, profite bien.',
                placement: "topLeft"
            });
        } else {
            onError();
        }
    }).catch(e => {
        console.error(e);
        onError();
    })
}

/**
 * Call logout API endpoint
 * @param {function} onLoggedOut - event to play when user is logged out
 * @return {void}
 */
export function logout(onLoggedOut) {
    httpRequest(HttpMethods.get,'http://localhost:8081/logout/').then(response => {
        if (response?.full?.status !== 200 || !response?.body) {
            console.error('Oupsie', response);
            return;
        }
        changeLoginState(response.body, onLoggedOut);
    })
}

/**
 * Call register API endpoint
 * @param {Object} userForm - register form object
 * @param {function} onLogged - event to play when user is logged out
 * @param {function} onError - event to play when an error occur
 * @return {void}
 */
export function register(userForm, onLogged, onError) {
    httpRequest(HttpMethods.put, "http://localhost:8081/signup/", userForm).then(response => {
        if (response.error || response.status > 200 || !response?.body) {
            console.error("Cannot register : ", response?.error || response?.body);
            notification.error({
                message: `une erreur es survenue, désolé`,
                icon: <AlertOutlined />,
                placement: "topRight"
            });
            onError();
            return;
        }

        if (changeLoginState(response.body, onLogged)) {
            notification.success({
                message: `Bienvenue ${userForm.username} !`,
                description: 'Tu est maintenant inscrit, amuse-toi bien.',
                placement: "topLeft"
            });
        } else {
            onError();
        }
    }).catch(e => {
        console.error(e);
        onError();
    });
}

/**
 * Call getUser API endpoint
 * @param {number} id
 * @return {Object}
 */
export function getUser(id) {
    return new Promise((resolve, reject) => {
        httpRequest( HttpMethods.get, `http://localhost:8081/user/${id}`)
            .then(response => resolve(response.body));
    });
}
