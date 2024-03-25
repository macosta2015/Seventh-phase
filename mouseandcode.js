const puppeteer = require('puppeteer');
require('dotenv').config();

const { launchBrowserAndNavigateToDocument } = require('./components/launchBrowserAndNavigate.js');



(async () => {
    try {
        const newPage = await launchBrowserAndNavigateToDocument(); // This line should return a newPage object


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


        // COPY SKETCH AND PASTING IT INTO ANOTHER SKETCH
        //SELECT SKETCH RIGHT CLICK OPTIONS  
        console.log('RIGHT CLICK OPTIONS:');
        await newPage.evaluate(() => {
            const thirdButton = document.querySelectorAll('.os-list-item-name')[3]; //What is the 2?
            if (thirdButton) {
                thirdButton.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            } else {
                console.error('Third button not found.');
            }
        });

        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Waited for 2 seconds.');

        await newPage.evaluate(() => {
            const fifthButton = document.querySelectorAll('.os-list-item-name')[5]; //What happens if I chose 5
            if (fifthButton) {
                fifthButton.click();
            } else {
                console.error('Fifth button not found.');
            }
        });






        async function performRightClickOptionByTitle(newPage, selector, title) {
            console.log('Right-clicked started.');
            await new Promise(resolve => setTimeout(resolve, 5000));
            console.log('Waited for 5 seconds.');

            // Click on the element with the specified title
            const elements = await newPage.$$(`${selector}[data-bs-original-title="${title}"]`);
            if (elements.length > 0) {
                await elements[0].click({ button: 'right' });
                console.log(`Clicked on element with title "${title}".`);
            } else {
                throw new Error(`No element found with title "${title}" using selector "${selector}".`);
            }

            console.log('Right-clicked successfully.');

            // Here you can wait for a specific context-menu-item-span element
            const menuItemSelector = '.context-menu-item-span';
            await newPage.waitForSelector(menuItemSelector, { visible: true });
            console.log('Waited for context menu item to appear.');

            await new Promise(resolve => setTimeout(resolve, 5000));
            console.log('Waited for 5 seconds.');

            const editOptions3 = await newPage.evaluate(() => {
                const menuItems = document.querySelectorAll('.context-menu-item-span');
                return Array.from(menuItems).map(item => item.textContent.trim());
            });
            await new Promise(resolve => setTimeout(resolve, 5000));
            console.log('Retrieved edit options.');

            console.log('Right-clicked ended.');
            await new Promise(resolve => setTimeout(resolve, 5000));
            console.log('Waited for 5 seconds.');

            return editOptions3;
        }




        // Example usage:
        const selector = 'div[data-id="Dg4JdGx6jlZTm4XD"]'; // Replace with the appropriate selector
        const title = 'First Sketch'; // Replace with the desired title
        const editOptions3 = await performRightClickOptionByTitle(newPage, selector, title);
        console.log(editOptions3);






        const desiredOption = 'Copy sketch'; //TYPE WHICH EDIT OPTION YOU WANT TO CHOSE
        console.log('Desired rename option:', desiredOption);
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Searching for index of desired option...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        const desiredOptionIndex = editOptions3.indexOf(desiredOption);
        console.log('Index of desired  option:', desiredOptionIndex);
        await new Promise(resolve => setTimeout(resolve, 5000));

        if (desiredOptionIndex !== -1) {
            console.log('Desired rename option found.');
            await new Promise(resolve => setTimeout(resolve, 5000));

            console.log('Evaluating option element... ', desiredOption);
            const renameOptionElement = await newPage.evaluateHandle((index) => {
                const menuItems = document.querySelectorAll('.context-menu-item-span');
                return menuItems[index];
            }, desiredOptionIndex);
            await new Promise(resolve => setTimeout(resolve, 5000));

            if (renameOptionElement) {
                console.log('Option element found.', desiredOption);
                await new Promise(resolve => setTimeout(resolve, 5000));
                await renameOptionElement.click();
                console.log(`Clicked on ${desiredOption} option element.`);
                await new Promise(resolve => setTimeout(resolve, 5000));
            } else {
                console.error(`${desiredOption} option element not found.`);
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        } else {
            console.error(`${desiredOption} option not found.`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
        console.log('Waiting 10 seconds.');
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds







        //SELECT SKETCH RIGHT CLICK OPTIONS TO UNCLICK
        console.log('RIGHT CLICK OPTIONS:');
        await newPage.evaluate(() => {
            const thirdButton = document.querySelectorAll('.os-list-item-name')[5];
            thirdButton.click();
            if (thirdButton) {
                thirdButton.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            } else {
                console.error('Third button not found.');
            }
        });

        //SELECT SKETCH RIGHT CLICK OPTIONS TO PASTE
        console.log('RIGHT CLICK OPTIONS:');
        await newPage.evaluate(() => {
            const thirdButton = document.querySelectorAll('.os-list-item-name')[6];
            thirdButton.click();
            if (thirdButton) {
                thirdButton.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            } else {
                console.error('Third button not found.');
            }
        });




        // Example usage:
        const selector1 = 'div[data-id="XgFZbXC58Zl90SMu"]'; // Selector targeting the element with data-id="XgFZbXC58Zl90SMu"
        const title1 = 'Sketch 2'; // Title of the element to click
        const editOptions1 = await performRightClickOptionByTitle(newPage, selector1, title1);
        console.log(editOptions1);










        // RIGHT CLICK 
        //TYPE WHICH EDIT OPTION YOU WANT TO CHOSE
        const desiredOption2 = 'Paste into sketch'; //TYPE WHICH EDIT OPTION YOU WANT TO CHOSE
        console.log('Desired rename option:', desiredOption2);
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Searching for index of desired option...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        let desiredOptionIndex2 = editOptions1.indexOf(desiredOption2);
        console.log('Index of desired  option:', desiredOptionIndex2);
        await new Promise(resolve => setTimeout(resolve, 5000));

        if (desiredOptionIndex2 !== -1) {
            console.log('Desired rename option found.');
            await new Promise(resolve => setTimeout(resolve, 5000));

            console.log('Evaluating option element... ', desiredOption2);
            const renameOptionElement = await newPage.evaluateHandle((index) => {
                const menuItems = document.querySelectorAll('.context-menu-item-span');
                return menuItems[index];
            }, desiredOptionIndex2);
            await new Promise(resolve => setTimeout(resolve, 5000));

            if (renameOptionElement) {
                console.log('Option element found.', desiredOption2);
                await new Promise(resolve => setTimeout(resolve, 5000));
                await renameOptionElement.click();
                console.log(`Clicked on ${desiredOption2} option element.`);
                await new Promise(resolve => setTimeout(resolve, 5000));
            } else {
                console.error(`${desiredOption2} option element not found.`);
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        } else {
            console.error(`${desiredOption2} option not found.`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
        console.log('Waiting 10 seconds.');
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds




        console.log('Waiting 10 seconds.');
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds






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
