## Running the Project

You can run the full setup—including cleanup, install, migrations, seeding, and starting the dev server—by copying and pasting the following commands for your operating system.

# Setup Instructions


To get started, open your terminal and run the following commands in sequence. Each command is explained below:

### 1. Remove the existing database file (if any)
This command deletes the existing `db.sqlite` file, ensuring that you are working with a fresh database.

### In Linux / MacOs
```bash
rm -f drizzle/db.sqlite
```

### In Windows
```bash
del drizzle\db.sqlite
```

### 2. Install project dependencies
This command installs all the necessary packages listed in your package.json file.

```bash
npm install
```

### 3. Generate migrations
Use drizzle-kit to generate database migrations.

```bash
npx drizzle-kit generate
```

### 4. Push migrations
Apply the generated migrations to your database.

```bash
npx drizzle-kit push
```

### 5. Seed the database
Run this command to seed the database with initial data.

```bash
npx tsx ./src/db/seed.ts
```

### 6. Start the development server
Finally, start the development server to begin working on the project.

```bash
npm run dev
```
