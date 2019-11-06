import SMERouter from 'sme-router'
import {index} from '../controllers/indexView'
import {login} from '../controllers/loginView'
import {mail} from '../controllers/mailView'
import {register} from '../controllers/registerView'
import {user} from '../controllers/userView'
import {goods} from '../controllers/goodsView'
import {user_add} from '../controllers/user_add'
import {goods_add} from '../controllers/goods_add'
import {goods_update} from '../controllers/goods_update'
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
router.route('/index/user_add',user_add)
router.route('/index/goods_add',goods_add)
router.route('/index/goods_update',goods_update)
router.route('/index/goods_list/:page',goods)
export default router
