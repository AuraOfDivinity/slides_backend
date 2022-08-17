
module.exports = (sequelize, Sequelize) => {
    const Slide = sequelize.define("slide", {
      title: {
        type: Sequelize.STRING
      },
      sub_title: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.FLOAT
      },
    });
  
    return Slide;
  };