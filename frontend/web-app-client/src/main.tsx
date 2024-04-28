import ReactDOM from 'react-dom/client'
import WrappedApp from 'app'

ReactDOM.createRoot(document.getElementById('root')!).render(<WrappedApp />)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('../../service-worker.js')
      .then(function (registration) {
        console.log('Service Worker registered with scope:', registration.scope)
      })
      .catch(function (error) {
        console.error('Service Worker registration failed:', error)
      })
  })
}
