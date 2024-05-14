const unitImages = {};

const importAll = (r) => {
  r.keys().forEach((key) => (unitImages[key.replace("./", "")] = r(key)));
};

importAll(require.context("./assets/unitImages", false, /\.(png|jpe?g|svg)$/));

export default unitImages;
