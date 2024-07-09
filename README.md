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

here are some screenshots of the app UI : 

https://ibb.co/7r9dN1T
https://ibb.co/rc6KB0R
https://ibb.co/Xz3HMVT
https://ibb.co/9n4yLXg
https://ibb.co/fFpHYWM
https://ibb.co/k8j75ZV
