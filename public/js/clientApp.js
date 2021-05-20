console.log('client side js file')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = search.value
    const url = '/weather?address=' + address
    message1.textContent = 'loading...'
    message2.textContent = ''
    fetch(url).then((res) => {

        res.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecastData

            }
        })
    })

})