import SMERouter from 'sme-router'
import {index} from '../controllers/indexView'
import {login} from '../controllers/loginView'
import {mail} from '../controllers/mailView'
import {register} from '../controllers/registerView'
import {user} from '../controllers/userView'
import {goods} from '../controllers/goodsView'
const router = new SMERouter('root')
router.route('/index', index)
router.route('/login', login)
router.route('/mail', mail)
router.route('/register', register)
router.route('*', (req, res, next) => {
  res.redirect('/login')
})
router.route('/index/user',user)
router.route('/index/goods',goods)

export default router
