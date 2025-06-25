module.exports = {
  //nhận vào một mảng các đối tượng Mongoose Document và trả về một mảng các đối tượng JavaScript thuần bằng toObject() 
  mutipleMongooseToObject: function (moongse) {
    return moongse.map((moongse) => moongse.toObject());
  },

  // Hàm này nhận vào một đối tượng Mongoose Document đơn lẻ và trả về bản sao đối tượng thuần bằng toObject()
  moongseToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  },
};
