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

import {getDefaultHeaders, getJsonBody} from "../NetworkService";
import {notification} from "antd";
import {AlertOutlined, SmileOutlined} from "@ant-design/icons";

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
 * @params {function} onLogged
 * @return {void}
 */
export function loginUser(event, onLogged) {
    fetch(
        'http://localhost:8081/login/',
        getDefaultHeaders('POST', {username: event.username, password: event.password})
    ).then((res) => {
        if (res.status > 200) {
            notification.error({
                message: `une erreur es survenue, désolé`,
                icon: <AlertOutlined />,
                placement: "topRight"
            })
            return;
        }
        getJsonBody(res).then(loginBody => {
            if(changeLoginState(loginBody, onLogged)) {
                notification.success({
                    message: `Salut ${event.username} !`,
                    description: 'Tu est maintenant connecté, profite bien.',
                    placement: "topLeft"
                })
            } else {

            }
        }).catch(e => {
            console.error(e);
        })
    });
}

/**
 * @param {function} onLoggedOut
 */
export function logout(onLoggedOut) {
    fetch(
        'http://localhost:8081/logout/',
        getDefaultHeaders('GET')
    ).then(res => {
        if (res.status !== 200) {
            console.error('Oupsie', res);
            return;
        }
        getJsonBody(res).then(logoutBody => {
            if (changeLoginState(logoutBody, onLoggedOut)) {

            } else {

            }
        }).catch(e => {
            console.error(e);
        })
    });
}

export function register(userForm) {
    return fetch("http://localhost:8081/signup/",
        {
            method: "PUT",
            body: JSON.stringify(userForm),
            headers: {
                "access-control-allow-origin" : "*",
                "Content-type": "application/json; charset=UTF-8"
            }})
        .then(response => response.json());
}

/**
 * @param {number} id
 * @return {Promise<User>}
 */
export function getUser(id) {
    return fetch(`http://localhost:8081/user/${id}`, getDefaultHeaders('GET'))
        .then(response => response.json());
}