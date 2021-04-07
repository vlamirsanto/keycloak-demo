const Keycloak = require('keycloak-connect');
const hogan = require('hogan-express');
const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken')

const app = express();

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

app.set('view engine', 'html');
app.set('views', require('path').join(__dirname, '/views'));
app.engine('html', hogan);

app.get('/', function (_, res) {
  res.render('index');
});

const memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
}));

const keycloak = new Keycloak({
    store: memoryStore,
  },
  {
    "realm": 'tech-day',
    "realm-public-key" : "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAksb5+4MDfPSSOqJG9Mmdb3GoqpfZK+RPrMnmRcVNKuNwKSSEMkyZGHNE4glZNQqV4z+iLffBba4ywKDCanv8fv8xue5hAGEH4pAX9c4FOYvl5alK2xpYah4eOzBt02Rfn5eMzrkRa84Hwm1ESH64eIlFZBWDQjwXrIpXx4xxqmNUbPz/Qj4M4vXQELFtoI+GhBlJgYGJtgxxYFfi6RHuskm5tm+vZt6+MoD9MjUtqPKE4ib8Gt/H+rBAcb16GlLVxNFeM+GMWms6UyOWzujjokhPSwQoWsGeHAxOmbQtaseVl0zu8oi4qZcy9sxrzhH4aTuDwiRv2nNo6QUVWfedcQIDAQAB",
    "auth-server-url" : "http://localhost:8080/auth",
    "ssl-required" : "external",
    "resource" : 'app-node',
    "public-client" : true
  }
);

app.use(keycloak.middleware({
  logout: '/logout',
  admin: '/',
  protected: '/protected/resource'
}));

app.get('/login', keycloak.protect(), function (req, res) {
  // const token = JSON.stringify(JSON.parse(req.session['keycloak-token']), null, 4);
  const token = JSON.parse(req.session['keycloak-token']);

  res.render('index', {
    result: JSON.stringify(token, null, 4),
    event: '1. Authentication\n2. Login',
    decode: jwt.decode(token.id_token, {complete: true}),
  });
});

app.get('/protected/resource', keycloak.enforcer(['resource:view', 'resource:write'], {
  resource_server_id: 'nodejs-apiserver'
}), function (req, res) {
  console.log(res);
  res.render('index', {
    result: JSON.stringify(JSON.parse(req.session['keycloak-token']), null, 4),
    event: '1. Access granted to Default Resource\n'
  });
});