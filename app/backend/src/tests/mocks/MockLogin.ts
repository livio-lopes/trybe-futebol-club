import { password } from "../../database/config/database"

const validEmail = 'bode@espiatorio.com'
const validPassword = '123456'

const loginEmailRequired = { email: '', password: validPassword }
const loginPasswordInvalid = { email: validEmail, password: '' }
const loginValid = { email: validEmail, password: validPassword }


export default {
  loginEmailRequired,

  loginPasswordInvalid,
  loginValid
}