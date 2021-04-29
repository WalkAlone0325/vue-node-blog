const middleware = {}

middleware['compositionApiRegistration'] = require('./composition-api/register.js')
middleware['compositionApiRegistration'] = middleware['compositionApiRegistration'].default || middleware['compositionApiRegistration']

export default middleware
