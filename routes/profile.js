const express = require('express')
const router = express.Router();
const SeedData = require('../models/seed.js');
const Insta = require('../models/insta.js');
const { update } = require('../models/insta.js');


//seed route
router.get('/seed', (req, res) => {
    Insta.create(SeedData, (err, seedPost) => {
        res.redirect('/profile')
    })
})

//new route
router.get('/new', (req, res) => {
    res.render('new.ejs')
})


router.post('/', (req, res) => {
    let tagElement = req.body.tag.split(',');
    const defaultUrl = "https://i.imgur.com/tdi3NGa.png";
    let profilePic;
    if (req.body.profilePhoto === '') {
        profilePic = defaultUrl;
    } else{
        profilePic = req.body.profilePhoto
    }
    
    const newPost = new Insta({
        username: req.body.username,
        profilePhoto:profilePic,
        img: req.body.img,
        caption: req.body.caption,
        tag: tagElement,
        time: req.body.time
    })
    console.log('req.body' + req.body);
    console.log('new post' + newPost)
    Insta.create(newPost, (err, createdPost) => {
        res.redirect('/profile')
    })
})


//index route
router.get('/', (req, res) => {
    Insta.find({}, (err, allPost) => {
        res.render('index.ejs', {
            insta : allPost
        })
        
    })
})

//search route
router.get("/search", (req, res) => {
    console.log(req.query.q)
    Insta.find({ $or: [{ tag: req.query.q}, { caption: req.query.q },{ username: req.query.q }] }, (err, foundPost) => {
        if (err) {
            res.send('No post found!') 
        } else {
            
            res.render('index.ejs', {
                insta: foundPost
            })
        }
        
    })
})

// //sort route
// router.put('/sort', (req, res) => {
//     Insta.aggregate([{ $sort: { time: 1 } }], (err, post) => {
//         res.render('index.ejs', {
//             insta:post
//         })
//     })
// })
//show route
router.get('/:id', (req, res) => {
    
 Insta.findById(req.params.id, (err, foundPost) => {
     
     res.render('show.ejs', {
         insta: foundPost,
         
     })     
 })
})

//edit route
router.get('/:id/edit', (req, res) => {
    Insta.findById(req.params.id, (err, foundPost) => {
        
        res.render('edit.ejs', {
            insta:foundPost
        })     
    })
})

router.put('/:id', (req, res) => {
    console.log(req.body)
    let tagElement = req.body.tag.split(',')
    console.log(tagElement)
    Insta.updateOne({ _id: req.params.id },
        { $set: { username:req.body.username,profilePhoto:req.body.profilePhoto,img: req.body.img, caption: req.body.caption, tag: tagElement } }, (err, updatedLog) => {

        res.redirect('/profile/'+req.params.id)
    })
})

//delete route
router.delete('/:id', (req, res) => {
   
    Insta.deleteOne({ _id: req.params.id }, (err, selectedPost) => {
        if (err) {
            return console.error(err);
        }
        console.log('Post with id:', req.params.id, 'is now deleted');

        res.redirect('/profile')
    });
    
})



module.exports = router;