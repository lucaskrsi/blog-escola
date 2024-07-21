# Use uma imagem base oficial do Node.js
FROM node:18-alpine

# Instale ferramentas necessárias para compilar dependências nativas
RUN apk add --no-cache make gcc g++ python3 openssl

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos de dependências para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Reinstale bcrypt para garantir que ele seja compilado para a plataforma correta
RUN npm rebuild bcrypt

# Copie todo o código da aplicação para o contêiner
COPY . .

# Gere os binários do Prisma para a plataforma correta
RUN npx prisma generate

# Compilar o TypeScript
RUN npm run build

# Exponha a porta em que a aplicação será executada
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
