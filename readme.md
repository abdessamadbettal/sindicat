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

### house

| Method | Api     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/api/houses/` | **GetAllHouse**|
| `GET` | `/api/houses/:id` | **GetHouse**|
| `POST` | `/api/houses/` | **createHouse**|
| `PUT` | `/api/houses/update/:id` | **updateHouse**|
| `DELETE` | `/api/houses/delete/:id` | **deleteHouse**|

### paiement

| Method | Api     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/api/paiements/` | **getAllPaiements**|
| `POST` | `/api/paiements/` | **creatPaiement**|
| `PUT` | `/api/paiements/:id` | **updatePaiements**|
| `DELETE` | `/api/paiements/deletepaiement/:id` | **deletePaiement**|
| `GET` | `/api/paiements/:id` | **getAllPaiements**|