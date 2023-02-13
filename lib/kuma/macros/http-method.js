export default function httpMethod(
  methodName,
  methodPrettyName,
  anchor,
  unwrapped = false,
) {
  const methodNameUppercase = methodName.toUpperCase(); // Methods are always uppercase
  let text = methodPrettyName || methodName;
  const URL = `/uk/docs/Web/HTTP/Methods/${methodNameUppercase}`;
  let anch = '';
  if (anchor) {
    text = `${text}.${anchor}`;
    anch = `#${anchor}`;
  }
  let code = '';
  let endcode = '';
  if (!unwrapped) {
    code = '<code>';
    endcode = '</code>';
  }
  return `<a href="${URL}${anch}">${code}${text}${endcode}</a>`;
}
