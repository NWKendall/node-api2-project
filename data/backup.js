
// POST Requests (comments)  
router.post("/:id/comments", (req, res) => {
  // const Id = req.params.id; // post ID
  const text = req.body

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

          // if / else here?
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



// so if there is no newComment.text we'll send a 400 status code telling them "hey guy, put in some text"
// or else
// we can bring insertComment(data)
// and then do our .then & .catch
// and then within our .then and .catch we'll another if else inside it
// something like .then(comment ....
// if there is (comment)
// we'll send a res.status code of 201
// which means created
// or else we'll send a res.status code of 404
// which mean that the post does not exist
// and then we can do our .catch
