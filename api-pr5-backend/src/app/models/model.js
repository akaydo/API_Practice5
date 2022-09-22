module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        username: String,
        email: String,
        mobile: String,
        published: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Phone = mongoose.model("phone", schema);
    return Phone;
  };