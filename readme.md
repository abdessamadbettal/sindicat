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
| `POST` | `/api/house/add` | **createHouse**|
| `PUT` | `/api/house/update/:id` | **updateHouse**|
| `DELETE` | `/api/house/delete/:id` | **deleteHouse**|
| `GET` | `/api/house/getAll` | **GetAllHouse**|

### paiement

| Method | Api     | Description                |
| :-------- | :------- | :------------------------- |
| `POST` | `/api/paiement/creatpaiement` | **creatPaiement**|
| `PUT` | `/api/paiement/updatepaiements` | **updatePaiements**|
| `DELETE` | `/api/paiement/deletepaiement/:id` | **deletePaiement**|
| `GET` | `/api/paiement/getAllCommands` | **getAllPaiements**|