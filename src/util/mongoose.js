module.exports = {
    mutipleMongooseToObject: function(moongse){
        return moongse.map(moongse => moongse.toObject());
    },
    moongseToObject: function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    }
};