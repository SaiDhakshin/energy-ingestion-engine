import http from 'k6/http';
import { check } from 'k6';

// Simulates multiple devices sending telemetry
export const options = {

    stages: [
        { duration: '10s', target: 100 }, // ramp up
        { duration: '30s', target: 500 }, // hold
        { duration: '10s', target: 0 },   // ramp down
    ],
};

export default function () {

    const payload = JSON.stringify({
        type: "vehicle",
        id: "vehicle_" + Math.floor(Math.random() * 1000),
        value1: Math.random() * 20,
        value2: 30 + Math.random() * 5,
        timestamp: Date.now(),
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(
        'http://localhost:3000/v1/ingest',
        payload,
        params
    );

    check(res, {
        'status is 201/200': (r) => r.status === 201 || r.status === 200,
    });
}