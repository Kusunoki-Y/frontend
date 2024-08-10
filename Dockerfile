FROM node:22
WORKDIR /workspace/frontend
COPY package.json package-lock.json ./
RUN npm install
CMD ["npm", "run", "dev"]