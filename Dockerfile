
# 1. TEMEL IMAGE (BUILD AŞAMASI)
FROM node:20-alpine AS builder
WORKDIR /app

# Paket dosyalarını kopyala
COPY package.json package-lock.json ./


RUN npm install

# Kaynak kodları kopyala
COPY . .

# Build işlemini yap
# Not: Firebase env'leri build sırasında gerekebilir, 
# ancak standalone modda genelde runtime'da alınır.
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 2. ÜRETİM IMAGE (RUN AŞAMASI)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Kullanıcı oluştur (Güvenlik için root kullanmıyoruz)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Sadece gerekli standalone dosyalarını kopyala (Görüntü boyutunu %90 küçültür)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Next.js standalone server 3000 portunda çalışır
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
