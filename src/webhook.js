
var Webhook = function (axios, shop_id) {
    this.axios = axios;
    this.shop_id = shop_id;
}

Webhook.prototype = {

    id: function (id) {
        return id ? id : this.shop_id;
    },

    // Retrieve a list of webhooks
    fetch: function (shop_id) {
        shop_id = this.id(shop_id);
        return this.axios.get(`shops/${shop_id}/webhooks.json`);
    },

    lists: function (shop_id) {
        return this.fetch(shop_id);
    },

    // Retrieve a webhook
    info: function (id, shop_id) {
        shop_id = this.id(shop_id);
        return this.axios.get(`shops/${shop_id}/webhooks/${id}.json`);
    },

    // Create a new webhook
    create: function (data, shop_id) {
        shop_id = this.id(shop_id);
        return this.axios.post(`shops/${shop_id}/webhooks.json`, data);
    },

    // Modify a webhook
    update: function (data, shop_id) {
        shop_id = this.id(shop_id);
        var id = data.id;
        return this.axios.post(`shops/${shop_id}/webhooks/${id}.json`, data);

    },
    
    // Delete a webhook
    delete: function (id, shop_id) {
        shop_id = this.id(shop_id);
        return this.axios.delete(`shops/${shop_id}/webhooks/${id}.json`);
    },



}