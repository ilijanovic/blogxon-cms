self.addEventListener('push', function (e) {
  let json = e.data.text()

  let notification = JSON.parse(json)
  e.waitUntil(
    self.registration.showNotification(notification.title, notification.options)
  )
})
