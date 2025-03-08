# Auth Service

## 🛠 Teknologi yang Digunakan
- **Express.js** - Framework backend untuk Node.js
- **Prisma** - ORM untuk manajemen database
- **TypeScript** - Superset JavaScript untuk penulisan kode yang lebih ketat
- **Joi** - Library untuk validasi input

## 🚀 Cara Menjalankan Proyek

### 1. Clone Repository
```sh
git clone <repository-url>
cd <nama-folder>
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Konfigurasi Environment
Buat file `.env` di root proyek dan tambahkan konfigurasi berikut:
```env
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=db_auth
DB_HOST=localhost
DB_DIALECT=mysql
DB_PORT=3306
DATABASE_URL=${DB_DIALECT}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}
NODE_LOCAL_PORT=3150
JWT_SECRET="AVERYSECRETjWTcoDE"
JWT_EXPIRED_IN="24"
ENVIRONMENT=dev
ALLOWED_ORIGINS=http://localhost:3000
```

### 4. Push Struktur Database ke Prisma
```sh
npx prisma db push
```

### 5. Menjalankan Server
```sh
npm run dev -- --service=rest
```





