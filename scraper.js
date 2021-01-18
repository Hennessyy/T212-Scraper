const puppeteer = require('puppeteer');
const BASE_URL = 'https://live.trading212.com/';
const exportExcel = require('./exportService');
const delay = require('./delay');
const excelName = "MyStocks";
const filePath = './outputFiles/excel-stock.xlsx';
const tableheaders = ["Stock Abrv","Stock Name:","Position Number", "Quantity", "Price", "Current Price", "Market Value", "Result", "Result %", "", ""];


            
async function scrapeStock(url){
    const browser = await puppeteer.launch({
       //Setting default browser to edge.
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
        //headless: false   -- Useful for viewing what is happening in the browser
    });

    const page = await browser.newPage();

    //Increasing viewport for viewability.
    //await page.setViewport({ width: 1800, height: 1220});  -- 

    //Going to url and waiting for the page to be fully loaded.
    await page.goto(url, {waitUntil: 'networkidle2'});

    await page.type('input[name="login[username]"]', 'here');    // <--- Enter your trading 212 email address

    await page.type('input[name="login[password]"]', 'here');  // <--- Enter your trading 212 password

    await page.click('input[type="submit"]');


//Delay is required as the trading 212 animation takes time to load.
    console.log('Delay initiated');
    await delay(15000);
    console.log('Delay finished: 15s ... Page should be loaded.');
    


try{
    //Removing the account confirmation message that pops up by selecting confirm.
    await page.waitForSelector('div[id="uniqName_0_33"]');
      

             
//Scraping the contents of the table with my positions.

    const stocks = await page.evaluate(() => {
        const rows = document.querySelectorAll('tr');
        return Array.from(rows, row => {
          const columns = row.querySelectorAll('td');
          return Array.from(columns, column => column.innerText);
        });
      });
      
    
    //Exporting the contents to a csv format for viewing.
    exportExcel(stocks, tableheaders, excelName, filePath);
      

   }catch(err){
       console.log("Ooops something went wrong - " + err);
 }
      

    console.log("Closing browser - Action complete")
    browser.close();
}

scrapeStock(BASE_URL);
