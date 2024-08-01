# Metrics app

This is a mono-repo with two services: a React front end and a ExpressJS backend. The next sections of this README explain each service in further details.

The idea - in the real world - is that the backend will be called by external services to create metrics, while the front end will display how many of each metric occur in a time period in a user friendly way.

As we don't have external services in this test environment - I have loaded example data in the database (which you can do by running a migrate script in the backend repo - see instructions below) or alternatively click on the FE buttons at the top of the screen to create random data of 3 metrics type: logs, errors, warnings.

## Metrics backend

The Metrics Backend is a Node.js application built with ExpressJS and PostgreSQL.

## Setup and Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Docker Desktop](https://www.docker.com/) (v20 or later)

### Run the following steps in your command line:

At the top level of the server directory:

Install the dependencies:

```
npm install
```

Start the database

```
docker compose up -d
```

Run the migration

```
npm run migrate
```

Run the app

```
npm start
```

This will start the server on port `5000`

### Running the tests

We use Jest and Supertest for testing. To run the tests, use the following command:

```
npm test
```

### GET /logs

```
Retrieves logs aggregated by the specified period.

Query Parameters:

period: Aggregation period (valid values: day, hour, minute).

Example Request:
curl -X GET "http://localhost:5000/logs?period=day"

Example Response:
[
  {
    "label": "error",
    "data": [
      { "date": "2024-07-31", "count": 5 },
      { "date": "2024-07-30", "count": 7 }
    ]
  },
  ...
]
```

### POST /logs

```
Inserts a new log entry.

Request Body:
{
"id": "uuid",
"timestamp": "2024-07-31T15:31:00Z",
"name": "error",
"value": "error msg"
}

curl -X POST "http://localhost:5000/logs" -H "Content-Type: application/json" -d '{"id":"uuid", "timestamp":"2024-07-31T15:31:00Z", "name":"error", "value":"error msg"}'

{
"id": "uuid",
"timestamp": "2024-07-31T15:31:00Z",
"name": "error",
"value": "error msg"
}
```

## Metrics front end

The front end is a React app using the `react-charts` library to display the graph.

### Setup and Installation

#### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)

### Run the following steps in your command line:

At the top level of the client directory:

Install the dependencies:

```
npm install
```

Run the app

```
npm start
```

This will start the server on port `3000`

### Axios Configuration

The `AddMetric` component posts log data to the back-end API at `http://localhost:5000/logs`.

### Custom Hook: `useGetMetrics`

- **`src/hooks/useGetMetrics.js`**: A custom React hook for fetching metrics data from the API based on the selected time period. It handles loading and error states and transforms the response data for use in charts.

# Tradeoffs

- I have had to do a few tradeoffs to respect the timeline for this tech test. For simplicity, I decided to create the app using Create React App (CRA). While this sped up the initial set up, it caused issues while testing. I kept left the tests I created, but I have not been able to run them locally
- This app exclusively works locally
- As part of a team, I would have had more descriptive and small commits and would have used PRs.
