let email = new URLSearchParams(window.location.search).get("email");
const span = document.getElementById("email-value");
let newTextContent = span.textContent.replace("ash@loremcompany.com", email);
span.textContent = newTextContent;
console.log(span.textContent);