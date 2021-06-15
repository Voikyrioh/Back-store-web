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

export function login(username, password) {
    return fetch("http://localhost:8081/login/",
        {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {
                "access-control-allow-origin" : "*",
                "Content-type": "application/json; charset=UTF-8"
            }})
        .then(response => response.json());
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