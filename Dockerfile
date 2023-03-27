# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
# COPY package.json ./
# RUN yarn install --frozen-lockfile

# If using npm with a `package-lock.json` comment out above and use below instead
COPY package.json package-lock.json ./ 
RUN npm ci

# Rebuild the source code only when needed
FROM node:16-alpine AS runner
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000

ENV PORT 3000
ENV WATCHPACK_POLLING true

CMD [ "npm", "run", "dev" ]