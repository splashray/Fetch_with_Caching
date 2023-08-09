# GitHub Repositories Counter
This is a simple Express.js application that fetches and displays the number of public repositories a GitHub user has. The application utilizes Redis for caching fetched data to improve response times.
 
## Prerequisites
Node.js: Make sure you have Node.js installed on your system.
Redis: Install and run Redis server on the default port (6379).

## Installation

```bash Clone the repository:

git clone https://github.com/splashray/Fetch_with_Caching.git

Navigate to the project directory:

```bash cd your-repo

Install the dependencies:

```bash  npm install
```

## Usage

```bash npm start
Open your web browser and access the following URL, replacing <username> with the GitHub username you want to retrieve information for:

http://localhost:3000/repos/<username>
The application will display the number of public repositories for the provided GitHub username.
```

## How It Works
The application uses the express, node-fetch, redis, and axios packages. It sets up a server to handle incoming requests.

When a request is made to the /repos/:username route, the application first checks the Redis cache for any existing data related to the provided username. If the data exists in the cache, it is retrieved and sent as a response immediately.

If the data is not found in the cache, the application fetches the data from the GitHub API using the axios library. It then extracts the number of public repositories from the response.

The fetched data is stored in the Redis cache using the provided username as the key and the number of repositories as the value.

Finally, the application sends a response to the user with the username and the corresponding number of public repositories.

## Caching Strategy

The application uses Redis to cache the fetched data. This helps in reducing the load on the GitHub API and improves response times for subsequent requests. If the data for a specific username is found in the cache, it is directly served to the user, eliminating the need to make an additional request to the GitHub API.

## Error Handling
If any errors occur during the fetching of data or while interacting with Redis, the application responds with an "Internal Server Error" message along with a status code of 500.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
This project is licensed under the MIT License. You are free to modify and distribute the code according to the terms of the license.

[MIT](https://choosealicense.com/licenses/mit/)
