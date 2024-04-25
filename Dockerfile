FROM node:18

LABEL NAME="Mauricio"


WORKDIR /app

COPY . . 


RUN npm install