# Backend-Node

Base URL: https://thereplate2.herokuapp.com/
------------------------------------------------------------------
Auth Routes: /api/auth/register && /api/auth/login
__________________________________________________________________
|Table|	Method|	Endpoint	        |Description                    |
|_____|_______|___________________|_______________________________|
|users|	POST	|/api/auth/register	|registers a new user           |
|_____|_______|___________________|_______________________________|
|users|	POST	|/api/auth/login	  | logs in if already registered |
|_____|_______|___________________|_______________________________|

Register
-------------------------------------------------------------------
HTTP Method: [POST] (registers new users)

URL: /api/auth/register 

Headers
 _________________________________________________________________
|Name	         |Type	   |Required	 |Description                 |
|______________|_________|___________|____________________________|
|Content-Type	 |String	 |Yes	       |Must be application/JSON    |
|______________|_________|___________|____________________________|
|Authorization |String	 |no	       |                            |
|______________|_________|___________|____________________________|

Request Body
 ______________________________________________
|Name	    |Type	  |Required	|Description.      |
|_________|_______|_________|__________________|
|Username	|String	|Yes	    | Must be unique.  |
|_________|_______|_________|__________________|
|password	|String	|Yes	    | Must be unique.  |
|_________|_______|_________|__________________|

Example
    {
        "username": "one",
        "password": "one"
    }
    
Responses

status code [201] (Successfully registered a new user )
status code [400] (missing username or password or username password requirement not met)
status code [500] (server or database error)

Login
-----------------------------------------------------------------------------------------
HTTP Method: [POST],

URL: /api/auth/login

Headers
 _________________________________________________________________
|Name	         |Type	   |Required	 |Description                 |
|______________|_________|___________|____________________________|
|Content-Type	 |String	 |Yes	       |Must be application/JSON    |
|______________|_________|___________|____________________________|
|Authorization |String	 |Yes	       |JSON Web Token              |
|______________|_________|___________|____________________________|


Request Body

 ______________________________________________________________________________
|Name	    |Type	  |Required	|Description.                                      |
|_________|_______|_________|__________________________________________________|
|Username	|String	|Yes	    | Must match username in database                  |
|_________|_______|_________|__________________________________________________|
|password	|String	|Yes	    | Must match password associated with the username |
|_________|_______|_________|__________________________________________________|

Example
    {
        "username": "one",
        "password": "one"
    }

Responses
---------------------------------------------------------------------
.status code [200] (welcome you are logged in )
.status code [400] (missing username or password )
.status code [401] (incorrect username or password )
.status code [500] (server or database error)

user
HTTP Method: [GET] (allow us to get list of users)

URL: /api/users

Headers

 _________________________________________________________________
|Name	         |Type	   |Required	 |Description                 |
|______________|_________|___________|____________________________|
|Content-Type	 |String	 |Yes	       |Must be application/JSON    |
|______________|_________|___________|____________________________|
|Authorization |String	 |Yes	       |JSON Web Token              |
|______________|_________|___________|____________________________|

example
```
    {
        "id": 1,
        "username": "lambda",
        "password": "$2a$08$wQy9IMpfg9nEmJkX1nyV6uJysN7w.SItF.MWLmeQDVk77LbpgVBFi",
        "role_id": null
    }

```
Responses
- status code [200] (successful to get  list of users )
- status code [500] (server or database error)

https://documenter.getpostman.com/view/12184518/TVCb3q61
