let express = require('express')
let router = express.Router() 
let event_controller = require('../controllers/events')

router.post('/createevent', event_controller.create_event)

router.get('/getallevents', event_controller.get_all_events)

router.get('/geteventbyid/:id', event_controller.get_event_by_id)

router.get('/geteventbyidwithuserdata/:eid', event_controller.get_event_by_id_with_userdata)

router.get('/geteventscreatedbyuser/:uid', event_controller.get_events_created_by_user)

router.put('/editevent/:eid', event_controller.update_event)

router.put('/cancelevent/:eid', event_controller.cancel_event)

module.exports = router