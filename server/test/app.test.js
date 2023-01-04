// const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
const {faker} = require('@faker-js/faker') ;
const storage = require('local-storage');




// ************************************************************** users ************************************************************************ //


let name = faker.name.firstName();
let email = faker.internet.email();
let password = faker.internet.password();
let token = "" ;



// ! for register user
describe("POST /api/users/", () => {
  it("should create a user", async () => {
    const res = await request(app).post("/api/users").send({
      name: name,
      email: email,
      password: password,
    });
    token = res.body.token ;
    // check cookies 

    expect(res.statusCode).toBe(201);
  });
  it("should return email exist", async () => {
    const res = await request(app).post("/api/users").send({
      name: name,
      email: email,
      password: password,
    });
    token = res.body.token ;
    // check cookies 

    expect(res.statusCode).toBe(401);
  });
  it("should not create a user because password", async () => {
    const res = await request(app).post("/api/users").send({
      name: name,
      email: email,
    });
    token = res.body.token ;
    // check cookies 

    expect(res.statusCode).toBe(400);
  });
  it("should not create a user because not name", async () => {
    const res = await request(app).post("/api/users").send({
      email: email,
      password: password,
    });
    token = res.body.token ;
    // check cookies 

    expect(res.statusCode).toBe(400);
  });
  it("should not create a user by not email", async () => {
    const res = await request(app).post("/api/users").send({
      name: name,
      password: password,
    });
    token = res.body.token ;
    // check cookies 

    expect(res.statusCode).toBe(400);
  });
});

// ! for login user
describe("POST /api/users/login", () => {
  it("should return ivalid data", async () => {
    const res = await request(app).post("/api/users/login").send({
      password: password,
    });
    token = res.body.token ;
    // check cookies 
    
    expect(res.statusCode).toBe(400);
  });
  it("should return ivalid password", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: email,
      password: "test"+password,
    });
    token = res.body.token ;
    // check cookies 
    
    expect(res.statusCode).toBe(401);
  });
  it("should login succefful", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: email,
      password: password,
    });
    token = res.body.token ;
    // check cookies 

    expect(res.statusCode).toBe(200);
  });
});

// ************************************************************** houses ************************************************************************ //

name = faker.name.firstName();
let address = faker.address.streetAddress();
let city = faker.address.city();
let etage = faker.datatype.number(100)
let bloc = faker.datatype.number(100)
let price = faker.datatype.number(100)
let rooms = faker.datatype.number(100)

let _id = "" ;

// ! for create house
describe("POST /api/houses/", () => {
  it("should create a house", async () => {
    const res = await request(app).post("/api/houses").send({
      name: name,
      address: address,
      city: city,
      etage: etage,
      bloc: bloc,
      price: price,
      rooms: rooms,
    });
    _id = res.body._id ;
    expect(res.statusCode).toBe(200);
  });
  it("should not create a house because name", async () => {
    const res = await request(app).post("/api/houses").send({
      address: address,
      city: city,
      etage: etage,
      bloc: bloc,
      price: price,
      rooms: rooms,
    });
    expect(res.statusCode).toBe(400);
  });
  it("should not create a house because address", async () => {
    const res = await request(app).post("/api/houses").send({
      name: name,
      city: city,
      etage: etage,
      bloc: bloc,
      price: price,
      rooms: rooms,
    });
    expect(res.statusCode).toBe(400);
  });
  it("should not create a house because city", async () => {
    const res = await request(app).post("/api/houses").send({
      name: name,
      address: address,
      etage: etage,
      bloc: bloc,
      price: price,
      rooms: rooms,
    });
    expect(res.statusCode).toBe(400);
  });
  it("should not create a house because etage", async () => {
    const res = await request(app).post("/api/houses").send({
      name: name,
      address: address,
      city: city,
      bloc: bloc,
      price: price,
      rooms: rooms,
    });
    expect(res.statusCode).toBe(400);
  });
  it("should not create a house because bloc", async () => {
    const res = await request(app).post("/api/houses").send({
      name: name,
      address: address,
      city: city,
      etage: etage,
      price: price,
      rooms: rooms,
    });
    expect(res.statusCode).toBe(400);
  });
  it("should not create a house because price", async () => {
    const res = await request(app).post("/api/houses").send({
      name: name,
      address: address,
      city: city,
      etage: etage,
      bloc: bloc,
      rooms: rooms,
    });
    expect(res.statusCode).toBe(400);
  });
  it("should not create a house because rooms", async () => {
    const res = await request(app).post("/api/houses").send({
      name: name,
      address: address,
      city: city,
      etage: etage,
      bloc: bloc,
      price: price,
    });
    expect(res.statusCode).toBe(400);
  });
});



// ! for update house
describe("PUT /api/houses/", () => {
  it("should update a house", async () => {
    const res = await request(app).put("/api/houses/"+ _id).send({
      name: 'test '+ name,
      address: address +' test',
      city: city +' test',
      etage: 10,
      bloc: 10,
      price: 10,
      rooms: 10,
    });
    expect(res.statusCode).toBe(200);
  });
  
});

// ! delete house
describe("DELETE /api/houses/", () => {
  it("should delete a house", async () => {
    const res = await request(app).delete("/api/houses/"+ _id);
    expect(res.statusCode).toBe(200);
  });
  
});
