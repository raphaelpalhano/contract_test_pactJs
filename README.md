

# PactJS projeto

Nodejs + Jest projeto configuração contract tests PactJS
<br>
<br>

## Executar via CLI

- Abra o terminal na pasta root

- Install dependências
`npm install`

- Executar client/consumer que (vai gerar o contrato):
`npm run test:consumer`

- Executar provider/server que (vai verificar o contrato e validar):
`npm run test:provider`

- Executar o provider server  `http://localhost:8081`  (Client API/Service):
`npm run provider`

- Executar o consumer server `http://localhost:8080` (Client API/Service):
`npm run consumer`

- Publish the contracts:
`npm run publish:contract`


# Pontos importantes para configurar

1. Configurar as permissoes do proxy para o pact server local connection.

2. O arquivo root deve ter nome curto, e as pastas de testes não podem ultrapassar 80 char ao total

4. Configurar promisse para o response



# Pact Broker Configuration
Sem docker

1. Instale o Ruby
2. Instale o bundle

3. Clone o projeto pact-foundation: git clone git@github.com:pact-foundation/pact_broker.git && cd pact_broker/example
 
4. Agora execute bundle install e execute um comando de pacote para iniciar a interface do servidor web Ruby na porta 8080. 
bundle install
bundle exec rackup -p 8080
 
O corretor de pactos agora pode ser visualizado localmente em localhost:8080/groups/Example App/. 

Com Docker
Use Docker-compose para subir o postgresql e baixar a imagem do pactfoundation, conforme o script a seguir:

```yaml
version: "3"
 
services:
 pact-broker-postgres:
   image: postgres
   healthcheck:
     test: psql postgres --command "select 1" -U postgres
   ports:
     - "5432:5432"
   volumes:
     - postgres-volume:/var/lib/postgresql/data
   environment:
     POSTGRES_USER: postgres
     POSTGRES_PASSWORD: password
     POSTGRES_DB: postgres
    
 
 pact-broker:
   image: pactfoundation/pact-broker
   ports:
     - "9292:9292"
   depends_on:
     - pact-broker-postgres
   environment:
     PACT_BROKER_DATABASE_USERNAME: postgres
     PACT_BROKER_DATABASE_PASSWORD: password
     PACT_BROKER_DATABASE_HOST: pact-broker-postgres
     PACT_BROKER_DATABASE_NAME: postgres
     PACT_BROKER_LOG_LEVEL: DEBUG
    
volumes:
 postgres-volume:
```

**Verifique se a porta 9292 está livre e suba o servidor com `docker-compose up`.**


# O que é um teste de contrato?

Um teste de contrato verifica se um provedor cumpriu um contrato esperado por um serviço consumidor e garante que os serviços possam se comunicar entre si. Os testes de contrato são aplicáveis ​​em qualquer lugar onde dois serviços se comuniquem (uma API com o front-end, por exemplo).

Os Testes de Contrato podem empregar uma estrutura simples ou mais complexa, onde muitos fornecedores e consumidores se comunicam. Muitas vezes o provedor de um fluxo pode ser o consumidor de outro, como é comum em uma arquitetura de microsserviços.

# Provedores e Consumidores

O que constitui um provedor e um consumidor neste contexto? Um provedor é qualquer parte que fornece um serviço para interações com seus dependentes, enquanto um consumidor é qualquer parte que interage com um serviço dependente por meio de uma API. As interações entre diferentes APIs de back-end são um exemplo de relacionamento fornecedor-consumidor. Um front-end de navegador interagindo com uma API de back-end é outra.



# Contratos

Pense em um contrato como um acordo legalmente aplicável. Os contratos representam um conjunto de interações com requisições e estruturas de resposta/response esperadas.


# Broker

É onde os contratos são armazenados. Ele pode assumir a forma de qualquer servidor de ativos genérico, mas o suporte para controle de versão é ideal. Uma boa solução é usar o corretor Pact, que é adequado para essas necessidades exatas e é de código aberto. Dentro do Docker, um agente de fábrica personalizado pode ser construído.
