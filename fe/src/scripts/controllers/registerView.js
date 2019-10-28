import registerView from '../views/register.art'

export const register = (req, res, next) => {
  res.render(registerView())
}