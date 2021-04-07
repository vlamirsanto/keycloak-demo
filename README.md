### Baixando e carregando o Keycloak

```sh
docker run --name keycloak -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin --network=tech-day-network -d quay.io/keycloak/keycloak:12.0.4
```

### Exportando o keycloak com ngrok

```sh
./ngrok http 8080
```

#### OpenID Connect

- É um layer que fica acima do OAuth2, ou seja, além de receber o accesToken recebe idToken com as informações do usuário para um processo de autenticação;
- O OAuth2 trabalha com a autorização e o OpenID Connect trabalha com a autenticação.

#### Caso a imagem do database não suba

```sh
docker run --name docker-database -d -p 3306:3306 -v $HOME/docker-databases/docker-database:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root mysql:5.7
```

### Pendências

- Criação, lembrete e reset de senha - ok
- Internacionalização - ok
- Login federado
- Alteração de tema
