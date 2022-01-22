
# Birth Registration REST API

It is a Birth Registration REST API

<br>

## Features
- Login
- Logout
- Admin
- Add person data
- Edit person data
- Find person data 
- Multiple device Login
- Proper validtion

<br>
<br>

## Built with
- Nodejs
- Express
- Mongodb
- Mongoose
- Cors
- Helmet
- JWT

<br>

## Mongodb setup
- Add username and password in mongodb
- Change the .env file as needed
- Set the database name to "BirthDB" . 
- Then add two collection named "users" and "peoplebirthinfos".
- Upload the collection from this git repo .

<br>

## User setup
- Go to /Db/index.js .
- Open the index.js file .
- To add user , run this code
```javascript
addUser({username:"any_name",
usertype:"admin",
password:"any_password"
},(data)=>{
   console.log(data)
 });
```
#### Remender 
- username should only contain letters , numbers and _ . 
- username must be minimum 12 character long 
- these characters are not allowed of username (space,#, %, "^, *,$)
- passsword can contain any thing expect space
- password must be minimum 8 character long

<br>
<br>

## Deployment

To strat the mongodb

```bash
  mongod
```
To start the express server

```bash
   npm run dev
```

#### Remember
- default port is 8080 
- default hostname is localhost


<br>
<br>

## Codes
| code  | description |
| - | -------------- |
| 2000 | login is successsful |
| 2001 | person data is added |
| 2002 | person data is updated |
| 2003 | person data is found for the vaccine id |
| 2004 | person data is found for the birth registration id |
| 3000 | required field is not found |
| 3001 | Username format is invalid |
| 3002 | Password format is invalid |
| 3003 | credantials are invalid |
| 3004 | some errors has been occured |
| 3005 | required token is not in the headers |
| 3006 | token is invalid |
| 3007 | you are not admin |
| 3008 | user is deleted |
| 3009 | person name is invalid |
| 3010 | father name is invalid | 
| 3011 | mother name is invalid |
| 3012 | father national id is invalid |
| 3013 | mother national id is invalid |
| 3014 | father birth registration id is invalid |
| 3015 | mother birth registration id is invalid |
| 3016 | person birth vaccine id is invalid |
| 3017 | person gender type is invalid | 
| 3018 | person birth no is invalid |  
| 3019 | person birth date is invalid |
| 3020 | vaccine id is already exist | 
| 3021 | person birth registration id is invalid |
| 3022 | person birth registration id is not found |
| 3023 | vaccine id is not found |

<br>
<br>

## API Reference

### Public (any type of user can access it)

<br>

### Find person data by birth registration id
  
#### URL  
```http
GET http://localhost:8080/api/person/:person_birth_reg_id
```

#### Response
```json
{
    "code": 2004,
    "message": "person data is found for the birth registration id",
    "data": {
        "person_name": "ARGHA NILANJON NONDI",
        "person_birth_reg_id": "63219414052386825",
        "person_birth_vaccine_id": "0123456789019",
        "person_birth_date": "2005-01-09T18:00:00.000Z",
        "person_birth_no": 99,
        "person_birth_place": "Jhenaidha , Khulna , Bangladesh ",
        "reg_issue_no": 12,
        "reg_issue_date": "2022-01-17T00:00:00.000Z",
        "person_gender": "female",
        "father_name": "FATHER NAME ",
        "mother_name": "MOTHER NAME ",
        "father_birth_reg_id": "01234527890123450",
        "father_national_id": "0123456709",
        "mother_birth_reg_id": "01234527890123452",
        "mother_national_id": "0123452789"
    }
}
```
#### Error codes
| code  |
| - |  
| 3000 |
| 3004 |
| 3021 |
| 3022 |

<br />

### Login user
  
#### URL  
```http
POST http://localhost:8080/api/login/
```

#### Request
```json
{
 "username":"argha_nilanjon",
 "password":"avunix9143"
}
```

#### Response
```json
{
    "code": "2000",
    "message": "login is successsful",
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsI...."
    }
}
```
#### Error codes
| code  |
| - |  
| 3000 |
| 3001 |
| 3002 |
| 3003 |
| 3004 |

<br />

### Admin (only admins can access the routes)
To use /api/admin/... route you have to set x-api-key:token in the headers.
```
 x-api-key:token

```
Remember
- token can be found on /api/login route.

#### Error codes
| code  |
| - |  
| 3005 |
| 3006 |
| 3007 |
| 3008 |


<br>

### Add person data 
  
#### URL  
```http
POST http://localhost:8080/api/person/
```

#### Request
```json
{
  "person_name": "Person Name ",
  "person_birth_date": "2005-1-10",
  "person_birth_no": "99",
  "person_birth_place": "Jhenaidha , Khulna , Bangladesh ",
  "person_gender": "female",
  "person_birth_vaccine_id":"0123456789016",
  "father_name": "Father Name ",
  "mother_name": "Mother Name ",
  "father_birth_reg_id": "01234527890123452",
  "father_national_id": "0123456789",
  "mother_birth_reg_id": "01234527890123452",
  "mother_national_id": "0123452789"
}
```

#### Response
```json
{
    "code": 2001,
    "message": "person data is added"
}
```
#### Error codes
| code  |
| - |  
| 3000 |
| 3009 |
| 3010 |
| 3011 |
| 3012 |
| 3013 |
| 3014 |
| 3015 |
| 3016 |
| 3017 |
| 3018 |
| 3019 |
| 3020 |
| 3021 |

<br />

### Update person data 
  
#### URL  
```http
PUT http://localhost:8080/api/person/
```

#### Request
```json
{
  "person_birth_reg_id":"80946395055722678",
  "person_name": "Person Name ",
  "person_birth_date": "2005-1-10",
  "person_birth_no": "99",
  "person_birth_place": "Jhenaidha , Khulna , Bangladesh ",
  "person_gender": "female",
  "person_birth_vaccine_id":"0123456789016",
  "father_name": "Father Name ",
  "mother_name": "Mother Name ",
  "father_birth_reg_id": "01234527890123452",
  "father_national_id": "0123456789",
  "mother_birth_reg_id": "01234527890123452",
  "mother_national_id": "0123452789"
}
```

Remenber 
- person_birth_reg_id is required field
- other fields depend on what information admin want to update

#### Response
```json
{
    "code": 2001,
    "message": "person data is added"
}
```
#### Error codes
| code  |
| - |  
| 3000 |
| 3009 |
| 3010 |
| 3011 |
| 3012 |
| 3013 |
| 3014 |
| 3015 |
| 3016 |
| 3017 |
| 3018 |
| 3019 |
| 3020 |
| 3021 |

<br />


### Get a person data by vaccine id
  
#### URL  
```http
GET http://localhost:8080/api/person/:person_birth_vaccine_id
```

#### Response
```json
{
    "code": 2003,
    "message": "person data is found for the vaccine id",
    "data": {
        "person_name": "PERSON NAME ",
        "person_birth_reg_id": "47680876021414496",
        "person_birth_vaccine_id": "0123456789010",
        "person_birth_date": "2005-01-09T18:00:00.000Z",
        "person_birth_no": 99,
        "person_birth_place": "Jhenaidha , Khulna , Bangladesh ",
        "reg_issue_no": 13,
        "reg_issue_date": "2022-01-20T00:00:00.000Z",
        "person_gender": "female",
        "father_name": "FATHER NAME ",
        "mother_name": "MOTHER NAME ",
        "father_birth_reg_id": "01234527890123452",
        "father_national_id": "0123456789",
        "mother_birth_reg_id": "01234527890123452",
        "mother_national_id": "0123452789"
    }
}
```
#### Error codes
| code  |
| - |  
| 3016 |
| 3023 |

<br />

<br>
<br>

## Userful MongoDB commands
### Add user
```javascript
db.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
```

<br>

### Authenticate a user and open mongo shell
```bash
mongosh --port portNo  --authenticationDatabase "userName" -u "passWord" -p
```

<br>
<br>

## License
- You can't use it for commercial usage
- You can use it just for eductional usage

