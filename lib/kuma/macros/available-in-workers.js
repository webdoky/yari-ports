const text = 'Примітка';
const stringExtendedDefault =
  'Ця можливість доступна у <a href="/uk/docs/Web/API/Web_Workers_API">вебворкерах</a>';

const stringExtendedServiceWorkers =
  'Ця можливість доступна у <a href="/uk/docs/Web/API/Web_Workers_API">вебворкерах</a>, проте не у <a href="/uk/docs/Web/API/Service_Worker_API">сервісних воркерах</a>';

function availableInWorkers(workerType) {
  let caption = stringExtendedDefault;

  if (workerType) {
    if (workerType === 'notservice') {
      caption = stringExtendedServiceWorkers;
    } else {
      throw new Error(
        `'${workerType}' is not a recognized argument to this macro`,
      );
    }
  }
  return `
<div class="notecard__note">
  <p><strong>${text}:</strong> ${caption}</p>
</div>
`;
}

export default availableInWorkers;
