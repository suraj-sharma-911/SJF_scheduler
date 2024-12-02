const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: "http://localhost:5173", // Ensure this matches the frontend origin
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

class Job {
    constructor(name, duration) {
        this.initialId = 1;
        this.jobId = this.initialId++;
        this.name = name;
        this.duration = duration; // in milliseconds
        this.status = "pending"; // possible statuses: pending, running, completed
    }
}

let jobs = []; // Queue to store jobs


let job1 = new Job("write file", 5);
jobs.push(job1);

app.post('/jobs', (req, res) => {
    const { name, duration } = req.body;
    console.log('job received', name, duration)
    const job = new Job(name, duration);
    jobs.push(job);
    io.emit('jobUpdate', jobs); // Notify frontend
    sortJobsBySJF();
    io.emit('jobUpdate', jobs); // Notify frontend
});

app.get('/jobs', (req, res) => {
    res.send(jobs);
});




function sortJobsBySJF() {
    jobs.sort((a, b) => a.duration - b.duration);
}

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('jobUpdate', jobs); // Send initial job list

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});



// Simulate job processing
async function processJobs() {
    while (true) {
        if (jobs.length > 0) {
            jobs.forEach(async (job) => {
                if (job.status !== "completed") {
                    job.status = 'running';
                    io.emit('jobUpdate', jobs); // Notify frontend
                    await new Promise((resolve) => setTimeout(resolve, job.duration * 1000)); // Simulate job duration
                    job.status = 'completed';
                    io.emit('jobUpdate', jobs); // Notify frontend
                }
            });
        }
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Check every second
    }
}

processJobs();
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
