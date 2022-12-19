function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function generateShortURL() {
  let shortURL = '' // 重置

  const data = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

  const collection = data.split('')

  while (shortURL.length < 5) {
    shortURL += sample(collection)
  }
  return shortURL
}

module.exports = generateShortURL