const express = require('express');
require('express-async-errors');
const cors = require('cors');
var axios = require('axios');

// Setup express cors, routes and accept json.
const app = express();
app.use(cors());

app.use(express.json());

app.post('/api/worklog', (req, res) => {
    var config = {
        method: 'post',
        url: `https://${req.body['url']}/rest/api/2/issue/${req.body['issue']}/worklog`,
        headers: {
            "Authorization": req.headers['authorization'],
            "Content-Type": req.headers['content-type'],
        },
        data: JSON.stringify({
            "comment": req.body['comment'],
            "started": req.body['started'],
            "timeSpentSeconds": req.body['timeSpentSeconds'],
        }),
    };

    console.log(config)
    
    axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            res.json(response.data);
        })
        .catch((error) => {
            console.log(error.response);
            res.status(error.response.status).json({ 'message': error.response.data.errorMessages });
        });


});

// Starting server.
app.listen(3333, () => {
    console.log('Server started.');
});

module.exports = app;