console.log('Client side javascript is loaded');

const weatherForm = document.querySelector('form');
const serach = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = serach.value;

    messageOne.textContent = 'Loading';
    messageTwo.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
            } else {
                console.log(data.location, data.forecast);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});