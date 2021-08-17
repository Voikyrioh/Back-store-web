export function getRandomBgColor() {
    let code = Math.random().toString(36).replace(/[^0-9a-f]+/g, 'f').substr(0, 6);
    return`#${code}`;
}
