# Book-Management-System

This is Book Record Management API based backend for the management of record and books

# Routes and Endpoints

## /users
POST: create new user
GET: get the list of all users

## /users/{id}    //This is Dynamic Route
GET: Get a user by id
PUT: Update a user detail by id
DELETE:  Delete a user by id(First check if he/she still has a issued book)(is there any fine to be paid)


## /users/subscription-details/{id}
GET: Get user subscription detail
1-Date of subscription
2-valid till
3-Fine if any

## /books
GET:Get all books
POST: Add a new book

## /books/{id}
GET:Get a book by id
PUT: Update a book by id


## /books/issued
GET: Get list of all issued books

## /bboks/issued/withFine
GET:Get all issued books with fine on them

# Subscription types

basic(3 months)
standard (6 months)
premium(12 month)


if the subscription date is 01/08/22
and the subscription type is standard 
then valid date will be till 01/02/23

if he has an issued book and book needs to be returned on 
01/01/23 and he missed the date of return it then he gets
a fine of Rs. 100


if he has an issued book and book needs to be returned on 
01/01/23 and he missed the date of return,and his subscription 
also expires then he will get fine of Rs. 200 






