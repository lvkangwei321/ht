import mailView from '../views/mail.art'

export const mail = (req, res, next) => {
  res.render(mailView())
}