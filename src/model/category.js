module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        image: String
      },
      { timestamps: true }
    );
    
    const Category = mongoose.model("category", schema);
    return Category;
  };

  