import Header from '@editorjs/header'
import ImageTool from '@editorjs/image'

export default {
  header: Header,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile(file) {
          return new Promise((resolve, reject) => {
            const data = new FormData()
            data.append('file', file)
            fetch('/api/uploads/new', {
              method: 'post',
              body: data
            })
              .then(res => res.json())
              .then(json => {
                if (json.ok) {
                  return resolve({
                    success: 1,
                    file: {
                      url: `/api/uploads/${json.file.filename}`,
                      filename: json.file.filename
                    }
                  })
                } else {
                  reject({ success: 0, msg: json.msg })
                }
              })
          })
        },
        uploadByUrl(url) {
          return new Promise((resolve, reject) => {
            console.log('Url: ', url)
            fetch(url)
              .then(res => res.blob())
              .then(blob => {
                const data = new FormData()
                data.append('file', blob)

                fetch('/api/uploads/new', {
                  method: 'post',
                  body: data
                })
                  .then(res => res.json())
                  .then(json => {
                    if (json.ok) {
                      resolve({
                        success: 1,
                        file: {
                          url: `/api/uploads/${json.file.filename}`,
                          filename: json.file.filename
                        }
                      })
                    } else {
                      reject({ success: 0, msg: json.msg })
                    }
                  })
              })
              .catch(err => reject({ success: 0 }))
          })
        }
      }
    }
  }
}
