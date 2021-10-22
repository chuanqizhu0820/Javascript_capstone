const commentCounter = (commentsArr) => {
    if (commentsArr) {
        let text = `Comments (${commentsArr.length}) by previous visitors`;
        return text;
    } else {
        return `Comments (0) by previous visitors`
    }

};

module.exports = commentCounter;