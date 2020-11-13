# PartTimeYHacks
Link: https://devpost.com/software/parttime-t0pw5v/edit
[![Alt text for your video](https://youtu.be/RDVIr2OVIcM)](https://youtu.be/RDVIr2OVIcM)
## Inspiration
Our video is in the attached google drive folder link at the bottom if the youtube link in devpost isn't loading.

Our inspiration for this project came from noticing the struggle of finding work during the pandemic. There are many small businesses that are looking for people to fill part-time positions and there are many people who do not know where to find these positions. Being a part of several local Facebook pages, most people have resorted to posting on Facebook to look to fill available part-time opportunities. However, it can be quite tedious sifting through hundreds of Facebook comments so our app, PartTime, offers an easy and accessible solution! Similarly, employers have found it difficult to find new employees to fill positions that they need.  This has been especially problematic for companies who have had increased workloads through the pandemic, as certain industries are still high in demand and these companies can’t source the necessary manpower to meet the demand.

## What it does
Our project provides an easy way for both small businesses to find part-time employees and for unemployed workers to find part-time positions. On a high level, employers create job listings through the app, and then users can go through job listings in a fashion similar to tinder, swiping left to ignore a job listing and swiping right to instantly apply for a job listing. The employers are then able to check the app and see basic information about applicants including their resume and contact information so that they can contact the applicants they are interested in to move further down the application process. Applicants are also able to look back at listings that they’ve applied for. 


## How I built it
On the frontend, we used react  native and javascript to create various components each of which represent a different view on the application. We integrated the frontend with the backend storage management with certain buttons and while rendering the view, the backend will continuously send data in case there are any updates.
On the backend we used Firebase and Firestore to manage user authentication and data storage. Users and employer accounts both go through essentially the same sign-up and sign-in process, and we use this to our advantage by keeping track of the userIDs. For data storage, we have two separate parts, Firestore which keeps track of the basic information of employers and applicants and then Firebase Storage which handles the image and resume upload and download process. On Firestore, we have three collections, users, companies, and listings. For the users and companies collections, each applicant or company document is accessed by using their userID from the authentication. For the listings collection, there is an auto generated ID when a document is made, so we keep track of those.  For each user, basic information about them is stored including name, email, phone number, location, as well as which job listings they’ve swiped right to, applied for, and swiped left to, ignored. This way we ensure that they aren’t swiping on the same listings multiple times. For the companies collection, there is information about the company name, email, and then we keep track of all the job listings a company has created once again using the auto generated IDs. For the listings collection, each listing has information regarding the position title, compensation, employer, location, description, and it keeps track of all the people that have applied for the listing. 

## Challenges I ran into
We initially had issues retrieving data using Firebase of which were able to figure out most of.

## Accomplishments that I'm proud of
Completing a finished and function product!
Implementing the Google Geocoding API so that one’s location can be reverse geocoded into an address and a user can also type in an address as well that gets turned into a location.
Using Firebase and its Cloud Firestore and Storage for the database in our project. We had problems using it in our last hackathon and getting it to work this time was really satisfying!

## What I learned
We learned a lot about React-Native and using API’s as well as half of our team has never formally learned anything about IOS app development. It was a really enjoyable experience and taught us a lot.

## What's next for PartTime
Making the app look nicer and adding more functionality concerning images and profiles
Adding more data and more analysis with the Google Map API so that a company can see employees and their possible applicants to each of their locations visually. This might even call for a possible website counterpart to our app.
