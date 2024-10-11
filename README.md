Car Rental Management API
This project is a car rental management API built with Next.js, Node.js, Prisma, and TypeScript. The API allows users to view available cars, book cars for specified periods, and manage their reservations. It implements strict business rules to ensure confidentiality, car availability, and reservation date validity.

Table of Contents

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
Node.js and Express (Back-end)
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

![Screenshot (885)](https://github.com/user-attachments/assets/eb665d27-29d7-424c-9a8d-1c6e2523703a)


![Screenshot (886)](https://github.com/user-attachments/assets/6d850394-34ac-4934-a210-47fc889a5bbb)
![Screenshot (887)](https://github.com/user-attachments/assets/41107ed2-6c92-4226-be06-07c65e46114d)
![Screenshot (891)](https://github.com/user-attachments/assets/e75782dc-889b-4d04-a14a-f5ec44e3ff9f)
![Screenshot (892)](https://github.com/user-attachments/assets/656651d8-ad1d-4247-bf57-c3d7f5819da3)
![Screenshot (893)](https://github.com/user-attachments/assets/c9e5e259-c999-43fd-80ac-993ac78a41d1)
![Screenshot (894)](https://github.com/user-attachments/assets/3fdfc4d9-8cff-4f98-b759-3b91c64cee6a)
![Screenshot (895)](https://github.com/user-attachments/assets/78b1bea2-0003-4d2a-aa0c-70ae1af5902f)
![Screenshot (877)](https://github.com/user-attachments/assets/44053f14-238d-43ed-842f-e89a8d4fe3ef)
![Screenshot (878)](https://github.com/user-attachments/assets/316c4b46-ab8b-47d3-87db-7e408c8f1811)
![Screenshot (879)](https://github.com/user-attachments/assets/6c11f46e-2bac-431e-a577-70653fea7a84)
![Screenshot (876)](https://github.com/user-attachments/assets/b7f4f93d-5711-4f27-8938-c0d13b2aadb7)
![Screenshot (875)](https://github.com/user-attachments/assets/a0d7a33c-9711-498b-ab29-fafe9eab4c7c)
![Screenshot (870)](https://github.com/user-attachments/assets/9686346f-3bb4-4678-ba95-3a2aca8a86e7)
















https://ibb.co/7r9dN1T
https://ibb.co/rc6KB0R
https://ibb.co/Xz3HMVT
https://ibb.co/9n4yLXg
https://ibb.co/fFpHYWM
https://ibb.co/k8j75ZV
