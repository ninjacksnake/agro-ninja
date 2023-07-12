function resizeBase64Image(base64, width =200, height=200) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      var resizedBase64 = canvas.toDataURL();
      resolve(resizedBase64);
    };

    img.onerror = function () {
      reject(new Error("Failed to load image."));
    };

    img.src = base64;
  });
}
const ImageResizer = {
  resizeBase64Image,
};

export default ImageResizer;
