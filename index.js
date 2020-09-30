const ig = require('./instagram');

(async()=>{
    await ig.initialize();

    await ig.login('user', 'senha')//CONFIGURAÇÕES: COLOCAR O NOME DE USUÁRIO E SENHA RESPECTIVAMENTE

    await ig.engajamento();
})()
