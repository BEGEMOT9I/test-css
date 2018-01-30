if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(SW_PATH).catch(registrationError => {})
  })
}
