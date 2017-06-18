# Servidor - Instransactions

## Uso

Rodando
```javascript
npm start
```

Gerando documentacao de api
```javascript
npm run apidoc
```

Gerando documentacao de codigo
```javascript
npm run jsdoc
```

Rodando os testes
```javascript
npm test
```

### Usando portas reservadas
Configurando para usar as portas reservadas do sistema (geralmente 80 e 443)

Instale o `authbind`
```
sudo apt-get install authbind
```

Configure as portas desejadas 

```
sudo touch /etc/authbind/byport/80
sudo chown user /etc/authbind/byport/80
sudo chmod 755 /etc/authbind/byport/80

sudo touch /etc/authbind/byport/443
sudo chown user /etc/authbind/byport/443
sudo chmod 755 /etc/authbind/byport/443
```

Rodando com `authbind`
```
authbind --deep npm start
```