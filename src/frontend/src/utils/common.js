/**
 * @param string
 * @returns {string}
 */
function removeBOM(string) {
    return string.replace(/\uFEFF/, "");
}

export {
    removeBOM
}