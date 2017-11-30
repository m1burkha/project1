let express = require('express');
let path = require('path');
let router = express.Router();


// reference to the server controller
const controller = require('../controllers/notes-controller');

router.get('/', controller.retrieveNotes);
router.post('/', controller.storeNote);

// retrieve / find the selected note, with a specific id, method GET, PUT
router.get('/:id/', controller.findNote);
router.put('/:id/', controller.updateNote);
router.post('/:id/', controller.updateNoteStatus);

module.exports = router;

