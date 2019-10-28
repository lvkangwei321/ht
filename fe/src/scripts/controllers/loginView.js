import loginView from '../views/login.art'

export const login = (req, res, next) => {
  res.render(loginView())
}