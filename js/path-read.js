var db = {
  init: function(callback) {
    AWS.config.update({accessKeyId: 'AKIAIPCCCSQMN5WXBBSA', secretAccessKey: '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', region: 'us-west-2'});
    db.instance = new AWS.DynamoDB();
    callback && callback();
  },
  getPaths: function() {
    db.instance.scan({
      'Limit': 10,
      'TableName': 'PerfectPath'
    }, function(err, data) {
      if (err) {
        console.log('error', err);
        return;
      }
      data.Items.forEach(function(item) {
        if (item.title) {
          $('<li/>')
          .append($('<a/>', {
            href: '/path-show?id=' + item.id.S,
            text: item.title.S
          }))
          .appendTo('ul.path-list');
        }
      });
    })
  }
}

$(document).ready(function() {
  db.init(function() {
    db.getPaths(function(paths) {

    });
  });
});