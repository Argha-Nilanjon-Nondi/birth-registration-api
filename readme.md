
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
Default mongo setting will work fine . No username and passsword are not defined yet .But no username and passsword is not encouraged in production .
- Set the database name to "BirthDB" . 
- Then add two collection named "users" and "peoplebirthinfos".
- Upload the collection from this git repo .

<br>

## User setup
- Go to /Db/index.js .
- Open the index.js file .
- To add user , run this code
```nodejs
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
| ------------- | -------------- |
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

## License
- You can't use it for commercial usage
- You can use it just for eductional usage

