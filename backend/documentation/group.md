**Create Group**
----
  Attempts to create a group. Returns validation errors if any, otherwise the newly created object. Defaults to public group if type not specified

* **URL**

  /api/Groups/

* **Method:**
  
  `POST`

* **Protected:**

  Yes, requires login

*  **URL Params**

   None

* **Data Params**

    **Required:**
 
   `name=[String]`

    **Optional:**
   `image=[Image]`
   `description=[String]`
   `type=[String]`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "_id": "6232957990d86bc7b951cf27",
        "name": "porta potty poopers",
        "description": "",
        "users": [],
        "owner": "623134904542a814cadee759",
        "type": "public",
        "image": "static/groups/porta potty poopers/image/WhatsApp.exe",
        "__v": 0
    }
    ```
 
* **Error Response:**

    Name not provided

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
    "errors": {
        "name": [
            "can't be blank"
            ]
        }
    }
    ```

    Duplicate name 

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    {
        "message": "E11000 duplicate key error collection: dev-pub-data.groups index: name_1 dup key: { name: \"porta potty poopers\" }"
    }
    ```

**Update Group**
----
  Attempts to update a group. Returns validation errors if any, otherwise the newly created object.

* **URL**

  /api/Groups/

* **Method:**
  
  `PUT`

* **Protected:**

  Yes, requires login and requires requesting user to be owner of that group
  
*  **URL Params**

   None

* **Data Params**

    **Required:**
 
   `name=[String]`

    **Optional:**

   `image=[Image]`
   `description=[String]`


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "_id": "6232957990d86bc7b951cf27",
        "name": "porta potty poopers",
        "description": "e",
        "users": [],
        "owner": "623134904542a814cadee759",
        "type": "public",
        "image": "static/groups/porta potty poopers/image/WhatsApp.exe",
        "__v": 0
    }
    ```
 
* **Error Response:**

    see Create Group


**Get Group**
----
  Attempts to retrieve public info about profile
* **URL**

  /api/Groups/<group_name>

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
        "_id": "6232957990d86bc7b951cf27",
        "name": "porta potty poopers",
        "description": "e",
        "users": [],
        "owner": "623134904542a814cadee759",
        "type": "public",
        "image": "static/groups/porta potty poopers/image/WhatsApp.exe",
        "__v": 0
    }
    ```
 
* **Error Response:**
  
  group name does not correspond to a group

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    { "errors": {
        "group": [
          "Group with given name doesn't exist!"
        ]
    }
    ```

**Join Group**
----
  Attempts to use token user to join group
* **URL**

  /api/Groups/join

* **Method:**
  
  `POST`

* **Protected:**

  Yes, requires login
  
*  **URL Params**

  None

* **Data Params**

  **Required:**
  `name=[String]`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "_id": "623134914542a814cadee75b",
        "user": "623134904542a814cadee759",
        "first_name": "saiem6",
        "last_name": "",
        "program": "",
        "year_of_study": null,
        "phone": "",
        "description": "",
        "posts": [],
        "groups": [
            "6232952190d86bc7b951cf1b",
            "6232950490d86bc7b951cf18",
            "6232952d90d86bc7b951cf1e"
        ],
        "comments": [],
        "likes_posts": [],
        "avatar": "static/users/saiem6/Capture.PNG",
        "__v": 0
    }
    ```
 
* **Error Response:**
  
  see auth