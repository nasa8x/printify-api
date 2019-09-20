// Invoke 'strict' JavaScript mode
'use strict';
var util = require('util'),
  axios = require('axios'),
  EventEmitter = require('events').EventEmitter,
  Product = require('./product'),
  Webhook = require('./webhook'),
  Order = require('./order');


function Printify(option) {
  EventEmitter.call(this);
  this.opts = Object.assign({ version: 'v1', access_token: '', shop_id: '' }, option || {});
  this.baseURL = ['https://api.printify.com', this.opts.version].join('/');

  this.axios = axios.create({
    baseURL: this.baseURL,
    headers: { 'Authorization': 'Bearer ' + this.opts.access_token }
  });

  this.axios.interceptors.response.use(function (response) {
    // Do something with response data
    //console.log(response);
    return response && response.data ? response.data : null;
  }, function (error) {
    // Do something with response error       
    console.log(util.inspect(error));
    return Promise.reject(error && error.response ? error.response.data : error);
  });

  this.Product = new Product(this.axios, this.opts.shop_id);
  this.Order = new Order(this.axios, this.opts.shop_id);
  this.Webhook = new Webhook(this.axios, this.opts.shop_id);

}

Printify.prototype = {

  shops: function () {
    return this.axios.get('shops.json');
  },
  // Retrieve a list of all available blueprints
  catalogues: function () {
    return this.axios.get('catalog/blueprints.json');
  },
  // Retrieve a specific blueprint
  catalog: function (id) {
    return this.axios.get(`catalog/blueprints/${id}.json`);
  },

  // Retrieve a list of all print providers that fulfill orders for a specific blueprint
  // if id is undefined Retrieve a list of all available print-providers
  providers: function (id) {
    return id ? this.axios.get(`catalog/blueprints/${id}/print_providers.json`) : this.axios.get('catalog/print_providers.json');
  },
  // Retrieve a specific print-provider and a list of associated blueprint offerings
  provider: function (id) {
    return this.axios.get(`catalog/print_providers/${id}.json`);
  },

  // Retrieve a list of all variants of a blueprint from a specific print provider
  variants: function (cid, pid) {
    return this.axios.get(`catalog/blueprints/${cid}/print_providers/${pid}/variants.json`);
  },

  // Retrieve the shipping information for all variants of a blueprint from a specific print provider
  shipping: function (cid, pid) {
    return this.axios.get(`catalog/blueprints/${cid}/print_providers/${pid}/shipping.json`);
  },

  // Upload artwork to a Printify account's media library
  upload: function (data) {
    return this.axios.post('uploads/images.json', data);
  }

};

util.inherits(Printify, EventEmitter);

module.exports = Printify;