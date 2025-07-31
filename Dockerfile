# --- Tahap 1: Instal Dependensi ---
# Menggunakan image Node.js Alpine yang lebih kecil
FROM node:22-alpine AS deps

# Atur direktori kerja
WORKDIR /app

# Salin package.json dan pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instal pnpm secara global di tahap 'deps'
RUN npm install -g pnpm

# Instal SEMUA dependensi (termasuk devDependencies)
# Ini penting agar alat build seperti PostCSS dan lainnya tersedia
RUN pnpm install --frozen-lockfile

# --- Tahap 2: Build Aplikasi Next.js ---
FROM node:22-alpine AS builder

# Atur direktori kerja
WORKDIR /app

# Salin package.json dan pnpm-lock.yaml lagi.
# Ini penting untuk memastikan pnpm install di tahap builder menggunakan cache yang benar
COPY package.json pnpm-lock.yaml ./

# Instal pnpm secara global di tahap 'builder'
RUN npm install -g pnpm

# Instal kembali semua dependensi di tahap builder.
# Ini adalah solusi umum untuk masalah resolusi modul pnpm/Docker selama build,
# memastikan semua dependensi terhubung dengan benar dalam konteks build ini.
RUN pnpm install --frozen-lockfile

# Salin sisa kode aplikasi, termasuk postcss.config.js, tailwind.config.js, dan global CSS
COPY . .

# --- DEBUG: Verifikasi keberadaan @tailwindcss/postcss ---
# Baris ini akan menampilkan apakah modul tersebut ada di node_modules
RUN echo "--- Verifying @tailwindcss/postcss in builder stage after re-install ---"
RUN ls -l node_modules/@tailwindcss/postcss || echo "@tailwindcss/postcss not found!"
RUN echo "----------------------------------------------------"

# Pastikan output Next.js disetel ke 'standalone' di next.config.js
# module.exports = {
#   output: 'standalone',
# }
# Ini akan membuat folder .next/standalone yang berisi semua yang dibutuhkan untuk menjalankan aplikasi
RUN pnpm run build

# --- Tahap 3: Final Image Produksi ---
FROM node:22-alpine AS runner

# Buat user non-root untuk keamanan
# Memisahkan perintah addgroup dan adduser untuk memastikan grup dibuat sebelum user ditambahkan
RUN addgroup --system appgroup
RUN adduser --system --ingroup appgroup appuser
USER appuser

# Atur direktori kerja ke folder standalone yang dibuat oleh Next.js
# Ini adalah inti dari strategi standalone
WORKDIR /app

# Salin folder standalone dari tahap builder
# Folder ini sudah berisi node_modules yang dibutuhkan dan file .next
COPY --from=builder --chown=appuser:appgroup /app/.next/standalone ./

# Salin folder public dari tahap builder
# Ini berisi aset statis seperti gambar, dll.
COPY --from=builder --chown=appuser:appgroup /app/public ./public

# Ekspos port default Next.js
EXPOSE 3000

# Perintah untuk menjalankan aplikasi Next.js
# Next.js akan secara otomatis menemukan file yang dibutuhkan di folder standalone
CMD ["node", "server.js"]
