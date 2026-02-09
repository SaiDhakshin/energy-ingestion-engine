const axios = require('axios');

async function send() {

    for (let i = 0; i < 1000; i++) {

        await axios.post('http://localhost:3000/v1/ingest', {
            type: 'meter',
            id: 'meter_1',
            value1: Math.random() * 20,
            value2: 30 + Math.random() * 5,
            timestamp: Date.now()
        });

    }

}

send();