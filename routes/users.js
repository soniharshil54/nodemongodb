let express = require('express')
let router = express.Router()
let checkAuth = require('../middlewares/checkAuth')

let user_controller = require('../controllers/users')

router.post('/register', user_controller.register_user)

router.post('/login', user_controller.user_log_in)

router.get('/getusers', user_controller.get_users)

router.get('/getuserbyid/:uid', user_controller.get_user_by_id)

router.put('/updateuser/:uid', user_controller.update_user)

router.delete('/deleteuser/:uid', user_controller.delete_user)

router.delete('/deleteusers', user_controller.delete_multiple_users)

module.exports = router