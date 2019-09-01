
var fs = require('fs'); 
var csv = require('fast-csv');
var mongoose = require('mongoose');
var ConversationFlow = mongoose.model('ConversationFlow');

module.exports = {
    loadCsv : function(path, isDefault){

        const json = {units: [], conditions: []};
        const paths = {};
    
        const methods = {
            "Unit" : function(row){
                const i = json.units.push({id: row["Id"], responses: [], options: []});
                paths[row["Id"]] = json.units[i-1]; 
            },
            "Response" : function(row){
                const u =paths[row["Contained By"]];
                u.responses.push(row["Text"]);
            },
            "Option" : function(row){
                const u =paths[row["Contained By"]];
                const p = u.options.push({label: row["Text"]});
                paths[row["Id"]] = u.options[p-1];
            },
            "Textarea" : function(row){
                const u = paths[row["Contained By"]];
                u.component = {type: row["Component"].toLowerCase()};
                paths[row["Id"]] = u.component;
            },
            "Line" : function(row){
                const el = paths[row["Line Source"]];              
                if(!row["Text"]) {
                    el.next = parseInt(row["Line Destination"]);
                } else {
                    el.next.push({value: row["Text"], next: parseInt(row["Line Destination"])});
                }
            },
            "Condition" : function(row){
                const i = json.conditions.push({id: row["Id"], expression: row["Expression"], next: []});
                paths[row["Id"]] = json.conditions[i-1]; 
            }
        }
    
        fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on('data', row => methods[row["Component"]](row))
        .on('end', rowCount => {

            if(isDefault) json._id = "default";

            var conversationFlow = new ConversationFlow(json);

            ConversationFlow.findOneAndUpdate({_id: json._id}, json, {upsert:true}).then(function(_conversationFlow){
                console.log("CSV ["+json._id+"] loaded with success.");
            }).catch(function(err){
                console.log(err);
            });

            return json;
        });
    }
    
}
