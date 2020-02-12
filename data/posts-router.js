const express = require("express");
const db = require("./db");

const router = express.Router();

// GET (POSTS) ✅
router.get("/", (req, res) => {  
  db.find()
  .then(posts => {
    res.status(200).json(posts)
  }).catch(err => {
    console.log(err)
    res.status(500).json({ error: "The posts information could not be retrieved."})
  })
})

// GET (COMMENTS) ✅
router.get("/:id/comments", (req, res) => {
  const id = req.params.id
  db.findPostComments(id)
  .then(comment => {
    !comment 
      ? res.status(404).json({ message: "The posts with the specified ID does not exist." })
      : res.status(200).json(comment)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: "The comments information could not be retrieved."})
  })
})

// GET - individual (posts) ✅
router.get("/:id", (req, res) => {
  const id = req.params.id
  db.findById(id)
  .then(post => {
    !post 
      ? res.status(404).json({ message: "The post with the specified ID does not exist." })
      : res.status(200).json(post)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: "The post information could not be retrieved."})
  })
})

// POST Requests (posts) ✅
router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if(!title || !contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  } else {
    db.insert(req.body)
      .then(({id}) => {
        db.findById(id)
          .then(newPost => {
            res.status(201).json(newPost)
          })
          .catch(err => {
            console.log(`this is error from findById`, err)
            res.status(500).json({ error: "There was an error while saving the post to the database" })
          })      
      })
      .catch(err => {
        console.log(`this is error from insert`, err)
        res.status(500).json({ error: "There was an error while saving the post to the database" 
      })
    })
  }  
})

// POST Requests (comments)  
router.post("/:id/comments", (req, res) => {
  const Id = req.params.id; // post ID

  db.findById(Id)
    .then(post => {      
      console.log(`this is post`, post) 
      // control return as much as possible, empty array
      // cons
      if (post === []) {  
        res.status(400).json({ message: "Please provide text for the comment." })
      } else {
        db.insertComment(req.body)   
        // console.log(`this is req.body`, req.body) 

        .then(err => {
          console.log(`XXXXXXX`, err)
          db.findCommentById(err)
          console.log(`this is req.body`, req.body) 

            .then(newComment => {
              res.status(201).json(newComment)
            })
            .catch(err => {
              console.log(`this is error from insert`, err)
              res.status(404).json({ error: "The post with the specified ID does not exist." })
            })
          })  
        .catch(err => {
          console.log(`this is error from insert`, err)
          res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
    }
  })
})


// DELETE (post) ✅
router.delete("/:id", (req, res) => { 
  db.remove(req.params.id)
  .then(removed => {
    !removed 
      ? res.status(404).json({ message: "The post with the specified ID does not exist." })
      : res.status(200).json(removed)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: "The post could not be removed"  })
  })
})

// PUT (comments)  ✅
router.put("/:id", (req, res) => {
  const { title, contents } = req.body; 
  const id = req.params.id

  if(!title || !contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  } else {
    db.update(id, req.body)
    .then(edit => {
      !edit 
        ? res.status(404).json({ message: "The post with the specified ID does not exist." })
        : res.status(200).json(edit);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "The post information could not be modified." })
    })
  }
})

module.exports = router;