# Opentables
Opentables is a project aimed at creating a partial clone of the popular restaurant reservation website 'OpenTable.' OpenTable is widely known as a platform that enables users to discover and book reservations at restaurants. Its user-friendly interface, extensive restaurant database, and seamless booking process make it a standout in the online dining reservation industry.
# Live Link
https://open-tables.onrender.com
# Tech Stack

### Frameworks and Libraries
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" /><img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white"/><img src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" /><img src="https://img.shields.io/badge/Render-46E3B7.svg?style=for-the-badge&logo=Render&logoColor=white" /><img src="https://img.shields.io/badge/Jinja-B41717.svg?style=for-the-badge&logo=Jinja&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white" /><img src="https://img.shields.io/badge/Google%20Maps-4285F4?logo=googlemaps&logoColor=fff&style=for-the-badge" />

### Database
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=fff&style=for-the-badge"/>

### Hosting:
<img src="https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=000&style=for-the-badge" />


## Index
[Feature List](https://github.com/colinsung0714/opentables/wiki/Features) |
[Database Scheme](https://github.com/colinsung0714/opentables/wiki/Database-Schema-and-Backend-Routes) |
[User Stories](https://github.com/colinsung0714/opentables/wiki/User-Stories-and-Future-Implementations) |
[Wireframes](https://github.com/colinsung0714/opentables/wiki/Wireframes)

## Landing Page
![image](https://github.com/colinsung0714/opentables/assets/99006739/95d0c21f-f2be-4f0e-abc6-42fa5ba7884e)

## Restaurant Detail Page
![image](https://github.com/colinsung0714/opentables/assets/99006739/fce8e140-e15f-4de3-921e-f69c0fff0f12)

## Reservation Page
![image](https://github.com/colinsung0714/opentables/assets/99006739/92a46e3c-654a-4fd4-9665-0cfc6cfb7feb)

## Getting started
1. Clone this repository:
    * `https://github.com/colinsung0714/opentables.git`

2. Install dependencies into the Backend by running the following:
    * `pipenv install`

3. Install dependencies into the Frontend by cd into `react-app` and running the following:
    * `npm install`

4. Create a **.env** file using the **.envexample** provided

5. Set up your database with information from your .env and then run the following to create your database, migrate, and seed:
    * `pipenv run flask db migrate`
    * `pipenv run flask db upgrade`
    * `pipenv run flask seed all`


6. Start the app for backend using:
    * `pipenv run flask run`

7. Start the app for frontend by cd into `react-app` and running:
    * `npm start`

8. Now you can use the `Demo User` button to log in or Create an account

***

# Features

## Restaurant
Logged-in Users can
* add a restaurant
* read/view other user's restaurants
* update their restaurants
* delete their restaurants

## Reservation
Logged-in Users can
* create a reservation
* read/view previous reservation
* update their reservations
* delete their reservations

## Comments
Logged-in Users can
* post a comment for a restaurant under the restaurant detail page
* read/view other users' comments under restaurant detail page
* delete a comment posted by the logged-in user

## Menus
Logged-in Users can
* create a menu for their restaurants
* read/view menus for restaurants
* update menus and menu items
* delete menus and menu items
