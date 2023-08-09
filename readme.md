## Endpoint

### GET /messages

This endpoint retrieves messages for the authenticated user based on their role. Manufacturers will receive messages related to their orders, while transporters will receive messages related to their assigned orders.

## Usage

Make a GET request to the `/messages` endpoint with the appropriate authentication token. The middleware will ensure only authenticated users can access the endpoint.

**Example Request:**

```http
GET /messages
Authorization: Bearer <authentication_token>
```

### POST /createorder

This endpoint creates a new order when the authenticated user is a manufacturer.

## Usage

Make a POST request to the `/createorder` endpoint with the appropriate authentication token, ensuring that the user is a manufacturer.

**Example Request:**

```http
POST /createorder
Authorization: Bearer <authentication_token>
Content-Type: application/json
```

{
"orderID": "XB123",
"from": "Source Location",
"to": "Destination Location",
"quantity": "2 tons",
"pickupAddress": "Manufacturer's Address",
"manufacturer": "<manufacturer_id>",
"transporter": "<transporter_id>"
}

### POST /message

This endpoint allows authenticated users to send messages related to orders.

## Usage

Make a POST request to the `/message` endpoint with the appropriate authentication token.

**Example Request:**

```http
POST /message
Authorization: Bearer <authentication_token>
Content-Type: application/json

{
  "message": "This is a sample message",
  "manufacturer": "<manufacturer_id>",
  "transporter": "<transporter_id>",
  "order": "<order_id>"
}
```
