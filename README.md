# HellHoleIO
A CDN Storage website that mimics filesharing/ storing on the web. Authenticates users using Passport.js with Express backend and Postgres Database. 
# Authentication
Hellhole IO works by having a user either Login or Signup for an account. This account is rudimentary but can be modified further in the Prisma Schema.
# Buckets
The main storage system implemented within HellHole IO is the bucket management system. Its a simple design, where a bucket may hold several other folders or files. My bucket files are managed/ hosted on Cloudinary. Simply add en environment variable API_ENVIRONMENTAL_VARIABLE= <Your Key> to link the main driver of this web application.
# File Upload
The files being uploaded are mostly meant to be images from {.jpg,.png, .bitmap, .gif} or text files. For larger file sizes it will be in your interest to increase or choose a different CDN service.
