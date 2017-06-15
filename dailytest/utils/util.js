function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function dateSubtractDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()-1

  var hour = 23
  var minute = 59
  var second = 59


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

module.exports = {
  formatTime: formatTime,
  dateSubtractDate: dateSubtractDate
}


