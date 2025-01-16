const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Post = require('../models/post');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const { title, slug, summary, keywords, tags, optionalUrl, content, headContent } = req.body;

    // Upload image to Cloudinary
    let imageUploadResult;
    if (req.file) {
      imageUploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'posts',
      });
    }

    // Save post to database
    const post = new Post({
      title,
      slug,
      summary,
      keywords,
      tags,
      optionalUrl,
      content,
      headContent,
      imageUrl: imageUploadResult?.secure_url || null,
      imagePublicId: imageUploadResult?.public_id || null,
    });

    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the post' });
  }
});



// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
});

module.exports = router;
