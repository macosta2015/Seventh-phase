const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
    try {
        //LAUNCHING BROWSER
        console.log('//LAUNCHING BROWSER');
        const browser = await puppeteer.launch({
            defaultViewport: { width: 800, height: 800 },
            headless: false,
            userDataDir: '/Users/marioacosta/Library/Application Support/Google/Chrome/Profile 1'
        });
        console.log('Browser launched successfully.');

        const newPage = await browser.newPage();
        console.log('New page opened successfully.');

        await newPage.goto('https://cad.onshape.com/documents?resourceType=resourcecompanyowner&nodeId=65efc5e06e5bec02f57742fe', { waitUntil: 'networkidle0', timeout: 0 });
        console.log('Page loaded successfully.');

        await newPage.type('input[name="email"].form-control', process.env.EMAIL);
        console.log('Typed email successfully.');

        await newPage.type('input[name="password"].form-control', process.env.PASSWORD);
        console.log('Typed password successfully.');

        console.log(await newPage.$eval('input[name="email"].form-control', input => input.getBoundingClientRect()));
        console.log(await newPage.$eval('input[name="password"].form-control', input => input.getBoundingClientRect()));

        await newPage.click('button.btn.btn-primary.os-signin-button');
        console.log('Clicked on the sign-in button successfully.');

        console.log(await newPage.$eval('button.btn.btn-primary.os-signin-button', button => button.getBoundingClientRect()));

        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log('Waited for 5 seconds.');

        await newPage.evaluate(() => {
            const thirdButton = document.querySelectorAll('.documents-filter-icon')[2];
            if (thirdButton) {
                thirdButton.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                console.log(thirdButton.getBoundingClientRect());
            } else {
                console.error('Third button not found.');
            }
        });

        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Waited for 2 seconds.');

        await newPage.evaluate(() => {
            const thirdButton = document.querySelectorAll('.documents-filter-icon')[2];
            if (thirdButton) {
                thirdButton.click();
            } else {
                console.error('Third button not found.');
            }
        });

        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Clicked on the third button.');

        //LAUNCHIG FILE NAME
        console.log('//LAUNCHIG FILE NAME, Scale Sketch Example - Copy - Copy');
        await newPage.evaluate(() => {
            const documentNameElement = document.querySelector('span[aria-label="Document name: Scale Sketch Example - Copy - Copy"][ng-bind-html="document.resultHighlight"]');
            if (documentNameElement) {
                documentNameElement.click();
            } else {
                console.error('Element with text "Scale Sketch Example - Copy - Copy" not found.');
            }
        });

        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log('Waited for 3 seconds.');

        // ADDING A NEW SKETCH
        console.log('Waiting for the Sketch button to appear...');
        await newPage.waitForSelector('div.toolset [command-id="newSketch"]', { visible: true });
        console.log('Sketch button found. Clicking on it...');
        await newPage.click('div.toolset [command-id="newSketch"]');
        console.log('Clicked on the Sketch button.');
        console.log('Waiting 10 seconds. TESTING TOP CLICK');
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds
        await newPage.click('div[data-id="M9bsVubdGCsYO08ys"][data-bs-original-title="Top"]');
        console.log('Waiting 10 seconds.');
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds
        await newPage.click('div.ns-dialog-button-ok.button-ok');
        console.log('Waiting 10 seconds.');
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds





        // await newPage.mouse.move(400, 448);
        // console.log('Mouse moved to X:400, Y:448');
        // await newPage.mouse.down({ button: 'right' });
        // console.log('Right mouse button clicked and held at X:400, Y:448');
        // await newPage.mouse.up({ button: 'right' }); // Release the right mouse button
        // console.log('Right mouse button released.');

        console.log('Waiting 10 seconds.');
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds



        //RIGHT CLICK OPTIONS  
        console.log('RIGHT CLICK OPTIONS:');
        await newPage.evaluate(() => {
            const thirdButton = document.querySelectorAll('.os-list-item-name')[2];
            if (thirdButton) {
                thirdButton.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            } else {
                console.error('Third button not found.');
            }
        });

        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Waited for 2 seconds.');

        await newPage.evaluate(() => {
            const fifthButton = document.querySelectorAll('.os-list-item-name')[8]; //What is 5 
            if (fifthButton) {
                fifthButton.click();
            } else {
                console.error('Fifth button not found.');
            }
        });

        await newPage.click('div[data-id="Dg4JdGx6jlZTm4XD"]', { button: 'right' });
        console.log('Right-clicked successfully.');

        await new Promise(resolve => setTimeout(resolve, 10000));
        console.log('Waited for 10 seconds.');

        await newPage.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        await newPage.waitForSelector('.context-menu-item-span', { visible: true });

        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log('Waited for 5 seconds.');

        const editOptions = await newPage.evaluate(() => {
            const menuItems = document.querySelectorAll('.context-menu-item-span');
            return Array.from(menuItems).map(item => item.textContent.trim());
        });

        //CLICK ON THE EDIT
        console.log('CLICK ON THE EDIT:', editOptions);

        console.log('Setting desired rename option...');
        await new Promise(resolve => setTimeout(resolve, 5000));

        // RIGHT CLICK 
        //TYPE WHICH TEXT YOU WANT TO CHOSE!
        const desiredRenameOption = 'Rename'; // const desiredRenameOption = 'Rename';
        console.log('Desired rename option:', desiredRenameOption);
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Searching for index of desired rename option...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        const desiredRenameOptionIndex = editOptions.indexOf(desiredRenameOption);
        console.log('Index of desired rename option:', desiredRenameOptionIndex);
        await new Promise(resolve => setTimeout(resolve, 5000));

        if (desiredRenameOptionIndex !== -1) {
            console.log('Desired rename option found.');
            await new Promise(resolve => setTimeout(resolve, 5000));

            console.log('Evaluating rename option element...');
            const renameOptionElement = await newPage.evaluateHandle((index) => {
                const menuItems = document.querySelectorAll('.context-menu-item-span');
                return menuItems[index];
            }, desiredRenameOptionIndex);
            await new Promise(resolve => setTimeout(resolve, 5000));

            if (renameOptionElement) {
                console.log('Rename option element found.');
                await new Promise(resolve => setTimeout(resolve, 5000));

                console.log('Clicking on rename option element...');
                await renameOptionElement.click();
                console.log('Clicked on rename option element.');
                await new Promise(resolve => setTimeout(resolve, 5000));
            } else {
                console.error(`${desiredRenameOption} option element not found.`);
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        } else {
            console.error(`${desiredRenameOption} option not found.`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        // Typing "First Sketch"
        console.log('Typing "First Sketch"...');
        await newPage.keyboard.type('First Sketch');
        await new Promise(resolve => setTimeout(resolve, 5000));



        //COMMAND FOR SEARCHING TRANSFORM AND THEN CLICKING ON IT 
        console.log('//COMMAND FOR SEARCHING TRANSFORM AND THEN CLICKING ON IT ');
        await newPage.click('button.command-search-trigger');
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log('Waited for 3 seconds.');

        await newPage.type('.os-search-box-input', 'transform');
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log('Typed "transform" into the search input field.');

        await newPage.keyboard.press('Enter');
        await newPage.mouse.move(290, 311);
        await newPage.mouse.down({ button: 'left' });
        console.log('Mouse clicked and held at X:290, Y:311');
        await new Promise(resolve => setTimeout(resolve, 3000));

        const readline = require('readline');
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        console.log('Please press the Enter key to continue...');
        const enterPromise = new Promise(resolve => rl.once('line', resolve));
        await enterPromise;
        console.log('User pressed Enter to continue.');

        await newPage.evaluate(() => {
            document.addEventListener('mousemove', (event) => {
                console.log(`Mouse coordinates: X = ${event.clientX}, Y = ${event.clientY}`);
            });
        });

        console.log('Move the mouse over the page to see the coordinates...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        console.log('Script completed successfully.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
