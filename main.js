const LOCAL_STORAGE = {
  prefs: 'gas-calc-preferences'
}

let preferences = {
  mileage: 0,
  price: 0,
}

window.onload = () => {
  
  checkLocalStorage()
  refreshLocalStorage()

  document.getElementById('prefs').addEventListener('submit', savePrefs)
  document.getElementById('trip').addEventListener('submit', handleCalcTrip)
  document.getElementById('litres').addEventListener('submit', handleCalcLitres)
  document.getElementById('price').addEventListener('submit', handleCalcPrice)

}

function checkLocalStorage() {
  if (!localStorage.getItem(LOCAL_STORAGE.prefs)) {
    var prefs = {
      mileage: 10,
      price: 150.0
    }
    localStorage.setItem(LOCAL_STORAGE.prefs, JSON.stringify(prefs))
  }
}
function refreshLocalStorage() {
  preferences = JSON.parse(localStorage.getItem(LOCAL_STORAGE.prefs))
  updatePrefFields()
  updateTripFields()
  updateLitreFields()
  updatePriceFields()
}

function updatePrefFields() {
  const els = document.querySelectorAll('[id^="prefs-"]')
  els[0].value = preferences.mileage,
  els[1].value = preferences.price
}
function savePrefs(e) {
  e.preventDefault()
  const form = document.getElementById('prefs')
  const data = Object.fromEntries(new FormData(form).entries())
  Object.keys(data).forEach((key) => {
    data[key] = parseFloat(data[key])
  })
  localStorage.setItem(LOCAL_STORAGE.prefs, JSON.stringify(data))
  refreshLocalStorage()
  window.alert('Your preferences have been saved to LocalStorage')
}

function updateTripFields() {
  const els = document.querySelectorAll('[id^="trip-"]')
  els[1].value = preferences.price
}
function handleCalcTrip(e) {
  e.preventDefault()
  const form = document.getElementById('trip')
  const data = Object.fromEntries(new FormData(form).entries())
  Object.keys(data).forEach((key) => {
    data[key] = parseFloat(data[key])
  })
  var totalLitres = (preferences.mileage/100)*data['distance']
  var totalPrice = (totalLitres * data['gasPrice'])/100
  window.alert(`Price for ${data['distance']} km trip:
    Gas needed: ${totalLitres.toFixed(2)} L
    Price: $${totalPrice.toFixed(2)}
  `)
}

function updateLitreFields() {
  const els = document.querySelectorAll('[id^="litres-"]')
  els[1].value = preferences.price
}
function handleCalcLitres(e) {
  e.preventDefault()
  const form = document.getElementById('litres')
  const data = Object.fromEntries(new FormData(form).entries())
  Object.keys(data).forEach((key) => {
    data[key] = parseFloat(data[key])
  })
  var totalPrice = (data['volume'] * data['gasPrice'])/100
  window.alert(`Price for ${data['volume']} L of gas:
    Price: $${totalPrice.toFixed(2)}
  `)
}

function updatePriceFields() {
  const els = document.querySelectorAll('[id^="price-"]')
  els[1].value = preferences.price
}
function handleCalcPrice(e) {
  e.preventDefault()
  const form = document.getElementById('price')
  const data = Object.fromEntries(new FormData(form).entries())
  Object.keys(data).forEach((key) => {
    data[key] = parseFloat(data[key])
  })
  var totalLitres = (data['price'] / data['gasPrice'])*100
  window.alert(`Litres given for $${data['price'].toFixed(2)} worth of gas:
    Litres given: ${totalLitres.toFixed(2)} L
  `)
}