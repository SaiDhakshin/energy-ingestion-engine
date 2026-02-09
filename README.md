<!DOCTYPE html>
<html lang="en">

<body>

<h1>Energy Ingestion Engine</h1>

<p style="text-align:center;">
Processes telemetry from smart meters and EV fleets, correlating AC consumption with DC delivery to compute real-time charging efficiency.
</p>

<div class="card">

<h2>📁 Project Structure</h2>

<p>
Organized using a domain-driven approach to promote scalability and maintainability.
</p>

<pre>
src/
 ├── ingestion      → telemetry ingestion pipeline
 ├── telemetry      → entities & repositories
 ├── analytics      → performance queries
 ├── database       → DB configuration & seeding
 └── common         → interceptors, pipes, utilities
</pre>

</div>


<div class="card">

<h2>🚀 Quick Start (Recommended)</h2>

<p>
Get the entire system running in under a minute using Docker.
</p>

<h3>1️⃣ Clone the repository</h3>

<pre>
git clone https://github.com/SaiDhakshin/energy-ingestion-engine.git
cd energy-ingestion-engine
</pre>

<pre>
# if using Docker add this in .env file
DB_HOST=postgres
</pre>

<h3>2️⃣ Start the container stack</h3>

<pre>
docker compose up --build
</pre>

<p>This will automatically start:</p>

<ul>
<li>✅ PostgreSQL database</li>
<li>✅ NestJS API</li>
<li>✅ Automatic fleet mapping seeding</li>
<li>✅ Dependency-aware startup (waits for DB readiness)</li>
</ul>

<p><b>No manual database setup required.</b></p>

<p>API available at:</p>

<pre>
http://localhost:3000
</pre>

<h3>Stop containers</h3>

<pre>
docker compose down
</pre>

<h3>Reset database</h3>

<pre>
docker compose down -v
</pre>

<p>
<b>The application waits for PostgreSQL readiness before startup, ensuring reliable container orchestration.</b>
</p>

</div>

<div class="card">

<h2>💻 Run Locally (Without Docker)</h2>

<p>
For developers who prefer running services natively.
</p>

<h3>Install dependencies</h3>

<pre>
npm install
</pre>

<h3>Start the server</h3>

<pre>
npm run start:dev
</pre>

<p>
API will be available at:
</p>

<pre>
http://localhost:3000
</pre>

</div>


<h2>🚀 Key Highlights</h2>

<span class="badge">~3,000 req/sec</span>
<span class="badge">0% failure rate</span>
<span class="badge">Hot vs Cold Storage</span>
<span class="badge">Index-driven queries</span>
<span class="badge">Insert + Upsert</span>
<span class="badge">Polymorphic ingestion</span>

</div>

<div class="card">

<h2>📊 Load Test Results</h2>

<p>
Stress tested using <b>k6</b> to simulate concurrent telemetry streams.
</p>

<img width="895" height="526" alt="Screenshot 2026-02-09 at 8 15 49 PM" src="https://github.com/user-attachments/assets/47f28a07-4190-404b-84db-aa51ca827d2d" />


</div>

<div class="card">

<h2>⚡ Query Performance</h2>

<p>
Composite indexes were validated using <b>EXPLAIN ANALYZE</b> to guarantee <span class="highlight">Index Scan</span> and prevent full table scans.
</p>

<img width="1041" height="237" alt="Screenshot 2026-02-09 at 9 00 54 PM" src="https://github.com/user-attachments/assets/d8908f5c-569e-4490-aa1e-b6c472f3f22a" />

</div>

<div class="card">

<h2>🏗 Architecture</h2>

<pre>
Devices
   ↓
Ingestion API
   ↓
Write Path Split
   ├── HOT STORE (Upsert → fast reads)
   └── COLD STORE (Append-only → analytics)
</pre>

<p>
<b>Core Principle:</b> Separate operational state from historical telemetry to maintain low latency at scale.
</p>

</div>

<div class="card">

<h2>🔥 Engineering Decisions</h2>

<ul>
<li><b>Hot vs Cold Tables</b> → millisecond dashboard reads</li>
<li><b>Append-only history</b> → audit-safe telemetry</li>
<li><b>Atomic upserts</b> → prevents race conditions</li>
<li><b>Composite indexes</b> → eliminates sequential scans</li>
</ul>

</div>

<div class="card">

<h2>📈 Scalability Strategy</h2>

<p>
Designed to support <b>14.4M+ records/day</b>.
</p>

Future-ready improvements:

<ul>
<li>Time-based partitioning</li>
<li>Batch inserts</li>
<li>Read replicas</li>
<li>Kafka ingestion buffer</li>
</ul>

</div>

<div class="card">

<h2>🔎 Observability</h2>

<p>
Global logging interceptor tracks request latency and detects slow API calls.
</p>

<img width="1005" height="409" alt="Screenshot 2026-02-09 at 9 04 35 PM" src="https://github.com/user-attachments/assets/9d784ed9-1fda-4ce5-a376-d55f42d0b45c" />

</div>

<div class="card">

<h2>⭐ What This Project Demonstrates</h2>

<ul>
<li>High-throughput ingestion design</li>
<li>Time-series data modeling</li>
<li>Index-aware query optimization</li>
<li>Operational vs historical storage</li>
<li>Production mindset</li>
</ul>

</div>

<p style="text-align:center; margin-top:40px;">
<b>Author:</b> Sai Dhakshin
</p>

</body>
</html>
