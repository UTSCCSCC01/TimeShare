**Create Profile**
----
  Attempts to create a profile. Returns validation errors if any, otherwise the newly created object.

* **URL**

  /api/Profiles/

* **Method:**
  
  `GET`

* **Protected:**

  No

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
  - Year of study too high or too low

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

**Update Profile**
----
  Attempts to update a profile. Returns validation errors if any, otherwise the newly created object.

* **URL**

  /api/Profiles/

* **Method:**
  
  `PUT`

* **Protected:**

  Yes
  
*  **URL Params**

   None

* **Data Params**

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
        "first_name": "new first name",
        "last_name": "new last name",
        "program": "new program",
        "year_of_study": 3,
        "phone": "4373459802",
        "description": "I'm a third year cs student!"
    }
    ```
 
* **Error Response:**

  See authentication
  
  The endpoint may also face validation errors:
  - Phone number not in correct format
  - User ID is invalid format
  - User ID is already in use for another profile
  - Description too long
  - Year of study too high or too low

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    { "errors" : {
            "phone" : ["Bad phone format!"]
            "description" : ["Description too long!"]
        } 
    }
    ```


**Get Public Profile**
----
  Attempts to retrieve public info about profile
* **URL**

  /api/Profiles/<username>

* **Method:**
  
  `GET`

* **Protected:**

  No
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "_id": "6231212d0b5e24ccad62e62d",
      "user": "6231212d0b5e24ccad62e62c",
      "first_name": "",
      "last_name": "",
      "program": "",
      "year_of_study": null,
      "phone": "",
      "description": "",
      "posts": [],
      "comments": [],
      "likes_posts": [],
      "__v": 0,
      "public_groups": []
    }
    ```
 
* **Error Response:**
  
  username does not correspond to a user

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    { "errors": {
        "user": [
          "User with given username doesn't exist!"
        ]
    }
    ```


**Get Private Profile**
----
  Attempts to retrieve all info about profile
* **URL**

  /api/Profiles/

* **Method:**
  
  `GET`

* **Protected:**

  Yes
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "_id": "6231212d0b5e24ccad62e62d",
      "user": "6231212d0b5e24ccad62e62c",
      "first_name": "",
      "last_name": "",
      "program": "",
      "year_of_study": null,
      "phone": "",
      "description": "",
      "posts": [],
      "comments": [],
      "likes_posts": [],
      "__v": 0,
      "public_groups": [],
      "private_groups": []
    }
    ```
 
* **Error Response:**

  See authentication



**Update Profile Avatar**
----
  Attempts to upload an avatar and update the profile avatar to the uploaded image
* **URL**

  /api/Profiles/avatar

* **Method:**
  
  `PUT`

* **Protected:**

  Yes
  
*  **URL Params**

  None

* **Data Params**

  **Required**
  Avatar: Image to use

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "data": {
          "name": "Capture.PNG",
          "size": 241984
      }
    }
    ```
 
* **Error Response:**

  * **Reason:** Avatar not a file / avatar field not given 
    **Code:** 400 <br />
    **Content:** 
    ```
    { "errors": {
        "avatar": [
          "avatar not uploaded!"
        ]
    }
    ```
    
  See authentication