var db = {
  init: function(callback) {
    AWS.config.update({accessKeyId: 'AKIAIPCCCSQMN5WXBBSA', secretAccessKey: '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', region: 'us-west-2'});
    db.instance = new AWS.DynamoDB();
  },
  getPaths: function() {
    
  }
}

$(document).ready(function() {
  db.init(function() {
    db.getPaths(function(paths) {

    });
  });
});