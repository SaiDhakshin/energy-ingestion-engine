<h1 align="center">⚡ Energy Ingestion Engine</h1>

<p align="center">
A high-scale telemetry ingestion system built with <b>NestJS + PostgreSQL</b> designed to process real-time energy data from Smart Meters and EV fleets.
</p>

<p align="center">
<b>Built with a production mindset — focusing on scalability, write-heavy workloads, and efficient analytics.</b>
</p>

<hr>

<h2>📌 Problem Overview</h2>

Fleet operators receive telemetry every 60 seconds from two independent hardware sources:

<h3>🔌 Smart Meter (Grid Side)</h3>
<ul>
<li>Measures AC energy pulled from the utility grid</li>
<li><b>kwhConsumedAc → billed energy</b></li>
</ul>

<h3>🚗 Vehicle & Charger (Battery Side)</h3>
<ul>
<li>Reports DC energy delivered to the battery</li>
<li>Provides battery health metrics (SoC, temperature)</li>
</ul>

<h3>⚡ Power Loss Insight</h3>

<pre>
Efficiency = DC Delivered / AC Consumed
</pre>

A drop below ~85% may indicate:

<ul>
<li>charger malfunction</li>
<li>thermal losses</li>
<li>wiring faults</li>
<li>energy leakage</li>
</ul>

<hr>

<h2>🏗 Architecture</h2>

<pre>
Devices
   ↓
Ingestion API (NestJS)
   ↓
Write Path Split
   ├── HOT STORE (Upsert)
   └── COLD STORE (Append-only)
   ↓
Analytics Engine
</pre>

<p>
<b>Core Principle:</b> Separate operational data from historical telemetry to prevent full table scans and maintain low-latency queries.
</p>

<hr>

<h2>🔥 Key Engineering Decisions</h2>

<h3>✅ Hot vs Cold Data Separation</h3>

<table>
<tr>
<th>Hot Store</th>
<th>Cold Store</th>
</tr>
<tr>
<td>Latest device status</td>
<td>Append-only telemetry</td>
</tr>
<tr>
<td>Millisecond reads</td>
<td>Optimized for analytics</td>
</tr>
<tr>
<td>Upsert strategy</td>
<td>Immutable history</td>
</tr>
</table>

<p>
This design mirrors real-world telemetry platforms where dashboards must remain fast even with billions of rows.
</p>

---

<h3>✅ Insert vs Upsert Strategy</h3>

<ul>
<li><b>INSERT → Historical tables</b> (audit-safe append-only logs)</li>
<li><b>UPSERT → Operational tables</b> (atomic latest-state updates)</li>
</ul>

Benefits:

<ul>
<li>prevents race conditions</li>
<li>supports real-time dashboards</li>
<li>eliminates expensive ORDER BY queries</li>
</ul>

<hr>

<h3>✅ Polymorphic Ingestion</h3>

<p>Single ingestion endpoint handles multiple telemetry streams:</p>

<pre>
POST /v1/ingest
</pre>

Supported:

<ul>
<li>Vehicle telemetry</li>
<li>Meter telemetry</li>
</ul>

<p>
This approach simplifies ingestion pipelines and reflects production telemetry gateways.
</p>

<hr>

<h3>✅ Index-Driven Analytics (No Full Table Scans)</h3>

<p>Composite indexes ensure efficient range scans:</p>

<pre>
(vehicle_id, timestamp DESC)
</pre>

<p>
Query plans were validated using <b>EXPLAIN ANALYZE</b> to guarantee index scans instead of sequential scans.
</p>

<hr>

<h2>📊 Analytical Endpoint</h2>

<pre>
GET /v1/analytics/performance/:vehicleId
</pre>

Returns a 24-hour summary:

<ul>
<li>Total AC consumed</li>
<li>Total DC delivered</li>
<li>Efficiency ratio</li>
<li>Average battery temperature</li>
</ul>

<p>
All aggregations execute inside PostgreSQL for maximum efficiency and minimal memory usage.
</p>

<hr>

<h2>⚡ Load Testing</h2>

<p>
The ingestion pipeline was stress-tested using <b>k6</b> to simulate concurrent telemetry streams.
</p>

<table>
<tr>
<th>Metric</th>
<th>Result</th>
</tr>
<tr>
<td>Throughput</td>
<td><b>~3,000 req/sec</b></td>
</tr>
<tr>
<td>Failure Rate</td>
<td><b>0%</b></td>
</tr>
<tr>
<td>Average Latency</td>
<td>~78ms</td>
</tr>
<tr>
<td>P95 Latency</td>
<td>~160ms</td>
</tr>
</table>

<p>
The system remained stable under heavy write pressure. Expected bottlenecks emerge at the database layer under extreme concurrency — typical for write-heavy architectures.
</p>

<hr>

<h2>📈 Scalability Strategy</h2>

<h3>Near-Term Improvements</h3>

<ul>
<li>Time-based partitioning (daily/monthly)</li>
<li>Batch inserts</li>
<li>Read replicas for analytics</li>
</ul>

<h3>Future Architecture</h3>

<pre>
Devices → Load Balancer → Ingestion API → Kafka → Workers → PostgreSQL
</pre>

<p>
A queue-based buffer protects the database from sudden ingestion spikes.
</p>

<hr>

<h2>🔎 Observability</h2>

<ul>
<li>Global logging interceptor</li>
<li>Request latency tracking</li>
<li>Slow API detection</li>
</ul>

Example:

<pre>
POST /v1/ingest 201 - 12ms
</pre>

<hr>

<h2>🐳 Running Locally</h2>

<h3>Start PostgreSQL</h3>

<pre>
docker-compose up -d
</pre>

<h3>Install Dependencies</h3>

<pre>
npm install
</pre>

<h3>Start Server</h3>

<pre>
npm run start:dev
</pre>

Server runs at:

<pre>
http://localhost:3000
</pre>

<hr>

<h2>🧪 Running Load Tests</h2>

<pre>
brew install k6
k6 run load-tests/vehicle-ingestion.js
</pre>

<hr>

<h2>📂 Project Structure</h2>

<pre>
src
 ├── ingestion
 ├── telemetry
 ├── analytics
 ├── database
 └── common
</pre>

<p>
The project follows a domain-driven structure for maintainability and scalability.
</p>

<hr>

<h2>🔐 Production Considerations</h2>

<ul>
<li>Environment-based configuration recommended</li>
<li>Disable synchronize in production</li>
<li>Secure secrets management</li>
<li>Structured logging preferred at scale</li>
</ul>

<hr>

<h2>⭐ What This Project Demonstrates</h2>

<ul>
<li>High-throughput ingestion design</li>
<li>Time-series data modeling</li>
<li>Index-aware query optimization</li>
<li>Operational vs historical storage</li>
<li>Load testing</li>
<li>Observability</li>
</ul>

<hr>

<h2 align="center">👨‍💻 Author</h2>

<p align="center">
<b>Sai Dhakshin</b><br>
Backend-focused engineer passionate about scalable, data-intensive systems.
</p>

<hr>

<p align="center">
<b>Built with a production-first mindset.</b>
</p>
