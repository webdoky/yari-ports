function bug(bugNumber, type = 'bug', comment = '') {
  if (type === 'table') {
    return `{{tabular bug}}`; // TODO:?
  }

  var bugPageURL = 'https://bugzilla.mozilla.org/show_bug.cgi?id=' + bugNumber;

  return `<a href="${bugPageURL}">баг&nbsp;${bugNumber}${comment}</a>`;
}

module.exports.default = bug;
