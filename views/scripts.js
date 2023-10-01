<!-- CKEditor script -->
<script src="https://cdn.ckeditor.com/ckeditor5/36.0.1/classic/ckeditor.js"></script>

<!-- Your CKEditor configuration script -->
<script>
  ClassicEditor
    .create(document.querySelector('#editor'), {
      plugins: ['EasyImage', 'Image', 'ImageCaption', 'ImageToolbar'], // Include other plugins as needed.
      toolbar: ['heading', '|', 'bold', 'italic', 'link', 'EasyImage'], // Add EasyImage to your toolbar.
      // Configure the EasyImage plugin to use your image upload endpoint.
      // Replace 'your-image-upload-url' with your actual server endpoint.
      easyImage: {
        uploadUrl: 'localhost:3000/blogs',
      },
    })
    .catch(error => {
      console.error(error);
    });
</script>

<!-- Your existing script -->
<script src="js/script.js"></script>
