const { lambdaInvoker } = require('laconia-invoke')
const basicHandler = require('./basic-handler')
const isplainobject = require('lodash.isplainobject')
const _ = { isPlainObject: isplainobject }

module.exports = (handler) => basicHandler((event, context) => {
  const recurse = (payload = {}) => {
    if (!_.isPlainObject(payload)) {
      throw new Error('Payload must be an object')
    }
    return lambdaInvoker(context.functionName).fireAndForget(Object.assign({}, event, payload))
  }
  return handler(event, context, recurse)
})
