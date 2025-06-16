// module.exports = 객체 1개

const area = {
  square: function (len) {
    return len * len;
  },
  circle: function (radidus) {
    return Math.PI * radidus * radidus;
  },
  triangle: function (w, h) {
    return (w * h) / 2;
  },
};

module.exports = area;
