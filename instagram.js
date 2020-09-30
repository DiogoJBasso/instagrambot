const puppeteer = require('puppeteer')
const BASE_URL = 'https://www.instagram.com/';
const GRUPO_NOME = ['"grupo"'] //CONFIGURAÇÕES: coloque aqui o grupo que deseja entrar
const comentarios = ['Sensacional o trabalho!', 'Top','legal demais!'] //CONFIGURAÇÕES: digite aqui os comentários que você deseja nas fotos
const instagram = {
    browser: null,
    page: null,

    initialize: async()=>{
        //Está abrindo o navegador e indo para a página do instagram.
        instagram.browser = await puppeteer.launch({ headless:false })
        instagram.page = await instagram.browser.newPage()
        await instagram.page.goto(BASE_URL, {waitUntil:'networkidle2'})
    },
    login: async(username, password)=>{
        await instagram.page.waitForTimeout(400) //esperando o HTML carregar.
        await instagram.page.type('input[name=username]',username, {delay:50}) //digitando o login e senha
        await instagram.page.type('input[name=password]',password, {delay:50})
        loginbutton = await instagram.page.$x('//div[contains(text(), "Entrar")]')//toda vez que estiver escrito dentro
        await loginbutton[0].click()
    },
    engajamento: async()=>{
        for (let grupo of GRUPO_NOME){
            await instagram.page.waitForTimeout(5000);
            let savelogin = await instagram.page.$x('//button[contains(text(), "Agora não")]');
            await savelogin[0].click();
            await instagram.page.waitForTimeout(5000);
            let notifications = await instagram.page.$x('//button[contains(text(), "Agora não")]');
            await notifications[0].click();
            let direct = await instagram.page.$$('svg[aria-label="Direct"]');
            await direct[0].click();
            await instagram.page.waitForTimeout(5000);
            console.log(grupo);
            let searchgrupo = await instagram.page.$x('//div[contains(text()="diogojbasso")]');
            console.log(searchgrupo)
            await searchgrupo[0].click();
            await instagram.page.waitFor(10000)
            let post = await instagram.page.$$('div[aria-disabled="false"]')
            for (let index = 0; index < post; index++) {
                const element = array[index];
                await element.click();
                await instagram.waitForTimeout('body[style="overflow: hidden;"]'); //verifica se o modal abriu
                await instagram.page.waitForTimeout(1000);
                let islike = await element.$('svg[aria-label="Curtir"]');
                if (islike){
                    await element.click('svg[aria-label="Curtir"]') //curti
                    await element.click('svg[aria-label="Salvar"]') //salva
                    await instagram.page.type('textarea[aria-label="Adicione um comentário..."]',comentarios[Math.floor(Math.random() * (comentarios.length+1))], {delay:50})
                    await instagram.page.waitForTimeout(2000);
                    publicbutton = await instagram.page.$x('//button[contains(text(), "Publicar")]')
                    await publicbutton[0].click();
                    
                }
                let fechar = await instagram.page.$x('svg[aria-label="Fechar"]');
                await fechar[0].click();
                await instagram.page.waitForTimeout(2000);
                
            }
        }
    }
}

module.exports = instagram;