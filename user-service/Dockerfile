FROM node:14

ARG JWT_SECRET
ARG CLOUDANT_API_KEY
ENV JWT_SECRET=$JWT_SECRET
ENV CLOUDANT_API_KEY=$CLOUDANT_API_KEY

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "broker.js"]
