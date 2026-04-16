# ============ STAGE 1 : Build ============
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Copier les fichiers de dependances
COPY package*.json ./

# 2. Installer TOUTES les dependances (y compris dev, pour compiler)
RUN npm install

# 3. Copier le code source et le schema Prisma
COPY . .
COPY prisma/ ./prisma

# 4. Generer le client Prisma
RUN npx prisma generate

# 5. Compiler TypeScript
RUN npm run build

# ============ STAGE 2 : Production ============
FROM node:20-alpine

WORKDIR /app

# 6. Copier les fichiers de dependances
COPY package*.json ./

# 7. Installer UNIQUEMENT les dependances de production
RUN npm install --only=production

# 8. Copier le client Prisma genere depuis le stage builder
COPY --from=builder /app/node_modules/prisma /app/node_modules/prisma
COPY --from=builder /app/node_modules/.bin/prisma /app/node_modules/.bin/prisma

# 9. Copier le code compile et le schema
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/docs ./docs

# 10. Exposer le port
EXPOSE 5000

# 11. Commande de demarrage
CMD ["node", "dist/api/server.js"]