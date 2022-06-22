## Installation:

```bash  
sudo docker-compose up --build           # older version
sudo docker compose up --build           # latest version
```
If you want to run in detached mode.
```bash
sudo docker-compose up -d --build        # running background
sudo docker-compose logs                 # see the logs
```

***NB***: Make sure you have `docker` and `docker compose` installed in you machine.

## Usage;

#### Express backed server is running on `localhost:5000` and it has one endpoint `/openings`
#### React client is running on `localhost:3000`
#### NginX proxy is running on `localhost:8080` and it prxy-pass to express backend.