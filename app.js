const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/param/:id', (req,res ) => {
    // http://linkpic.io/param/
    // /param/111?locale=ua
    const id = req.params.id;
    const locale = req.query.locale;
    const body = req.body;
    /**
     * http - protocol
     * linkpic.io - domain name
     * 1wws11 - endpoint
     * 922999 - param
     * ? - start query
     */
    console.log(id, locale)
    res.send(`parameter added ${id} ${locale}`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function makeShort(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset[randomIndex];
    }
    return result;
}
