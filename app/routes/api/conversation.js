
var router = require('express').Router();
var auth = require('../auth');
var mongoose = require('mongoose');
var ConversationFlow = mongoose.model('ConversationFlow');


router.get('/conversation', auth.required, function(req, res, next){

  ConversationFlow.findById("default").then(function(conversation){
    if(!conversation) { return res.sendStatus(404); }
    
    const resJson = conversation.toJSON();
    delete resJson._id;
    
    return res.json(resJson);
  }).catch(next);
});


  module.exports = router;