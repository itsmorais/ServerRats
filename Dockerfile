# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install -g pm2 && npm install

# Copia o restante dos arquivos
COPY . .

# Compila o TypeScript
RUN npm run build

# Expõe a porta do servidor
EXPOSE 3333

# Comando para rodar a API com PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
