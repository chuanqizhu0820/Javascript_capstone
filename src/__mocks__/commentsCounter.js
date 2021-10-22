const commentsCounter = (commentArr) => {
    if (commentArr) {
        let text = `Comments (${commentArr.length}) by previous visitors`;
        return text;
    } else {
        return `Comments (0) by previous visitors`
    }

};

module.exports = commentsCounter;