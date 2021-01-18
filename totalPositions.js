//find current amount of positions in your account and print to console. -- Unused - keep for later.
    
const totalPositions = (page) =>{

    const [el] = await page.$x('//*[@id="uniqName_0_0"]/span[1]/span');

    const ePositionAmount = await el.getProperty('textContent');

    const PositionAmount = await ePositionAmount.jsonValue();

    
}


    


