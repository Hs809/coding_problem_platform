   
FROM node:18-alpine
WORKDIR /app
COPY . /app
RUN npm install --production
CMD ["node", "index.js"]
EXPOSE 8000