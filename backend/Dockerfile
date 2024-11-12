FROM node:20-alpine AS builder

USER node
WORKDIR /backend

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npx prisma generate \
    && npm run build \
    && npm prune --omit=dev

FROM node:20-alpine

USER node
WORKDIR /backend

COPY --from=builder --chown=node:node /backend/package*.json ./
COPY --from=builder --chown=node:node /backend/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /backend/prisma/ ./prisma/
COPY --from=builder --chown=node:node /backend/dist/ ./dist/

CMD ["node", "dist/src/main.js"]