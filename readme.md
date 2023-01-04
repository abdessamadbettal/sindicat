# Syndicat
project Sindicat with technology :

## Tech Stack

**Client:** React, typescript

**Server:** Node, Express

**database:** mongodb


## API Reference

### Autentication

| Method | Api     | Description                |
| :-------- | :------- | :------------------------- |
| `POST` | `/api/Auth/login` | **Register**|
| `POST` | `/api/Auth/register` | **Login**|
| `GET` | `/api/Auth/confirm/:token` | **confirmEmail**|
| `POST` | `/api/Auth/forgetpassword` | **forgetpassword**|
| `POST` | `/api/Auth/resetpassword/:token` | **resetpassword**|

### house

| Method | Api     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/api/house/` | **GetAllHouse**|
| `GET` | `/api/house/:id` | **GetHouse**|
| `POST` | `/api/house/` | **createHouse**|
| `PUT` | `/api/house/update/:id` | **updateHouse**|
| `DELETE` | `/api/house/delete/:id` | **deleteHouse**|

### paiement

| Method | Api     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/api/paiements/` | **getAllPaiements**|
| `POST` | `/api/paiements/` | **creatPaiement**|
| `PUT` | `/api/paiements/:id` | **updatePaiements**|
| `DELETE` | `/api/paiements/deletepaiement/:id` | **deletePaiement**|
| `GET` | `/api/paiements/:id` | **getAllPaiements**|