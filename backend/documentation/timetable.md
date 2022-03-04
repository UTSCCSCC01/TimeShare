**Create Timetable**
----
  Attempts to create a timetable. Returns validation errors if any, otherwise the newly created object.

* **URL**

  /api/Timetable/createTimetable

* **Method:**
  
  `POST`
  
*  **URL Params**

   None

* **Data Params**

    **Required:**
 
   `tid=[objectID]`

   **Optional:**
 
   `name=[String]`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
        "_id": "6219747368ac5a8823eb92e4",
        "name": "",
    }
    ```
 
* **Error Response:**

    Timetable ID already exists

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
         "errors" : {
             "_id": "6219747368ac5a8823eb92e4",
             "timetable": ["User with given ID does not exist!"]
         }
    }
    ```

**Add Course**
----
  Attempts to add a course to a timetable. Returns validation errors if any, otherwise the newly created object.

* **URL**

  /api/addCourse/

* **Method:**
  
  `PUT`
  
*  **URL Params**

   None

* **Data Params**

    **Required:**
 
   `course_id=[String]`

   `timetable_id=[objectID]`
   
   `lecture_id=[String]`

   **Optional:**
 
   `turorial_id=[String]`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
        "_id": "6219747368ac5a8823eb92e4",
        "name": "",
    }
    ```
 
* **Error Response:**

    Profile ID does not correspond

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    {
         "errors" : {
             "profile": ["Profile with given ID does not exist"]
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
            "phone" : ["Bad phone format!"]
            "description" : ["Description too long!"]
        } 
    }
    ```

**Remove Course**
----
  Attempts to remove a course from a timetable. Returns validation errors if any, otherwise the newly created object.

* **URL**

  /api/removeCourse/

* **Method:**
  
  `PUT`
  
*  **URL Params**

   **Required:**
   
   `pid=[objectID]`

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

  PID not provided

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
         "errors" : {
             "profile": ["Profile id not provided!"]
         }
    }
    ```
  
  PID does not correspond to a user

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    { "errors" : {
            "profile" : ["Profile with given ID doesn't exist!"]
        } 
    }
    ```


**Getting Courses**
----
  Attempts to get the courses of a timetable.

* **URL**

  /api/getCourses/

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:**
   
   `pid=[objectID]`

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

  PID not provided

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
         "errors" : {
             "profile": ["Profile id not provided!"]
         }
    }
    ```
  
  PID does not correspond to a user

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    { "errors" : {
            "profile" : ["Profile with given ID doesn't exist!"]
        } 
    }
    ```

**Comparing Timetables**
----
  Attempts to compare two timetables. Returns similar lectures and tutorials.

* **URL**

  /api/compareTimetables/

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:**
   
   `pid=[objectID]`

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

  PID not provided

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
         "errors" : {
             "profile": ["Profile id not provided!"]
         }
    }
    ```
  
  PID does not correspond to a user

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    { "errors" : {
            "profile" : ["Profile with given ID doesn't exist!"]
        } 
    }
    ```


