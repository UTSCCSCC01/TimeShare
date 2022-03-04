**Login User**
----
  Attempts to login a user.

* **URL**

  /api/User/login

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:**
   
   `username=[String]`
   `password=[String]`

* **Data Params**

  None

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
        "_id": "6219747368ac5a8823eb92e4",
        "user": "6205b3ed031c87d276fa2410",
        "first_name": "im a user",
        "last_name": "With this last name",
        "program": "computer science",
        "year_of_study": 3,
        "phone": "4373459802",
        "description": "I'm a third year cs student!"
    }
    ```
 
* **Error Response:**

  username not provided

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
         "errors" : {
             "user": ["User id not provided!"],
         }
    }
    ```

  password not provided

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
         "errors" : {
             "password": ["Password not provided!"],
         }
    }
    ```
  
  uID/password does not correspond to a user

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    { "errors" : {
            "user" : ["User with given ID doesn't exist!"],
            "password": ["Username or password is incorrect!"]
        } 
    }
    ```


**Create User**
----
  Attempts to create a user.

* **URL**

  /api/User/create

* **Method:**
  
  `POST`
  
*  **URL Params**

   **Required:**
   
   `username=[objectID]`
   `password=[objectID]`

* **Data Params**
     
    `useremail=[objectID]`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
        "_id": "6219747368ac5a8823eb92e4",
        "user": "6205b3ed031c87d276fa2410",
        "first_name": "im a user",
        "last_name": "With this last name",
        "program": "computer science",
        "year_of_study": 3,
        "phone": "4373459802",
        "description": "I'm a third year cs student!"
    }
    ```
 
* **Error Response:**

  username not provided

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
         "errors" : {
             "profile": ["Username not provided!"]
         }
    }
    ```

  password not provided

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
         "errors" : {
             "profile": ["Password not provided!"]
         }
    }
    ```