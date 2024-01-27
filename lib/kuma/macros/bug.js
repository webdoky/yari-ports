function bug(bugNumber, type = 'bug', comment = '') {
  if (type === 'table') {
    return `{{tabular bug}}`; // TODO:?
  }

  const bugPageURL = `https://bugzilla.mozilla.org/show_bug.cgi?id=${bugNumber}`;

  return `<a href="${bugPageURL}">вада&nbsp;${bugNumber}${comment}</a>`;
}

export default bug;
