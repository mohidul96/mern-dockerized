### Running application in manually.

### Steps:
- Create a docker network. Why? It will help to add more restriction and communication between the containers will be faster.
```bash
$ docker network create -d bridge scbt_bridge
```
- Remove all the previously failed/legacy containers.
```
$ docker rmi $(docker images | grep cbt | awk '{ print $3 }') -f
```
- Build express and react app
```bash
# build express server
$ cd server/
$ docker build . -t scbt_express
# build react client
$ cd ../client
$ docker build . -t scbt_react
```


- Run the mongodb docker container from official mongodb image. Since our express server has dependency on it. If mongodb image is not found in your local environment it will pull the official mongodb image from `dockerhub`.
```bash
$ docker run -d -e MONGO_INITDB_ROOT_USERNAME=<mongodb-username> -e MONGO_INITDB_ROOT_PASSWORD=<your-super-secret-password>  --network=scbt_bridge mongo:latest
```
- Inspect mongodb container to obtain the IP address of this container.
```bash
$ docker inspect <container-id>

# Output:
[
    {
        "Id": "beb001c9ab0a683e01dee612ed347fa39fe6f304850d1cce94f36f04a5ac0f67",
        .....
                "bridge": {
                    .....
                    "Gateway": "172.20.0.1",
                    "IPAddress": "172.20.0.2",
                    "IPPrefixLen": 16,
                    .....
                }
            }
        }
    }
]
```
`172.20.0.2` is the ip address of my mongodb database container.
- Run express server that can connect to the mongo container.
```bash
$ docker run -d -e MONGOCONN_STRING=mongodb://<mongodb-username>:<your-super-secret-password>@172.20.0.2:27017 -p 5000:5000 --network=scbt_bridge scbt_express
```
NB: Now express backed can be access from `http://localhost:5000`
- Finally run the react client. And access from browser.
```bash
docker run -d -p 3000:3000 --network=scbt_bridge scbt_react
```
Now react client app is running in `http://localhost:3000`


---
If you want stop all the container.
```bash
$ docker stop $(docker ps -q)      # stop all running containers
$ docker rm $(docker ps -a -q)     # remove all exited containers
```
Clean the network and volumes
```bash
$ docker volume prune              # clean the volumes
$ docker network prune             # clean the networks
```