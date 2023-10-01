const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');
const sendEmail = require('../sendEmail');


//blog routes
router.get('/create', auth.protec_user, blogController.blog_create_get);

router.get('/', blogController.blog_index);

router.post('/', blogController.blog_create_post);

router.post('/ckeditor', blogController.ck_Editor);

router.get('/:id', blogController.blog_details);

router.delete('/:id', blogController.blog_delete);

// Define the route for editing a post
router.get('/edit/:id', auth.protec_user, blogController.blog_edit_get);

// Process the edit form submission (PUT request)

router.put('/edit/:id', auth.protec_user, blogController.blog_edit_put);

//contact routes
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
  });

  // Handle contact form submission
router.post('/contact', (req, res) => {
    //  use req.body to access form data
    const { name, email, phone, message } = req.body;

    // Add logic to handle form submission here
    sendEmail(name, email, phone, message);

    // Example: Sending a response with a success message
    res.render('contact', { successMessage: 'Your message has been sent successfully!' });
});

module.exports = router;