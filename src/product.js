

var Product = function (axios, shop_id) {
    this.axios = axios;
    this.shop_id = shop_id;
}

Product.prototype = {

    id: function (id) {
        return id ? id : this.shop_id;
    },
    // Retrieve a list of all products
    fetch: function (payload, shop_id) {
        shop_id = this.id(shop_id);
        return this.axios.get(`shops/${shop_id}/products.json`, payload);
    },

    lists: function (payload, shop_id) {
        return this.fetch(payload, shop_id);
    },

    // Retrieve a product
    info: function (id, shop_id) {
        shop_id = this.id(shop_id);
        return this.axios.get(`shops/${shop_id}/products/${id}.json`);
    },

    // Create a new product
    create: function (data, shop_id) {
        shop_id = this.id(shop_id);
        return this.axios.post(`shops/${shop_id}/products.json`, data);
    },

    // Update a product
    update: function (data, shop_id) {
        shop_id = this.id(shop_id);
        var id = data.id;
        return this.axios.put(`shops/${shop_id}/products/${id}.json`);
    },

    // Delete a product
    delete: function (id, shop_id) {
        shop_id = this.id(shop_id);
        return this.axios.delete(`shops/${shop_id}/products/${id}.json`, data);
    },
    // Publish a product
    publish: function (id, notify, shop_id) {
        shop_id = this.id(shop_id);
        switch (notify) {
            case "success":
                return this.axios.post(`shops/${shop_id}/products/${id}/publishing_succeeded.json`);
                break;

            case "error":
                return this.axios.post(`shops/${shop_id}/products/${id}/publishing_failed.json`);
                break;

            default:
                return this.axios.post(`shops/${shop_id}/products/${id}/publish.json`);
                break;
        }

    }
}