

var Order = function (axios, shop_id) {
    this.axios = axios;
    this.shop_id = shop_id;
};

Order.prototype = {
    id: function (id) {
        return id ? id : this.shop_id;
    },
    // Retrieve a list of orders
    fetch: function (shop_id) {
        shop_id = this.id(shop_id);
        return this.axios.get(`shops/${shop_id}/orders.json`);
    },

    lists: function (shop_id) {
        return this.fetch(shop_id);
    },

    // Get order details by id
    info: function (id, shop_id) {
         shop_id = this.id(shop_id);
        return this.axios.get(`shops/${shop_id}/orders/${id}.json`);
    },

    // Submit an order
    create: function (data, shop_id) {
        shop_id = this.id(shop_id);
        return this.axios.post(`shops/${shop_id}/orders.json`, data);
    },

    // Send an existing order to production
    send_to_production: function (id, shop_id) {
         shop_id = this.id(shop_id);        
        return this.axios.post(`shops/${shop_id}/orders/${id}/send_to_production.json`);
    },

    publish: function(id, shop_id){
        return this.send_to_production(id, shop_id);
    },

    // Calculate the shipping cost of an order
    shipping_cost: function (order, shop_id) {
        shop_id = this.id(shop_id);
        return this.axios.post(`shops/${shop_id}/orders/shipping.json`, order);
    }
}

module.exports = Order;