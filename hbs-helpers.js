const hbs = require('hbs')

hbs.registerHelper('ifEq',(arg1, arg2, options) => {
  return String(arg1) == String(arg2) ? options.fn(this) : options.inverse(this)
})

hbs.registerHelper('ifGt',(arg1, arg2, options) => {
  return Number(arg1) > Number(arg2) ? options.fn(this) : options.inverse(this)
})

module.exports = hbs