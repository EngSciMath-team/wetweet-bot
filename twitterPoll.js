const slackUtils = require('./slackUtils')

const SUCCESS_THRESHOLD = 1
const activePolls = []

const createPoll = async (poll) => {
    const options = [
        {label: 'Tweet it!', value: 'yes'},
        {label: 'Don\'t tweet it', value: 'no'}
    ]

    const interactiveMessage = slackUtils.createInteractiveMessage('Proposed Tweet (Vote ends in 60 seconds)', poll.tweetText, options)

    const newPoll = {
        id: interactiveMessage.callbackId,
        tweet: poll.tweetText,
        votes: [],
        selfDestructHandle: setTimeout(() => endPoll(interactiveMessage.callbackId, false), 1000 * 60)
    }

    activePolls.push(newPoll)

    console.log('created new poll:', newPoll)

    return await slackUtils.sendMessage(interactiveMessage.message)
}

const endPoll = async (pollId, didPass) => {
    const finishedPoll = activePolls.find(p => p.id === pollId)
    clearTimeout(finishedPoll.selfDestructHandle)

    if (didPass) {
        await slackUtils.sendMessage(slackUtils.createMessage(`Vote passed, tweeting: "${finishedPoll.tweetText}"`))
    } else {
        await slackUtils.sendMessage(slackUtils.createMessage(`Vote failed to pass, not tweeting`))
    }

    // clean up
    activePolls = activePolls.filter(p => p.id !== pollId)

    // need to be able to delete the interactive message or replace it with something else too
}

const castVote = (response) => {
    const {user, callback_id, actions} = response

    const poll = activePolls.find(p => p.id === callback_id)
    const isSupported = actions.map(a => a.value).includes('yes') ? true : false

    const existingVoteIndex = votes.findIndex(v => v.userId === user.id)
    if (-1 === existingVoteIndex) {
        poll.votes.push({
            userId: user.id,
            isSupported
        })
    } else {
        votes.find(v => v.userId === user.id).isSupported = isSupported
    }

    return {
        pollId: poll.id,
        didPass: poll.votes.map(v => v.vote).filter(v => v.isSupported).length > SUCCESS_THRESHOLD
    }
}

module.exports = {
    createPoll,
    castVote,
    endPoll
}
