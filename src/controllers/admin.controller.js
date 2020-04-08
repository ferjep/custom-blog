const jwt = require('jsonwebtoken')
const adminCtrl = {}

adminCtrl.login = (req, res) => {
  const { username, password } = req.body

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ ok: false, msg: 'Invalid admin' })
  }

  jwt.sign(
    { username, password },
    process.env.SECRET_ACCESS_KEY,
    { expiresIn: '1h' },
    (err, token) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ ok: false, msg: 'Something went wrong' })
      }
      console.log('token', token)
      return res
        .cookie('accessToken', token, { httpOnly: true })
        .json({ ok: true, msg: 'Admin logged in' })
    }
  )
}

adminCtrl.logout = (req, res) => {
  res.send()
}

adminCtrl.verifyToken = (req, res, next) => {
  const { accessToken } = req.cookies

  if (!accessToken)
    return res.status(401).json({ ok: false, msg: 'Not authorized' })

  jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY, {}, (err, token) => {
    if (err)
      return res
        .status(401)
        .json({ ok: false, msg: 'Invalid token, not authorized' })
    console.log('Admin user')
    return next()
  })
}

module.exports = adminCtrl
