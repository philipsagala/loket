# Project Development Assumption

Installation, setup, and settings is written in README.md

I decide to change the endpoint of each Web Service API, the changes become like this:

Endpoint | Relative Path | Method | Description 
---|---|---|---
Get all location | /location | GET | Endpoint to get all available location 
Get specific location by ID | /location/:id| GET| Get specific location by ID 
Create location | /location| POST | Endpoint to create new location 
Update location | /location | PUT | Endpoint to update location 
Get all Event | /event | GET | Endpoint to get all event 
Get Event | /event/:id | GET | Endpoint to retrieve event information, Including location data and ticket data. :id = eventId 
Create Event | /event/:id | POST | Endpoint to create new event. :id = locationId 
Update event | /event/:id | PUT | Endpoint to update event. :id = eventId 
Create Ticket | /ticket/:id | POST | Endpoint to create new ticket type on one specific event. :id = eventId 
Transaction Detail | /transaction/:id | GET | Endpoint to retrieve transaction created using endpoint purchase ticket and endpoint create transaction 
Transaction Create | /transaction | POST | Endpoint to create transaction with status "Awaiting Payment" 
Purchase Ticket | /transaction/purchase/:id | POST | Endpoint to make a new purchase for each transaction. 

### My Suggestion

 - Since there is requirement to remove any authentication and also there is another section mentioning customer on each transaction, I decide to remove customer data from the application but on every transaction I still prevent the user to make order with multiple event.
 - I simplify the relative path with only use  single segment url, because there is no multiple get or post for each step. The only double POST method only on transaction 
