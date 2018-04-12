"use strict"

var express = require('express');
var router = express.Router();
var TodoList = require('../models/list');

/* GET Todo-List */
router.get('/getItems', function(req, res, next) {
  TodoList.find({},{_id:1,name:1,description:1}).sort({created:-1}).then(function(result){
    if (result.length>0) {
      res.send({
        success:true,
        data:result
      })
    }
    res.send({
      success:false,
      msg:"No more list present to fetch"
    })
  }).catch(function(error){
    res.send(error)
  })
});

//insert the Todo-List 
router.post('/addItems', function(req, res, next) {
   let list = new TodoList({
    name : req.body.name,
    description : req.body.description,
  })
  list.save(function(err){
    if (!err) {
      res.send({
        success: true,
        msg: 'successfully inserted your list item'
      });
    }else{
      res.send({
        success: false,
        msg: 'unable to insert your list items'
      });
    }
  })
});

//delete the list item
router.delete('/deleteItem/:itemId', function(req, res) {
  // console.log(req.body)

  TodoList.remove({ _id: req.params.itemId }, function(err) {
    if (!err) {
      res.send({
        success: true,
        msg: 'successfully deleted list item '
      });
    }
    else {
      res.send({
          success: false,
          msg: 'unable to delete your list items'
      });
    }
  });


});

module.exports = router;
