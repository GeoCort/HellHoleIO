# HellHoleIO
A CDN Storage website that mimics filesharing/ storing on the web. Authenticates users using Passport.js with Express backend and Postgres Database. Done so for the Odin Project.
# Authentication
Hellhole IO works by having a user either Login or Signup for an account. This account is rudimentary but can be modified further in the Prisma Schema.
<img width="849" alt="Screenshot 2024-11-06 at 12 30 46 PM" src="https://github.com/user-attachments/assets/9bffa9f3-66e0-43cc-a0de-47c82ecb18d6">
# Buckets
The main storage system implemented within HellHole IO is the bucket management system. Its a simple design, where a bucket may hold several other folders or files. My bucket files are managed/ hosted on Cloudinary. Simply add en environment variable API_ENVIRONMENTAL_VARIABLE= <Your Key> to link the main driver of this web application.
## Origin
This is the main bucket of your application and will serve as the main data container for subfiles and folders. 
<img width="1073" alt="Screenshot 2024-11-06 at 12 46 38 PM" src="https://github.com/user-attachments/assets/b4cd6d9c-4203-4b50-bd41-2fe120c64a17">

# Create Folder
The files being uploaded are mostly meant to be images from {.jpg,.png, .bitmap, .gif} or text files. For larger file sizes it will be in your interest to increase or choose a different CDN service.
<img width="575" alt="Screenshot 2024-11-06 at 12 47 12 PM" src="https://github.com/user-attachments/assets/b641c343-5e24-43bb-ab15-f6d735922d19">
# Create File 
File creation is handled using Multer and the Cloudinary API service. Simply click on the file icon to be prompted for a file. 
# Navigation
Navigating through the folders is done so by hovering over the element. The file will download when clicked on. <img width="762" alt="Screenshot 2024-11-06 at 12 57 51 PM" src="https://github.com/user-attachments/assets/a7f3c2cf-8ed9-4d9f-b29b-0b511b6b829d">
