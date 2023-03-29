module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        fname: String,
        lname: String,
        email: String,
        password: String,
        mobile: String,
      },
      { timestamps: true }
    );
  
    const User = mongoose.model("user", schema);
    return User;
  };
  
