
module.exports = (sequelize, Sequelize) => {
    const Slide = sequelize.define("slide", {
      title: {
        type: Sequelize.STRING
      },
      sub_title: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
    });
  
    return Slide;
  };