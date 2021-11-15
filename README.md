# understandingExpress-MongDB-NodeJS

A simple NodeJS + Express.js + Mongoose RESTful API serving data about Countries, States and Cities.

API Version: 1.0

## More about

My goals in this project is to organize inside my head a little bit more about MVC's concepts making a better logic structure with my files and folders. Also, coding with some Clean Code concepts in mind like variable names and removing duplicities.

Inside misc folder you can try the Thunder's Collections and Environments for all Endpoints. It works @localhost and @[heroku](https://mongocrudexpress.herokuapp.com)

### Endpoints for Countries

`GET /countries/listall` (ALL)

 - Returns everything that is inside the Database:  

   ```
   - name: is a String field storing Country's name
   - population: is a number field storing Country's total population without quotes, periods or comas
   - language: is a String field storing Country's mother Language
   - gbp: is a number field storing Country's GBP (Nominal) population without quotes, periods or comas
   ```
 - Status Code: 200

`GET /countries/listname/:name` (By Name)

 - Returns a Country by it's Name
 - Status Code: 200
 - Status Code: 404

`POST /countries/add`

- Creates a new Country.

- Status Code: 201

- Status Code: 400

- Status Code: 403

  ```
  {
      "name" : "Brazil",
      "population" : 210147125,
      "language" : "Portuguese",
      "gbp" : 1491
  }
  ```

  

`PUT /countries/update/:id`

- Change Country's info by it's ID

- Status Code: 201
- Status Code: 400
- Status Code: 403

`DELETE /countries/del/:id`

 - Change Country's from Database
- Status Code: 201
- Status Code: 400
- Status Code: 403

### Endpoints for States

`GET /states/listall` (ALL)

`GET /countries/states/:name` (By Name)

`POST /states/add`

`PUT /states/update/:id`

`DELETE /states/del/:id`

 - DB Model

   ```
   - name: is a String field storing State's name
   - distric: is a String field storing State's region
   - population: is a number field storing State's total population without quotes, periods or comas
   - minwage: is a number field storing State's minimun wage
   ```

 - JSON Body

   ```
   {
       "name" : "São Paulo",
       "district" : "Sudeste",
       "population" : 12325232,
       "minwage" : 1169
   }
   ```

   

### Endpoints for Cities

`GET /cities/listall` (ALL)

`GET /cities/states/:name` (By Name)

`POST /cities/add`

`PUT /cities/update/:id`

`DELETE /cities/del/:id`

 - DB model

   ```
   - name: is a String field storing City's name
   - qttydistricts: is a Number field storing City's total neighborhoods
   - population: is a Number field storing City's total population without quotes, periods or comas
   - birthday: is a String field storing City's birthday
   ```

   

 - JSON Body

   ```
   {
       "name" : "Sao Paulo",
       "qttydistricts" : 96,
       "population" : 1233,
       "birthday" : "25.01"
   }
   ```

   

