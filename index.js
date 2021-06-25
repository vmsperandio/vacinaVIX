var user = require("./dados.json")

const { Builder, By, Key, until } = require("selenium-webdriver");
var webdriver = require("selenium-webdriver");
require("chromedriver");

async function vitoria() {
    var driver = new webdriver.Builder().forBrowser("chrome").build();
    await driver.manage().setTimeouts({ implicit: 10000 });
    try {
        await driver.get("https://agendamento.vitoria.es.gov.br/");
        await driver
            .findElement(By.id("categoria"))
            .sendKeys(user.categoria, Key.RETURN);
        await driver
            .findElement(By.id("servico"))
            .sendKeys(
                user.servico,
                Key.RETURN
            );
        await driver.findElement(By.css(".btn-primary:nth-child(2)")).click();
        await driver
            .findElement(By.id("unidade"))
            .sendKeys(user.unidade, Key.RETURN);
        await driver.findElement(By.css(".btn-primary:nth-child(3)")).click();
        await driver.findElement(By.id("data")).sendKeys(user.data, Key.RETURN);
        await driver.findElement(By.id("horario")).sendKeys(user.horario, Key.RETURN);
        await driver.findElement(By.id("documento")).sendKeys("CPF", Key.RETURN);
        await driver
            .findElement(By.id("numero"))
            .sendKeys(user.CPF, Key.RETURN);
        await driver
            .findElement(By.id("nome"))
            .sendKeys(user.nome, Key.RETURN);
        await driver
            .findElement(By.id("telefone"))
            .sendKeys(user.telefone, Key.RETURN);
        await driver
            .findElement(By.id("email"))
            .sendKeys(user.email, Key.RETURN);
        await driver.findElement(By.css(".btn-success")).click();

        await driver.wait(
            until.elementIsVisible(driver.findElement(By.css(".confirm"))),
            3000
        );
        await driver.wait(
            until.elementLocated(By.css(".confirm")),
            10000,
            "Timed out after 10 seconds",
            2000
        );
        await driver.findElement(By.css(".confirm")).click(); // Confirmar
    } catch {
        await driver.quit();
        await vitoria();
    } finally {
        await driver.quit();
    }
}

async function agendar() {
    await vitoria();
}

agendar();