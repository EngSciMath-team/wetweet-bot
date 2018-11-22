const express = require('express')
const app = express()
const port = 3000 || process.env.TWITTERBOT_PORT

app.get('/', (req, res) => {
    res.send('hello')
})


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
