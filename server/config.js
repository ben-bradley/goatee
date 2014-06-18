var environments = {
  dev: require('./configs/dev')
};

// Add sugar
// =========
for (var e in environments) {
  var env = environments[e];
  env.server.uri = function() {
    return 'http://'+env.server.host+':'+env.server.port;
  };
  env.mongo.connectionString = function() {
    var cn = 'mongodb://';
    if (env.mongo.user)
      cn += env.mongo.user;
    if (env.mongo.pass)
      cn += ':'+env.mongo.pass+'@';
    return cn += env.mongo.host+':'+env.mongo.port+'/'+env.mongo.db;
  };
}

module.exports = environments;
