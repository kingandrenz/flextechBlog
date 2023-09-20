const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const fileUpload = require("express-fileupload");
const auth = require('../middleware/auth');



//blog routes
router.get('/create', auth.protec_user, blogController.blog_create_get);

router.get('/', blogController.blog_index);

router.post('/', blogController.blog_create_post);

router.post('/ckeditor', blogController.ck_Editor);

router.get('/:id', blogController.blog_details);

router.delete('/:id', blogController.blog_delete);

module.exports = router;