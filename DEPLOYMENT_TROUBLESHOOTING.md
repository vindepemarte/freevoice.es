# FreeVoice.es Environment Variables

## Database Configuration (SSL DISABLED)

### For Development
```env
DATABASE_URL=postgres://freevoice:password@localhost:5432/freevoice-es?sslmode=disable
NODE_ENV=development
```

### For Production (Coolify/Docker) - SSL Disabled
```env
DATABASE_URL=postgres://username:password@host:port/database?sslmode=disable
NODE_ENV=production
```

### Recommended DATABASE_URL Format for SSL-Disabled Setup

```
postgres://username:password@host:port/database?sslmode=disable
```

**Important**: Ensure your PostgreSQL server is configured to accept non-SSL connections.

## Common Connection Issues and Solutions

### Issue: "unable to verify the first certificate" (RESOLVED)
**Solution:** SSL has been disabled in the application configuration. This error should no longer occur.

### Issue: "ENOTFOUND" or connection timeout
**Solution:** Check if your database host is accessible from your deployment environment

### Issue: "password authentication failed"
**Solution:** Verify your database credentials in the DATABASE_URL

### Issue: "server does not support SSL connections"
**Solution:** This is expected when SSL is disabled. The application is configured to work without SSL.

## Database Setup After Deployment

If you get the error `relation "admin_users" does not exist`, it means your database needs to be initialized.

### Option 1: Using the Setup API Endpoint (Recommended for production)

1. **Make a POST request to your deployed app**:
   ```bash
   curl -X POST https://your-app-url.com/api/setup-database \
     -H "Content-Type: application/json" \
     -d '{"setupKey": "freevoice-setup-2025"}'
   ```

2. **Or use your browser** to navigate to:
   ```
   https://your-app-url.com/api/setup-database
   ```
   Then send a POST request with the setup key.

### Option 2: Using the Setup Script (Local/Development)

```bash
node scripts/setup-db.js
```

## Admin Access

Default admin credentials:
- Email: `xk7m9p@freevoice.es`
- Password: `K9mR7nQ2vX8pL5wY`

**Important:** Change these credentials in production!

## Environment Variables Checklist for Coolify

✅ `DATABASE_URL` - Your PostgreSQL connection string with `?sslmode=disable`  
✅ `NODE_ENV=production`  
✅ `NEXT_TELEMETRY_DISABLED=1` (optional)  

## Troubleshooting Database Connection

1. **Verify your DATABASE_URL includes `?sslmode=disable`**
2. **Check that your PostgreSQL server accepts non-SSL connections**
3. **Test connection using the test script:**
   ```bash
   node scripts/test-db-connection.js
   ```
4. **Check deployment logs for database connection debug output**

## Security Considerations

**Note**: With SSL disabled, database communications are not encrypted. Ensure your database network is secure:
- Use private networks when possible
- Restrict database access by IP
- Use strong authentication credentials
- Consider VPN or other network-level security