FROM        ubuntu:14.04

# Install Node.js and npm
RUN     sudo apt-get update
RUN 	sudo apt-get install -y nodejs
RUN     sudo apt-get install -y npm
RUN 	sudo ln -s /usr/bin/nodejs /usr/bin/node

# Bundle app source
COPY . /src
# Install app dependencies
RUN cd /src; npm install
RUN  echo $PATH
#RUN  node /src/main.js 8080

EXPOSE 3000 
CMD ["node", "/src/main1.js"]
