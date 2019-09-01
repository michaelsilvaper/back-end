
var router = require('express').Router();
var passport = require('passport');
var { User, Token } = require('../../models/mysql');
var auth = require('../auth');

router.post('/users/login', function(req, res, next){

    if(!req.body.user.email){
      return res.status(422).json({errors: {email: "can't be blank"}});
    }
  
    if(!req.body.user.password){
      return res.status(422).json({errors: {password: "can't be blank"}});
    }
  
    passport.authenticate('local', {session: false}, function(err, user, info){
      if(err){ return next(err); }
  
      if(user){
        return res.json({user: user.toAuthJSON()});
      } else {
        return res.status(422).json(info);
      }
    })(req, res, next);
  });

  router.get('/user', auth.required, function(req, res, next){
    User.findByPk(req.payload.id).then(function(user){
      if(!user){ return res.sendStatus(401); }
  
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
  });
  

  router.post('/users', function(req, res, next){
    if(!req.body.user.email){
      return res.status(422).json({errors: {email: "can't be blank"}});
    }
  
    if(!req.body.user.password){
      return res.status(422).json({errors: {password: "can't be blank"}});
    }

    if(!req.body.user.name){
      return res.status(422).json({errors: {name: "can't be blank"}});
    }

    if(!req.body.user.idrole){
      return res.status(422).json({errors: {idrole: "can't be blank"}});
    }
    
    var user = new User();

    user.email = req.body.user.email;
    user.name = req.body.user.name;
    user.createdat = new Date();
    user.idrole = req.body.user.idrole;

    user.setPassword(req.body.user.password);

    user.save().then(function(_user){

      const response = user.toAuthJSON();
      const token = new Token();

      token.token = response.token;
      token.createdat = new Date();
      token.isvalid = true;
      token.iduser = _user.iduser

      token.save();

      return res.json({user: response});

    }).catch(next);

  });

  module.exports = router;