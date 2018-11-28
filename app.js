const express = require('express')
const bodyParser = require('body-parser')

const polls = require('./twitterPoll')

const app = express()
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('hello')
})

// handle responses to interactive message i.e. votes
app.post('/wetweet', (req, res) => {
    const response = JSON.parse(req.body.payload)

    const voteResult = polls.castVote(response)

    if (voteResult.didPass) {
        console.log(`vote ${voteResult.pollId} passed`)
        await polls.endPoll(voteResult.pollId, true)
    }

    res.send('thanks for the vote')
})

// handle creating new polls
app.post('/wetweet/new', (req, res) => {
    console.log('got request for new poll')
    res.send('hello')
})

// handle loading menu dynamic content, dont need right now
// app.post('/wetweet/options', (req, res) => {
//     const body = req.body
//     console.log('got message response:', body)
// })

const port = 8080 || process.env.TWITTERBOT_PORT
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
