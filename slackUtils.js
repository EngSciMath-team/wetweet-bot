const request = require('superagent')
const uuid = require('uuid').v4

const slackConfig = {
    webhookUrl: 'https://hooks.slack.com/services/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'
}

/*
params:
    - subject: text
    - question: text
    - options: array of:
        {label, value}
*/
const createInteractiveMessage = (subject, question, options, callbackId = uuid()) => {

    const optionActions = options.map(opt => ({
        name: 'poll_option',
        type: 'button',
        value: opt.value,
        text: opt.label
    }))

    const message = {
        text: subject,
        attachments: [
            {
                text: question,
                callback_id: callbackId,
                color: '#F55',
                attachment_type: 'defalt',
                actions: optionActions
            }
        ]
    }

    return {
        message,
        callbackId
    }
}

const createMessage = (text) => {
    return { text }
}

const sendMessage = async (message) => {
    const response = await request.post(slackConfig.webhookUrl)
        .set('Content-type', 'application/json')
        .set('Accept', 'application/json')
        .send(message)

    return response
}

module.exports = {
    sendMessage,
    createInteractiveMessage,
    createMessage
}
