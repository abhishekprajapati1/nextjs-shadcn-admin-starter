FROM node:20
WORKDIR /var/www/manage
RUN npm install -g pnpm
COPY package.json ./
RUN pnpm install    
COPY . .
RUN pnpm run build
EXPOSE 3333
CMD ["pnpm","run","start"]