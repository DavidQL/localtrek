var db = {
  init: function(callback) {
    AWS.config.update({accessKeyId: 'AKIAIPCCCSQMN5WXBBSA', secretAccessKey: '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', region: 'us-west-2'});
    db.instance = new AWS.DynamoDB();
    callback && callback();
  },
  getPath: function(uuid,cb){
    db.instance.getItem({
      'TableName': 'PerfectPath',
      'Key': {
        'id': {
          'S': uuid
        } 
      }
    },function(e,d){
      if (e != null) {
        console.error(e)
      }
      cb(d.Item);
    })
  }
}

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

var guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

$(document).ready(function(){

  // Set up the basic map
  var map = L.map('map').setView([40.014986, -105.270546], 13);

  L.tileLayer('http://{s}.tiles.mapbox.com/v3/oddityoverseer13.kalffo8a/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
  }).addTo(map);



  db.init();
  db.getPath($.urlParam('id'), function(data) {
    var json = JSON.parse(data.data.S);
    var title = data.title;

    // Add the path to the map

    L.geoJson(json).addTo(map);

  })
});