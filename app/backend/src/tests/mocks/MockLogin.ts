const validEmail = 'user@user.com'
const validPassword = 'secret_user'

const loginEmailRequired = { email: '', password: validPassword }
const loginPasswordRequired = { email: validEmail, password: '' }
const loginValid = { email: validEmail, password: validPassword }
const loginEmailInvalid = { email: 'invalid.bode.com', password: validPassword }
const loginPasswordInvalid = { email: validEmail, password: '123' }
const loginEmailNotFound = { email: 'notfound@batata.com', password: validPassword }
const loginPasswordNotFound = { email: validEmail, password: 'notfound' }


const userLogged = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

export default {
  loginEmailRequired,
  loginPasswordRequired,
  loginEmailNotFound,
  loginEmailInvalid,
  loginPasswordInvalid,
  loginPasswordNotFound,
  loginValid,
  userLogged
}