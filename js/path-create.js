var db = {
  init: function(callback) {
    AWS.config.update({accessKeyId: 'AKIAIPCCCSQMN5WXBBSA', secretAccessKey: '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', region: 'us-west-2'});
    db.instance = new AWS.DynamoDB();
  },
  getPaths: function() {

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

  var drawnItems = new L.FeatureGroup().addTo(map);

  var drawControl = new L.Control.Draw({
    draw: {
      polygon: false,
          circle: false,
          rectangle: false
      },
    edit:{
      featureGroup: drawnItems
    }
  });

  map.addControl(drawControl);

  map.on('draw:created', function (e) {
      var type = e.layerType,
          layer = e.layer;

      if (type === 'marker') {
          layer.bindPopup(prompt("Enter marker title"));
      }

      drawnItems.addLayer(layer);
  });

  $('#save').click(function(){
    var id = guid();
    db.instance.putItem({
      'TableName': 'PerfectPath',
      'Item': {
        id: {
          S: id
        },
        data: {
          S: JSON.stringify(drawnItems.toGeoJSON()),
        },
        title: {
          S: prompt("Enter the title of your PerfectPath")
        }
      }
    }, function(err, data) {
      console.log(err, data);
      alert("Your PerfectPath is live at: http://davidql.github.io/localtrek/path-show.html?id=" + id);
    })
  });

  db.init();
});