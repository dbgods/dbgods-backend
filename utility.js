log = (type, path, message) => {
    let date = new Date()
    return console.log(date.toJSON() + " METHOD: " + type + " PATH: " + path + " MSG: " + message);
}

module.exports = {
    log
}