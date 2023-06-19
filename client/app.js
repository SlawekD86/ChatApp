const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

loginForm.addEventListener('submit', function login(event) {
  event.preventDefault();

  if (userNameInput.value.length > 0) {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
    console.log('logged in as:', userName);
  } else {
    alert('You must choose username :)');
  }
});

addMessageForm.addEventListener('submit', function sendMessage(event) {
  event.preventDefault();

  if (messageContentInput.value.length > 0) {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  } else {
    alert('There is no message here');
  }
});

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author === userName) message.classList.add('message--self');
  message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author}</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
  messagesList.appendChild(message);
}