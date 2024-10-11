Car Rental Management API
This project is a car rental management API built with Next.js, Node.js, Prisma, and TypeScript. The API allows users to view available cars, book cars for specified periods, and manage their reservations. It implements strict business rules to ensure confidentiality, car availability, and reservation date validity.

Table of Contents
Business Context
Business Rules
API Endpoints
Technologies Used
Project Structure
Installation
Running the Application
Database Setup
Testing
Contributing
License
Business Context
This project simulates a car rental service where users can:

View available cars.
Make, edit, or cancel car reservations.
Ensure they can only view and modify their own reservations.
Business Rules
Confidentiality of Reservations: Users can only view their own reservations.
Car Availability: A car cannot be booked by multiple users for overlapping periods.
Validity of Reservation Dates: The reservation end date must not precede the start date.
API Endpoints
Authentication
All API requests must include a JWT token in the Authorization header.
Car Endpoints
GET /api/cars: Returns a list of all available cars.
GET /api/cars/{id}: Provides the details of a specific car.
Reservation Endpoints
POST /api/reservations: Allows users to create a new reservation (requires car ID, start, and end dates).
GET /api/users/{id}/reservations: Retrieves a list of reservations for the authenticated user.
PUT /api/reservations/{id}: Allows users to modify an existing reservation.
GET /api/reservations/duration: Returns a list of reservations with the duration of each reservation in days.
GET /api/users/reservations-summary: Returns a summary of users with the total number of reservations and total reservation durations.
Technologies Used
Next.js (App Router for front-end framework)
Node.js (Back-end)
Prisma (ORM and database management)
TypeScript (For strict code typing)
Axios or Fetch API (for API requests)


You will need to create a ".env" file in the "api" folder and populate it with the following content:

PORT=5000
ACCESS_TOKEN_SECRET='YOUR_ACCESS_TOKEN'
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"

Replace "user" with your database username, "password" with your database password, and "db_name" with your database name.

******************************
Here is how you can start the app on your local server :
To start the app on your local server:

Navigate to the "api" directory, install the node dependencies using npm i, then run tsc, and finally run node dist/index.js to launch and start your database.

Open a new terminal, navigate to the "frontend" directory, install dependencies using npm i, and run "npm run dev" to launch your frontend server at http://localhost:3000.
Visit http://localhost:3000 to see the app in action.

******************
here are three 3 admin accounts that you can use to access the app as an admin:
++admin 1 Infos : 
email: admin1@example.com
password : AdminPassword123!
++admin 2 infos : 
email : admin2@example.com
password : ywTvhMNqUyWAZRd#
++admin 3 Infos : 
email: admin3@example.com
password : *d+$5Ks4aWGKdy92!

To seed the database with the admin accounts, follow these steps:

Ensure your database server is running and accessible.

In your terminal, navigate to the "api" directory of your project.

Run the seeding command:
npm run seed
This command will execute the script configured to insert predefined data, including the admin accounts, into your database.

Once the seeding process completes successfully, you can use one of the admin accounts' credentials mentioned above to log in to the app:

**************
here are some screenshots of the app UI : 

https://ibb.co/7r9dN1T
https://ibb.co/rc6KB0R
https://ibb.co/Xz3HMVT
https://ibb.co/9n4yLXg
https://ibb.co/fFpHYWM
https://ibb.co/k8j75ZV
