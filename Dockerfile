FROM node:10
WORKDIR /code
RUN npm install
EXPOSE 7000
ENV DOCKER true
CMD ["npm", "run", "start:watch"]
