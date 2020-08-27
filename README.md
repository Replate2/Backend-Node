# Backend-Node

Base URL: https://thereplate2.herokuapp.com/
------------------------------------------------------------------
Auth Routes: /api/auth/register && /api/auth/login

|Table|	Method|	Endpoint	        |Description                 |
|-----|-------|-------------------|------------------------------|
|users|	POST	|/api/auth/register	|registers a new user        |
|users|	POST	|/api/auth/login	| logs in if already registered  |

Register
-------------------------------------------------------------------
HTTP Method: [POST] (registers new users)

URL: /api/auth/register 

Headers

|Name	         |Type	   |Required	 |Description             |
|--------------|---------|-----------|----------------------------|
|Content-Type	 |String	 |Yes	       |Must be application/JSON    |
|Authorization |String	 |no	       |                            |

Request Body

|Name	    |Type	  |Required	|Description.      |
|---------|-------|---------|------------------|
|Username	|String	|Yes	    | Must be unique.  |
|password	|String	|Yes	    | Must be unique.  |

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

|Name	         |Type	   |Required	 |Description                 |
|--------------|---------|-----------|----------------------------|
|Content-Type	 |String	 |Yes	       |Must be application/JSON    |
|Authorization |String	 |Yes	       |JSON Web Token              |


Request Body

|Name	    |Type	  |Required	|Description.                                      |
|---------|-------|---------|--------------------------------------------------|
|Username	|String	|Yes	    | Must match username in database                  |
|password	|String	|Yes	    | Must match password associated with the username |

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

|Name	         |Type	   |Required	 |Description                 |
|--------------|---------|-----------|----------------------------|
|Content-Type	 |String	 |Yes	       |Must be application/JSON    |
|Authorization |String	 |Yes	       |JSON Web Token              |

example
```
    {
        "id": 1,
        "username": "lambda",
        "password": "$2a$08$wQy9IMpfg9nEmJkX1nyV6uJysN7w.SItF.MWLmeQDVk77LbpgVBFi",
        "role-id": null
    }

```
Responses
- status code [200] (successful to get  list of users )
- status code [500] (server or database error)

https://documenter.getpostman.com/view/12184518/TVCb3q61
