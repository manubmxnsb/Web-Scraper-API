const puppeteer = require("puppeteer");
const {getSentiment} = require("./sentimentAnalyzer");
const url = 'https://wsa-test.vercel.app/';
const {titleXpath,descriptionXpath,imageXpath,hrefXpath} = require("./paths");

const getData = async () => {
    try {
        const payload = [];
        const browser = await puppeteer.launch({headless: false}, {executablePath: `/path/to/Chrome`});
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle0'});

        let hrefsArray = await page.$x(hrefXpath);
        let titleArray = await page.$x(titleXpath);
        let descriptionArray = await page.$x(descriptionXpath);
        let imgSrcArray = await page.$x(imageXpath);

        const titles = await page.evaluate((...titleArray) => {
            return titleArray.map(e => e.textContent)
        }, ...titleArray);

        const descriptions = await page.evaluate((...descriptionArray) => {
            return descriptionArray.map(e => e.textContent)
        }, ...descriptionArray);

        const link_urls = await page.evaluate((...hrefsArray) => {
            return hrefsArray.map(e => 'https://wsa-test.vercel.app' + e.textContent);
        }, ...hrefsArray);

        const imgSrc = await page.evaluate((...imgSrcArray) => {
            return imgSrcArray.map(e => 'https://wsa-test.vercel.app' + e.textContent);
        }, ...imgSrcArray);
        for (let i = 0; i < hrefsArray.length; i++) {
            await page.goto(link_urls[i]);
            const extractedText = await page.$eval('*', (
                el) => el.innerText
                .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
                .trim().split(/\s+/));

            const result = {
                title: titles[i],
                short_description: descriptions[i],
                image: imgSrc[i],
                href: link_urls[i],
                sentiment: getSentiment(extractedText),
                words: extractedText.length.toString()
            }
            payload.push(result);
            await page.goBack();
        }
        await browser.close();
        return(payload);
    }
    catch(err) {
        console.log(err);
    }
}
module.exports = { getData }
