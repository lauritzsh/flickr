if (localStorage.getItem('photos')) {
  console.log('Photos exist');
} else {
  console.log('Photos does not exist, initializing...');
  localStorage.setItem('photos', JSON.stringify([]));
}

module.exports.add = function add(photo) {
  var photos = JSON.parse(localStorage.getItem('photos'));
  photos.push(photo);

  localStorage.setItem('photos', JSON.stringify(photos));
  return photos;
}

module.exports.get = function get() {
  return JSON.parse(localStorage.getItem('photos'));
}

module.exports.clear = function clear() {
  localStorage.setItem('photos', JSON.stringify([]));
  return [];
}
