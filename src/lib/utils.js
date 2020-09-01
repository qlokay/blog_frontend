const session = {
  save: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  fentch: (key) => {
    console.log(key)
    return JSON.parse(sessionStorage.getItem(key)) || {}
  },
  remove: (key) => {
    return sessionStorage.removeItem(key)
  }
}

export default {
  install: (vue) => {
    vue.prototype.$session = session
  }
}
