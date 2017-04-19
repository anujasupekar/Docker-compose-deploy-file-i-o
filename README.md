### DevOps

#### Docker compose

1. create 3 Dockerfiles for setting up redis, proxy(proxy-container) and the HW3(devops-hw3) app container. 
2. create docker-compose.yml file which will build image for proxy and HW3 app, run container and orchestrate the ports respectively for the redis, proxy and HW3 app. It also links the proxy and HW3 app with the redis container.
3.  run "docker-compose build" to run docker-compose.yml file and build the images.
4.  run "docker-compose up" to run the containers.
4.  The "docker ps" command will show the 3 containers created.
5.  Demonstrate the proxy server. 
6.  run "node infrastructure.js" which spawns new containers. We push it to a redis queue 'spawnedservers'. We can verify the      creation by 'docker ps' and by accepting requests at the servers.

[Screencast for Docker Compose](https://youtu.be/cgeqO50LySI)


#### Docker Deploy 

1. Run a private docker registry in port 5000
2. post-receive file (under part2/blue and part2/green) added in green.git/hooks and blue.git/hooks.
3. Make changes in the App and push to green or blue repo.
4. On git push, post-receive hook will be invoked and following steps are executed,
    i. Build a new docker image named "green-app"
    ii. Tag the image to localhost:5000/green:latest
    iii. Push it to the local registry
    iv. Pull the image from the local registry
    v. Stop and remove any instances of green-app
    vi. Delete the image at localhost:5000/green:current
    vii. Tag the latest image to the current image
    viii. Deploy this image with the name green-app and map its port 8080 to 50501.
5. The above steps are executed in the post-receive file of blue-app
6. To verify the working, we will make some changes to the app and push it to green or blue repo (git push green master/ git push blue master)and verify if the respective docker files are built and deployed.

[Screencast for Docker Deploy](https://youtu.be/DuQcWvdkmFw)


#### File IO 

1. Created a container that runs a command that outputs to a file which is named as the send-container
2. The Dockerfile for this container uses socat to map file access to read file container and expose over port 9001
3. We create a linked container named receive-container that accesses that file over network. 
4. The dockerfile for this linked container uses a command such as curl to access data from other container.
Steps:
1. Build send-container: docker build -t send-container .
2. Run send-container: docker run -d --name send-container send-container
3. Build receive-container: docker build -t receive-container .
4. Link receive-container: docker run -it --rm --name receive-container --link send-container:send-container receive-container
5. The content of the file from send-container is displayed.

[Screencast for File I/O](https://youtu.be/Xey2w-iz4j0)
