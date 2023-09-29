const router = express.Router();
//const redirectIfAuthenticated = require('../middleware/redirectIfAuthenticated');
const logoutController = require('../controllers/logoutController');


// Logout route
router.get('/', logoutController.logout_get);
//router.post('/', logoutController.logout_post);

module.exports = router;