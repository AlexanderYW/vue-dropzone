import Dropzone from "dropzone"; //eslint-disable-line
Dropzone.autoDiscover = false;

export default {
  install: function(Vue,) {
    Object.defineProperty(Vue.prototype, '$dropzone', { value: Dropzone });
  }
}