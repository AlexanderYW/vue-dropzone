const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export const reactiveTemplate = {
  mounted() {
    //this.$set(this, 'dropzone', Vue.observable(this.dropzone))
    let _this = this

    // Avoiding wasting resources on things user isn't using
    if (this.hasCustomSlotTemplate) {
      setInterval(function () {
        if (JSON.stringify(_this.files) !== JSON.stringify(_this.getFiles)) {
          // Leave this, this triggers the updating of data from the Dropzone component
        }
      }, 100)
    }
  },
  data() {
    return {
      files: [],
      filesOriginal: [],
      filesOriginalStringify: []
    }
  },
  watch: {
    'getFiles': {
      deep: true,
      async handler(newData) {
        var files = JSON.parse(JSON.stringify(this.filesOriginal));
        if (this.hasCustomSlotTemplate) {
          var filesOriginal = this.filesOriginal
          for (var index = 0; index < filesOriginal.length; index++) {
            // Not trying to convert any images that's not supported
            if (this.isSupportedImageFileType(filesOriginal[index].type)) {
              // Reusing already converted image to increase performance
              if (this.files[index] === undefined || this.files[index].dataUrl === undefined) {
                files[index].dataUrl = await toBase64(filesOriginal[index])
              } else {
                files[index].dataUrl = this.files[index].dataUrl
              }
            }
          }
        }
        this.$set(this, 'files', files)
      }
    }
  },
  computed: {
    getFiles: {
      cache: false,
      get() {
        if (typeof this.dropzone === 'undefined') {
          return []
        }

        var files = this.dropzone.files
        if (JSON.stringify(this.filesOriginalStringify) !== JSON.stringify(files)) {
          this.$set(this, 'filesOriginal', files)
          this.$set(this, 'filesOriginalStringify', JSON.parse(JSON.stringify(files)))
        }

        return files
      }
    },
    hasCustomSlotTemplate() {
      // Simple check to see if a template exists
      return !!this.$slots['template'] || !!this.$scopedSlots['template'];
    },
  },
}
export default {
  reactiveTemplate
}