# Coffeemug Recruitment Task

CRUD API for managing products

## Installation

Clone repository and download dependencies using yarn or npm, and run development server

```bash
  yarn
  yarn dev
```

## Usage/Examples

## Get list of products

### Request

`GET http://localhost:5001/products/`

### Response

    {
        "Name": "Gloves",
        "Price": 24,
        "Id": "1d8f786e-e2db-4f5e-923f-3eb22a07bd75",
        "UpdateDate": "2022-11-18T18:45:53.172Z"
    },
    {
        "Name": "Snowboard",
        "Price": 399,
        "Id": "83839706-32dc-4cba-a61b-ac999349cb3f"
    }

## Create a new product

### Request

`POST http://localhost:5001/products/`

    {
      "Name" : "New product",
      "Price" : "119"
    }

    Both fields are required

### Response

    Product with the name New product added to the database

## Get a specific product

### Request

`GET http://localhost:5001/products/id`

### Response

    {
        "Name": "Gloves",
        "Price": 24,
        "Id": "1d8f786e-e2db-4f5e-923f-3eb22a07bd75",
        "UpdateDate": "2022-11-18T18:45:53.172Z"
    },

## Update existing product

### Request

`PUT http://localhost:5001/products/id`

    {
      "Name": "New product changed",
      "Price": "129"
    }

    Both fields are optional

### Response

    Product with the id 1d8f786e-e2db-4f5e-923f-3eb22a07bd75 has been updated

## Delete existing product

### Request

`DELETE http://localhost:5001/products/id`

### Response

    Product with the id: 1d8f786e-e2db-4f5e-923f-3eb22a07bd75 deleted
