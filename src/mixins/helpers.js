export const helpers = {
  methods: {
    isImageFile(fileUrl) {
      return fileUrl.indexOf(".svg") > -1 ||
        fileUrl.indexOf(".png") > -1 ||
        fileUrl.indexOf(".jpg") > -1 ||
        fileUrl.indexOf(".jpeg") > -1 ||
        fileUrl.indexOf(".gif") > -1 ||
        fileUrl.indexOf(".webp") > -1
    },
    isSupportedImageFileType(type) {
      return "image/jpeg" === type ||
        "image/png" === type ||
        "image/svg+xml" === type ||
        "image/bmp" === type ||
        "image/gif" === type ||
        "image/webp" === type
    }
  },
}
export default {
  helpers
}