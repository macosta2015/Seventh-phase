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



        async function performRightClickOptionByIndex(newPage, selector, index) {
            console.log('Right-clicked started.');
            await new Promise(resolve => setTimeout(resolve, 5000));
            console.log('Waited for 5 seconds.');

            // Click on the element by index
            const elements = await newPage.$$(selector);
            if (index >= 0 && index < elements.length) {
                await elements[index].click({ button: 'right' });
                console.log(`Clicked on element at index ${index}.`);
            } else {
                throw new Error('Index out of range or no elements found with the given selector.');
            }

            console.log('Right-clicked successfully.');

            // Here you can wait for a specific context-menu-item-span element
            const menuItemSelector = '.context-menu-item-span';
            await newPage.waitForSelector(`${menuItemSelector}:nth-child(${index + 1})`, { visible: true });
            console.log(`Waited for context menu item at index ${index} to appear.`);

            await new Promise(resolve => setTimeout(resolve, 5000));
            console.log('Waited for 5 seconds.');

            const editOptions1 = await newPage.evaluate(() => {
                const menuItems = document.querySelectorAll('.context-menu-item-span');
                return Array.from(menuItems).map(item => item.textContent.trim());
            });
            await new Promise(resolve => setTimeout(resolve, 5000));
            console.log('Retrieved edit options.');

            console.log('Right-clicked ended.');
            await new Promise(resolve => setTimeout(resolve, 5000));
            console.log('Waited for 5 seconds.');

            return editOptions1;
        }








        // Example usage:
        const selector = 'div[data-id="Dg4JdGx6jlZTm4XD"]';
        const index = 0; // Replace with the desired index
        const editOptions1 = await performRightClickOptionByIndex(newPage, selector, index);
        console.log(editOptions1);









        // //TEST
        // async function performRightClickOption(newPage) {
        //     console.log('Right-clicked started.');
        //     await new Promise(resolve => setTimeout(resolve, 5000));
        //     console.log('Waited for 5 seconds.');
        //     await new Promise(resolve => setTimeout(resolve, 5000));
        //     console.log('Waited for 5 seconds.');
        //     await newPage.click('div[data-id="Dg4JdGx6jlZTm4XD"]', { button: 'right' });
        //     console.log('WHERE DID WE CLICK???')
        //     await new Promise(resolve => setTimeout(resolve, 5000));
        //     console.log('Right-clicked successfully.');

        //     await newPage.evaluate(() => {
        //         window.scrollTo(0, document.body.scrollHeight);
        //     });
        //     await new Promise(resolve => setTimeout(resolve, 5000));
        //     console.log('Scrolled to bottom of the page.');

        //     await newPage.waitForSelector('.context-menu-item-span', { visible: true });
        //     await new Promise(resolve => setTimeout(resolve, 5000));
        //     console.log('Waiting for context menu items to appear.');

        //     await new Promise(resolve => setTimeout(resolve, 5000));
        //     console.log('Waited for 5 seconds.');

        //     const editOptions1 = await newPage.evaluate(() => {
        //         const menuItems = document.querySelectorAll('.context-menu-item-span');
        //         return Array.from(menuItems).map(item => item.textContent.trim());
        //     });
        //     await new Promise(resolve => setTimeout(resolve, 5000));
        //     console.log('Retrieved edit options.');

        //     console.log('Right-clicked ended.');
        //     await new Promise(resolve => setTimeout(resolve, 5000));
        //     console.log('Waited for 5 seconds.');

        //     return editOptions1;
        // }

        // // Example usage:
        // const editOptions1 = await performRightClickOption(newPage);
        // console.log(editOptions1);






























        const desiredOption = 'Copy sketch'; //TYPE WHICH EDIT OPTION YOU WANT TO CHOSE
        console.log('Desired rename option:', desiredOption);
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Searching for index of desired option...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        const desiredOptionIndex = editOptions1.indexOf(desiredOption);
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




        //CALLING RIGHT CLICK FUNCTION
        // Example usage:
        // const editOptions2 = await performRightClickOption(newPage);
        // console.log(editOptions2);
        // Example usage:
        // Example usage:
        const selector1 = 'div[data-id="Dg4JdGx6jlZTm4XD"]';
        const index1 = 1; // Replace with the desired index
        const editOptions2 = await performRightClickOptionByIndex(newPage, selector1, index1);
        console.log(editOptions2);








        // RIGHT CLICK 
        //TYPE WHICH EDIT OPTION YOU WANT TO CHOSE
        const desiredOption2 = 'Paste into sketch'; //TYPE WHICH EDIT OPTION YOU WANT TO CHOSE
        console.log('Desired rename option:', desiredOption2);
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Searching for index of desired option...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        let desiredOptionIndex2 = editOptions.indexOf(desiredOption2);
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







        // await newPage.mouse.move(400, 448);
        // console.log('Mouse moved to X:400, Y:448');
        // await newPage.mouse.down({ button: 'right' });
        // console.log('Right mouse button clicked and held at X:400, Y:448');
        // await newPage.mouse.up({ button: 'right' }); // Release the right mouse button
        // console.log('Right mouse button released.');

        console.log('Waiting 10 seconds.');
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds



        // //RIGHT CLICK OPTIONS  
        // console.log('RIGHT CLICK OPTIONS:');
        // await newPage.evaluate(() => {
        //     const thirdButton = document.querySelectorAll('.os-list-item-name')[2];
        //     if (thirdButton) {
        //         thirdButton.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        //     } else {
        //         console.error('Third button not found.');
        //     }
        // });

        // await new Promise(resolve => setTimeout(resolve, 2000));
        // console.log('Waited for 2 seconds.');

        // await newPage.evaluate(() => {
        //     const fifthButton = document.querySelectorAll('.os-list-item-name')[8]; //What is 5 
        //     if (fifthButton) {
        //         fifthButton.click();
        //     } else {
        //         console.error('Fifth button not found.');
        //     }
        // });

        // await newPage.click('div[data-id="Dg4JdGx6jlZTm4XD"]', { button: 'right' });
        // console.log('Right-clicked successfully.');

        // await new Promise(resolve => setTimeout(resolve, 10000));
        // console.log('Waited for 10 seconds.');

        // await newPage.evaluate(() => {
        //     window.scrollTo(0, document.body.scrollHeight);
        // });

        // await newPage.waitForSelector('.context-menu-item-span', { visible: true });

        // await new Promise(resolve => setTimeout(resolve, 5000));
        // console.log('Waited for 5 seconds.');

        // const editOptions = await newPage.evaluate(() => {
        //     const menuItems = document.querySelectorAll('.context-menu-item-span');
        //     return Array.from(menuItems).map(item => item.textContent.trim());
        // });

        // //CLICK ON THE EDIT
        // console.log('CLICK ON THE EDIT:', editOptions);

        // console.log('Setting desired rename option...');
        // await new Promise(resolve => setTimeout(resolve, 5000));

        // RIGHT CLICK 
        //TYPE WHICH TEXT YOU WANT TO CHOSE!
        const desiredCopysketch = 'Copysketch';
        console.log('Desired rename option:', desiredCopysketch);
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Searching for index of desired rename option...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        const desiredCopysketchIndex = editOptions.indexOf(desiredCopysketch);
        console.log('Index of desired rename option:', desiredCopysketchIndex);
        await new Promise(resolve => setTimeout(resolve, 5000));

        if (desiredCopysketchIndex !== -1) {
            console.log('Desired rename option found.');
            await new Promise(resolve => setTimeout(resolve, 5000));

            console.log('Evaluating rename option element...');
            const renameOptionElement = await newPage.evaluateHandle((index) => {
                const menuItems = document.querySelectorAll('.context-menu-item-span');
                return menuItems[index];
            }, desiredCopysketchIndex);
            await new Promise(resolve => setTimeout(resolve, 5000));

            if (renameOptionElement) {
                console.log('Rename option element found.');
                await new Promise(resolve => setTimeout(resolve, 5000));

                console.log('Clicking on rename option element...');
                await renameOptionElement.click();
                console.log('Clicked on rename option element.');
                await new Promise(resolve => setTimeout(resolve, 5000));
            } else {
                console.error(`${desiredCopysketch} option element not found.`);
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        } else {
            console.error(`${desiredCopysketch} option not found.`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
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
