# FreeVoice.es Environment Variables

## Database Configuration

### For Development
```env
DATABASE_URL=postgres://freevoice:password@localhost:5432/freevoice-es
NODE_ENV=development
```

### For Production (Coolify/Docker)
```env
DATABASE_URL=postgres://username:password@host:port/database?sslmode=require
NODE_ENV=production
```

### SSL Configuration Options

If you're getting SSL certificate verification errors, try these DATABASE_URL variations:

1. **Force SSL with certificate verification disabled:**
   ```
   postgres://username:password@host:port/database?sslmode=require&sslcert=&sslkey=&sslrootcert=
   ```

2. **SSL preferred but not required:**
   ```
   postgres://username:password@host:port/database?sslmode=prefer
   ```

3. **SSL required but skip certificate verification:**
   ```
   postgres://username:password@host:port/database?sslmode=require&sslcert=&sslkey=&sslrootcert=&ssl=true
   ```

## Common SSL Issues and Solutions

### Issue: "unable to verify the first certificate"
**Solution:** The SSL configuration in `lib/database.ts` is designed to handle this by setting `rejectUnauthorized: false`

### Issue: "ENOTFOUND" or connection timeout
**Solution:** Check if your database host is accessible from your deployment environment

### Issue: "password authentication failed"
**Solution:** Verify your database credentials in the DATABASE_URL

## Testing Database Connection

Run this script to test your database connection:
```bash
node scripts/test-db-connection.js
```

## Admin Access

Default admin credentials:
- Email: `xk7m9p@freevoice.es`
- Password: `K9mR7nQ2vX8pL5wY`

**Important:** Change these credentials in production!

## Environment Variables Checklist for Coolify

✅ `DATABASE_URL` - Your PostgreSQL connection string  
✅ `NODE_ENV=production`  
✅ `NEXT_TELEMETRY_DISABLED=1` (optional)  

## Troubleshooting SSL

1. Check if your PostgreSQL provider requires specific SSL settings
2. Try different `sslmode` values in your DATABASE_URL
3. Verify that your database actually supports SSL connections
4. Check if your hosting provider has specific SSL requirements