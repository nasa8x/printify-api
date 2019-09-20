

# Printify API

Printify's REST API allows your application to manage a Printify shop on behalf of a Printify Merchant. Create products, submit orders, and more...

## API Usage Guidelines

[developers.printify.com](https://developers.printify.com)

## If you don't know Node.js 

[How To Build a Blog with Nest.js, MongoDB, and Vue.js](https://morioh.com/p/74ffc8a798bb)

[Machine Learning In Node.js With TensorFlow.js](https://morioh.com/p/a517bc403340)

## Install

```js
npm i printify-api --save
```

## Example

```js

var Printify = require('printify-api');

var API = new Printify({
  shop_id: 123456, // global query by shop_id, if not set you must set each function
  access_token:'xxxxxxxxxxxxxxxxxxxxxxxxxx'
});

```

```js

  // Retrieve a list of all products
  API.Product.fetch().then(data =>{
    console.log(data);
  });

  // support async
  var result = await API.Product.fetch();
  
  // or custom shop_id
  var result = await API.Product.fetch(shop_id);
  

```

```js 

// Retrieve a product
var result = await API.Product.info(product_id);

// or custom shop_id
var result = await API.Product.info(product_id, shop_id);

```

```js
 // Create a new product
  var data = {
    "title": "Product",
    "description": "Good product",
    "blueprint_id": 384,
    "print_provider_id": 1,
    "variants": [
          {
              "id": 45740,
              "price": 400
          },
          {
              "id": 45742,
              "price": 400
          },
          {
              "id": 45744,
              "price": 400
          },
          {
              "id": 45746 ,
              "price": 400
          }
      ],
      "print_areas": [
        {
          "variant_ids": [45740,45742,45744,45746],
          "placeholders": [
            {
              "position": "front",
              "images": [
                  {
                    "id": "5d15ca551163cde90d7b2203", 
                    "x": 0.5, 
                    "y": 0.5, 
                    "scale": 1,
                    "angle": 0
                  }
              ]
            }
          ]
        }
      ],
  };

  var result = API.Product.create(data);

  // or 
  var result = API.Product.create(data, shop_id);

 ```

```js
 // Update a product
  var data = {
    id: 1234,
    title:'Product 1'
  };

  var result = await API.Product.update(data);

  // or
  var result = await API.Product.update(data, shop_id);

 ```

 ```js
 // Delete a product
  var result = await API.Product.delete(1234);

 ```

 ```js
 // Publish a product
var result = await API.Product.publish(1234);

// Notify that a product was successfully published
var result = await API.Product.publish(1234, 'success');

// Notify that a product publishing has failed
var result = await API.Product.publish(1234, 'error');

 ```

```js
 // Retrieve a list of orders
var result = await API.Order.fetch();

// or custom shop_id
var result = await API.Order.fetch(shop_id);

```

```js
 // Get order details by id
var result = await API.Order.info(order_id);

// or custom shop_id
var result = await API.Order.fetch(order_id, shop_id);

```

```js
 // Submit an order

var data = {
    "external_id": "2750e210-39bb-11e9-a503-452618153e4a",
    "line_items": [
      {
        "product_id": "5bfd0b66a342bcc9b5563216",
        "variant_id": 17887,
        "quantity": 1
      }
    ],
    "shipping_method": 1,
    "send_shipping_notification": false,
    "address_to": {
      "first_name": "John",
      "last_name": "Smith",
      "email": "example@msn.com",
      "phone": "0574 69 21 90",
      "country": "BE",
      "region": "",
      "address1": "ExampleBaan 121",
      "address2": "45",
      "city": "Retie",
      "zip": "2470"
    }
  };

var result = await API.Order.create(data);

// or custom shop_id
var result = await API.Order.create(data, shop_id);

```

```js 
// Send an existing order to production
var result = await API.Order.publish(order_id);

// or custom shop_id
var result = await API.Order.publish(order_id, shop_id);

```
```js
// Calculate the shipping cost of an order

var order = {
    "line_items": [{
        "product_id": "5bfd0b66a342bcc9b5563216",
        "variant_id": 17887,
        "quantity": 1
    },{
        "print_provider_id": 5,
        "blueprint_id": 9,
        "variant_id": 17887,
        "quantity": 1
    },{
        "sku": "MY-SKU",
        "quantity": 1
    }],
    "address_to": {
        "first_name": "John", // not required
        "last_name": "Smith", // not required
        "email": "example@msn.com", // not required
        "phone": "0574 69 21 90", // not required
        "country": "BE",
        "region": "",
        "address1": "ExampleBaan 121",
        "address2": "45",
        "city": "Retie",
        "zip": "2470"
    }
};

var result = await API.Order.shipping_cost(order, shop_id);

// or custom shop_id
var result = await API.Order.shipping_cost(order, shop_id);

```

```js
// Retrieve a list of webhooks
var result = await API.Webhook.fetch();

// or custom shop_id
var result = await API.Webhook.fetch(shop_id);

```


```js
// Retrieve a webhook
var result = await API.Webhook.info(webhook_id);

// or custom shop_id
var result = await API.Webhook.info(webhook_id, shop_id);

```


```js
// Create a new webhook
var data = {
    "topic": "order:created",
    "url": "https://morioh.com/webhooks/order/created"
}

var result = await API.Webhook.create(data);

// or custom shop_id
var result = await API.Webhook.create(data, shop_id);

```

```js
// Modify a webhook
var data = {
    id: 12345,
    "url": "https://othersite.com/callback/order/created"
};
var result = await API.Webhook.update(data);

// or custom shop_id
var result = await API.Webhook.update(data, shop_id);

```


```js
// Events, no test
// The product was deleted.
API.on('product:deleted', function(err, res){
    console.log(res);
});

// The product publishing was started.
API.on('product:publish:started', function(err, res){
    console.log(res);
});

// The product published successfully.
API.on('product:publish:succeeded', function(err, res){
    console.log(res);
});

// The product publishing has failed.
API.on('product:publish:failed', function(err, res){
    console.log(res);
});

// The order was created.
API.on('order:created', function(err, res){
    console.log(res);
});

// The order was updated.
API.on('order:updated', function(err, res){
    console.log(res);
});

// The order was sent to production.
API.on('order:sent-to-production', function(err, res){
    console.log(res);
});

// Some/all items have been fulfilled.
API.on('order:shipment:created', function(err, res){
    console.log(res);
});

// Some/all items have been delivered
API.on('order:shipment:delivered', function(err, res){
    console.log(res);
});

// see more: https://developers.printify.com/#events

```

