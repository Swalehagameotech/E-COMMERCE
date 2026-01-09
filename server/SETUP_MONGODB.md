# MongoDB Setup Instructions

## Option 1: Local MongoDB (MongoDB installed on your computer)

1. **Make sure MongoDB is installed and running**
   - Download from: https://www.mongodb.com/try/download/community
   - Or install via package manager

2. **Create `.env` file in the `server` directory**

   Copy `env.example` to `.env`:
   ```bash
   copy env.example .env
   ```

   Or manually create `.env` with:
   ```env
   DBURL=mongodb://localhost:27017/auth-app
   JWT_SECRET=my_super_secret_jwt_key_change_this_in_production
   PORT=5000
   NODE_ENV=development
   ```

3. **Start MongoDB** (if not already running):
   - Windows: MongoDB should start automatically as a service
   - Or run: `mongod` in a terminal

## Option 2: MongoDB Atlas (Cloud - Recommended for beginners)

1. **Create a free account** at https://www.mongodb.com/cloud/atlas/register

2. **Create a new cluster** (choose free tier)

3. **Get your connection string**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It will look like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

4. **Replace placeholders**:
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add database name: `/auth-app?retryWrites=true&w=majority`

5. **Create `.env` file**:
   ```env
   DBURL=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/auth-app?retryWrites=true&w=majority
   JWT_SECRET=my_super_secret_jwt_key_change_this_in_production
   PORT=5000
   NODE_ENV=development
   ```

6. **Whitelist your IP**:
   - In MongoDB Atlas, go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your specific IP

## Troubleshooting

**Error: `querySrv ENOTFOUND`**
- Your connection string format is incorrect
- Make sure it starts with `mongodb://` (local) or `mongodb+srv://` (Atlas)
- Check there are no extra spaces or characters

**Error: `authentication failed`**
- Check your username and password are correct
- For Atlas, make sure you created a database user

**Error: `connection timeout`**
- Make sure MongoDB is running (local)
- Check your internet connection (Atlas)
- Verify your IP is whitelisted (Atlas)

## Quick Test

After creating your `.env` file, start the server:
```bash
npm start
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
```
