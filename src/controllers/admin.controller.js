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
        console.log('Error logging admin', err)
        return res.status(500).json({ ok: false, msg: 'Something went wrong' })
      }
      console.log('Admin just logged in')
      return res
        .cookie('accessToken', token, { httpOnly: true })
        .json({ ok: true, msg: 'Admin logged in' })
    }
  )
}

adminCtrl.logout = (req, res) => {
  res
    .cookie('accessToken', null, { httpOnly: true })
    .json({ ok: true, msg: 'Admin Logged out' })
}

adminCtrl.verifyToken = (req, res, next) => {
  const { accessToken } = req.cookies

  if (!accessToken) {
    console.log('Invalid token')
    return res.status(401).json({ ok: false, msg: 'Not authorized' })
  }

  jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY, {}, (err, token) => {
    if (err) {
      console.log('Invalid token')
      return res
        .status(403)
        .json({ ok: false, msg: 'Invalid token, not authorized' })
    }
    console.log('Admin user')
    return next()
  })
}

adminCtrl.loggedIn = (req, res) => {
  console.log('Admin already logged in')
  res.json({ ok: true, msg: 'Valid token' })
}

module.exports = adminCtrl
