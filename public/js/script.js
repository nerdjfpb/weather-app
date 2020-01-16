const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
let messageOne = document.querySelector('#message-1')
let messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', e => {
	e.preventDefault()

	const location = search.value

	messageTwo.textContent = ''
	messageOne.textContent = 'loading...'

	fetch('/weather?address=' + location).then(response => {
		response.json().then(data => {
			if (data.err) {
				messageOne.textContent = ''
				messageTwo.textContent = data.err
			} else {
				messageOne.textContent = data.location
				messageTwo.textContent = data.forecast
			}
		})
	})
})
