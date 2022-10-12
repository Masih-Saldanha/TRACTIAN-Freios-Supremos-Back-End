<p align="center">
  <a href="https://github.com/$username-github/$nome-repositorio">
    <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f698.svg" alt="readme-logo" width="80" height="80"> <!-- src="image-link" -->
  </a>

  <h3 align="center">
    TRACTIAN - Freios Supremos
  </h3>
</p>

# Description

This is the back-end service layer of the Application "TRACTIAN - Freios Supremos".

# Database deploy link

https://tractian-freios-supremos-back.herokuapp.com/

# Local Usage

```bash
$ git clone git@github.com:Masih-Saldanha/TRACTIAN-Freios-Supremos-Back-End.git

$ cd TRACTIAN-Freios-Supremos-Back-End

// Create a copy of .env.test and fill it.

$ npm install

$ npm run dev
```

# API:


## User Routes:

```
- POST /user/
    - Route to register a user (Password of at least 8 characters)
    - headers: {}
    - body: {
        "email": "email@email.com",
        "name": "Name",
        "password": "somepassword",
        "repeatPassword": "somepassword",
        "companyId": "6341cc08b04a410cb2744e26"
    }
```
```
- GET /user/:id
    - Route to retrieve the information of a specific user through their id
    - headers: {}
    - body: {}
```
```
- GET /user/
    - Route to retrieve the information of all users
    - headers: {}
    - body: {}
```
```
- PUT /user/
    - Route to edit some information(s) of a user (All parameters are optional, you can change any one or only one, but at least one information must be changed)
    - headers: {}
    - body: {
        "id": "6342e56f48ca4581cbbe0659",
        "email": "email@email.com",
        "name": "Name",
        "password": "somepassword",
        "repeatPassword": "somepassword",
        "companyId": "6341cc08b04a410cb2744e26"
    }
```
```
- DELETE /user/
    - Route to delete a user from the system through its id
    - headers: {}
    - body: {
        "id": "6342e56f48ca4581cbbe0659"
    }
```

## Company Routes:

```
- POST /company/
    - Route to register a company
    - headers: {}
    - body: {
        "email": "email@email.com",
        "name": "Name"
    }
```
```
- GET /company/:id
    - Route to retrieve the information of a specific company through its id
    - headers: {}
    - body: {}
```
```
- GET /company/
    - Route to retrieve the information of all companies
    - headers: {}
    - body: {}
```
```
- PUT /company/
    - Route to edit some information(s) of a company (All parameters are optional, you can change any one or only one, but at least one information must be changed)
    - headers: {}
    - body: {
        "id": "6341cc08b04a410cb2744e26",
        "email": "email@email.com",
        "name": "Name"
    }
```
```
- DELETE /company/
    - Route to delete a company from the system through its id
    - headers: {}
    - body: {
        "id": "6341cc08b04a410cb2744e26"
    }
```

## Unit Routes:

```
- POST /unit/
    - Route to register a unit ('extraInformation' can be 'null')
    - headers: {}
    - body: {
        "name": "Name",
        "companyId": "6341cc08b04a410cb2744e26",
        "street": "Some street",
        "number": "123",
        "zip": "12345-1234",
        "extraInformation": "Something"
    }
```
```
- GET /unit/:id
    - Route to retrieve the information of a specific unit through its id
    - headers: {}
    - body: {}
```
```
- GET /unit/
    - Route to retrieve the information of all units
    - headers: {}
    - body: {}
```
```
- PUT /unit/
    - Route to edit some information(s) of a unit (All parameters are optional, you can change any one or only one, but at least one information must be changed. Also, 'extraInformation' can be 'null')
    - headers: {}
    - body: {
        "id": "63431f95f4d77a3f0ebf79e7",
        "name": "Name",
        "companyId": "6341cc08b04a410cb2744e26",
        "street": "Some street",
        "number": "123",
        "zip": "12345-1234",
        "extraInformation": "Something"
    }
```
```
- DELETE /unit/
    - Route to delete a unit from the system through its id
    - headers: {}
    - body: {
        "id": "63431f95f4d77a3f0ebf79e7"
    }
```

## Asset Routes:

```
- POST /asset/
    - Route to register an asset ('status' has to be one between "Running", "Alerting" and "Alerting". Also, 'healthLevel' must be a integer number between 0 and 100)
    - headers: {}
    - body: {
        "image": "image.com/image.png",
        "name": "Name",
        "description": "Some description",
        "model": "A1",
        "owner": "Someone",
        "status": "Running",
        "healthLevel": 99,
        "unitId": "63431f95f4d77a3f0ebf79e7"
    }
```
```
- GET /asset/:id
    - Route to retrieve the information of a specific asset through its id
    - headers: {}
    - body: {}
```
```
- GET /asset/
    - Route to retrieve the information of all assets
    - headers: {}
    - body: {}
```
```
- PUT /asset/
    - Route to edit some information(s) of an asset (All parameters are optional, you can change any one or only one, but at least one information must be changed. 'status' has to be one between "Running", "Alerting" and "Alerting". Also, 'healthLevel' must be a integer number between 0 and 100)
    - headers: {}
    - body: {
        "id": "634467c64f9cb88028ee7cb1",
        "image": "image.com/image.png",
        "name": "Name",
        "description": "Some description",
        "model": "A1",
        "owner": "Someone",
        "status": "Running",
        "healthLevel": 99,
        "unitId": "63431f95f4d77a3f0ebf79e7"
    }
```
```
- DELETE /asset/
    - Route to delete an asset from the system through its id
    - headers: {}
    - body: {
        "id": "634467c64f9cb88028ee7cb1"
    }
```
