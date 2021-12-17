const str = 'Примітка';
const strExtendedDefault =
  'Ця особливість доступна всередині <a href="/uk/docs/Web/API/Web_Workers_API">Web Workers</a>';

const strExtendedServiceWorkers =
  'Ця особливість доступна всередині <a href="/uk/docs/Web/API/Web_Workers_API">Web Workers</a>, проте не у <a href="/uk/docs/Web/API/Service_Worker_API">Service Workers</a>';

function availableInWorkers(workerType) {
  let caption = strExtendedDefault;

  if (workerType) {
    if (workerType === 'notservice') {
      caption = strExtendedServiceWorkers;
    } else {
      throw new Error(
        `'${workerType}' is not a recognized argument to this macro`
      );
    }
  }
  return `
<div class="notecard__note">
  <p><strong>${str}:</strong> ${caption}</p>
</div>
`;
}

module.exports.default = availableInWorkers;
