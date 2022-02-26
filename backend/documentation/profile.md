**Create Profile**
----
  Attempts to create a profile. Returns validation errors if any, otherwise the newly created object.

* **URL**

  /api/Profiles/

* **Method:**
  
  `GET`
  
*  **URL Params**

   None

* **Data Params**

    **Required:**
 
   `uid=[objectID]`

   **Optional:**
 
   `first_name=[String]`

   `last_name=[String]`
   
   `program=[String]`
   
   `year_of_study=[Integer]`
   
   `phone=[String]`
   
   `desc=[String]`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
        "_id": "6219747368ac5a8823eb92e4",
        "user": "6205b3ed031c87d276fa2410",
        "first_name": "",
        "last_name": "",
        "program": "Computer Science",
        "year_of_study": 3,
        "phone": "4373459802",
        "description": "I'm a third year cs student!"
    }
    ```
 
* **Error Response:**

    User ID not an actual user

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    {
         "errors" : {
             "user": ["User with given ID does not exist!"]
         }
    }
    ```
  
  The endpoint may also face validation errors:
  - Phone number not in correct format
  - User ID is invalid format
  - User ID is already in use for another profile
  - Description too long

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    { "errors" : {
            "user" : ["Bad user ID!", "User can only have one profile!"],
            "phone" : ["Bad phone format!"]
            "description" : ["Description too long!"]
        } 
    }
    ```