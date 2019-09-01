var mongoose = require('mongoose');

var ConversationFlowSchema = new mongoose.Schema({
    _id: String,
    units : [
      {
        _id : false,
        id: {type: Number},
        responses: [{ type: String }],
        options : [
          {
            _id : false,
            label: String,
            next: {type: Number}
          }
        ],
        component : {
          _id : false,
          type: {type: String},
          next: {type: Number}
        },
        next: {type: Number}
      }
    ],
    conditions : [{
      _id : false,
      id: {type: Number},
      expression: String,
      next: [
        {
          _id : false,
          value: Boolean,
          next: {type: Number}
        }
      ]
    }]
  },
  {
    versionKey: false,
    timestamps: false,
  });


mongoose.model('ConversationFlow', ConversationFlowSchema);
