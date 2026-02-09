import http from 'k6/http';

export const options = {
    vus: 300, // virtual users
    duration: '60s',
};

export default function () {

    const vehiclePayload = JSON.stringify({
        type: "vehicle",
        id: "vehicle_" + Math.floor(Math.random() * 2000),
        value1: Math.random() * 20,
        value2: 30 + Math.random() * 5,
        timestamp: Date.now(),
    });

    const meterPayload = JSON.stringify({
        type: "meter",
        id: "meter_" + Math.floor(Math.random() * 2000),
        value1: Math.random() * 25,
        value2: 220,
        timestamp: Date.now(),
    });

    http.post('http://localhost:3000/v1/ingest', vehiclePayload, {
        headers: { 'Content-Type': 'application/json' },
    });

    http.post('http://localhost:3000/v1/ingest', meterPayload, {
        headers: { 'Content-Type': 'application/json' },
    });
}

// k6 run dual-stream.js
