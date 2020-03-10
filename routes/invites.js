let express = require('express')
let router = express.Router()

const invite_controller = require('../controllers/invites')

router.post('/sendinvite', invite_controller.send_invite)

router.put('/acceptinvite/:iid', invite_controller.accept_invite)

router.put('/rejectinvite/:iid', invite_controller.reject_invite)

router.put('/cancelinvite/:iid', invite_controller.cancel_invite)

router.get('/getinviteduserstoevent/:eid', invite_controller.get_invited_users_to_event)




module.exports = router