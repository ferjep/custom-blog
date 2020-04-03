const blogCtrl = {}
const fs = require('fs')
const path = require('path')
const configPath = path.join(__dirname, '..', 'config', 'blog.config.json')

blogCtrl.getConfig = (req, res) => {
  fs.readFile(configPath, 'utf8', (err, data) => {
    if (err)
      return res.json({
        ok: false,
        msg: 'Could not get the config'
      })
    console.log('Config found', JSON.parse(data))
    return res.json({ ok: true, msg: 'Config found', config: JSON.parse(data) })
  })
}

blogCtrl.updateConfig = (req, res) => {
  console.log('Update config', req.body)
  const { ...data } = req.body

  fs.writeFile(configPath, JSON.stringify(data), err => {
    if (err)
      return res.json({
        ok: false,
        msg: 'Could not update the config'
      })

    console.log('Config updated', data)
    return res.json({ ok: true, msg: 'Config updated', config: data })
  })
}

module.exports = blogCtrl
