const ig = require('./instagram');

(async()=>{
    await ig.initialize();

    await ig.login('test.account.bot', 'lixo.tralha1')//CONFIGURAÇÕES: COLOCAR O NOME DE USUÁRIO E SENHA RESPECTIVAMENTE

    await ig.engajamento();
})()