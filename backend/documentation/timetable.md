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
             "timetable": ["Timetable already exists!"]
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
 
   `tutorial_id=[String]`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "_id": "62212b5baddec98a271ff2b4",
        "timetable_id": 314,
        "timetable_name": "timetabssdasd",
        "courses": [
            "CSC148H5F"
        ],
        "lectures": [
            "62212bdb47e6537407f5d5a3"
        ],
        "tutorials": [
            "62218b3cb9521a496553aba6"
        ],
        "__v": 2
    }
    ```
 
* **Error Response:**

    Timetable ID, course id, lec id, tut id does not correspond

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    {
         "errors" : {
             "timetable": ["Timetbable with given ID does not exist"],
             "course_id": ["Course doesn't exist!"],
             "lecture_id": ["Lecture doesn't exist!"],
             "tutorial_id": ["Tutorial doesn't exist!"]
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
   
   `course_id=[String]`
   `timetable_id=[ObjectID]`

* **Data Params**

  None

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "_id": "62068f431286035443ce6efc",
        "timetable_id": 1,
        "timetable_name": "Nivy's Timetable 1",
        "courses": [],
        "lectures": [],
        "tutorials": [],
        "__v": 1
    }
    ```
 
* **Error Response:**
  
  Course, lecture, tutorial does not exist

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    { "errors" : {
            "course" : ["Course not found!"],
            "lecture" : ["Lecture not found!"],
            "tutorial" : ["Tutorial not found!"]
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
   
   `tid=[objectID]`

* **Data Params**

  None

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        {
            "_id": "62212bdb47e6537407f5d5a3",
            "course_id": "CSC148H5F",
            "lecture_id": "101",
            "time": [
                [
                    "Monday",
                    "13",
                    "15"
                ]
            ]
        },
        {
            "_id": "62218b3cb9521a496553aba6",
            "course_id": "CSC148H5F",
            "tutorial_id": "101",
            "time": [
                "Tuesday",
                "12",
                "13"
            ]
        }
    }
    ```
 
* **Error Response:**

  tid not provided

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
         "errors" : {
             "timetable": ["Timetable id not provided!"]
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
   
   `tid1=[objectID]`
   `tid2=[objectID]`

* **Data Params**

  None

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** 
    ```
    You have 2 shared courses

    The following courses are shared:
    CSC207H5S
        LEC9101
        TUT9101
    CSC148H5S
        TUT9101
    ```
 
* **Error Response:**

  tid1 not provided

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
         "errors" : {
             "tid1": ["timetable id 1 not provided!"]
         }
    }
    ```
  tid2 not provided

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
         "errors" : {
             "tid2": ["timetable id 2 not provided!"]
         }
    }
    ```


