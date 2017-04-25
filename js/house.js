'use strict';

(function () {
  var House = function (data) {
    this.author = {
      'avatar': data.author.avatar
    };
    this.location = {
      'x': data.location.x,
      'y': data.location.y
    };
    this.offer = {
      'title': data.offer.title,
      'address': data.offer.address,
      'price': data.offer.price,
      'type': data.offer.type,
      'rooms': data.offer.rooms,
      'guests': data.offer.guests,
      'checkin': data.offer.checkin,
      'checkout': data.offer.checkout,
      'features': data.offer.features,
      'description': data.offer.description,
      'photos': data.offer.photos
    };
  };

  House.prototype = {
    setAuthor: function (author) {
      this.author = author;
      return author;
    },
    setLocation: function (x, y) {
      this.location.x = x;
      this.location.y = y;
    },
    setTitle: function (title) {
      this.offer.title = title;
    },
    setAddress: function (address) {
      this.offer.address = address;
    },
    setPrice: function (price) {
      this.offer.price = price;
    },
    setType: function (type) {
      this.offer.type = type;
    },
    setRooms: function (rooms) {
      this.offer.rooms = rooms;
    },
    setGuests: function (guests) {
      this.offer.guests = guests;
    },
    setCheckin: function (checkin) {
      this.offer.checkin = checkin;
    },
    setCheckout: function (checkout) {
      this.offer.checkout = checkout;
    },
    setFeatures: function (features) {
      this.offer.features = features;
    },
    setDescription: function (description) {
      this.offer.description = description;
    },
    setPhotos: function (photos) {
      this.offer.photos = photos;
    }
  };

  window.House = House;
})();
