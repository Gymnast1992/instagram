let hashtag;
const username = 'neperemozhnyi@gmail.com'
const password = 'peremoga'

function getRandomWait(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

describe("Instagram automation", () => {
    beforeEach(() => {
        cy.visit("https://www.instagram.com/");
    });

    it("Instagram login and like posts", () => {
        //insert yourhashtag =  'xyz'
        hashtag = 'ukraine';

        cy.contains("Go back to Instagram.").click();
        // insert yourUserName and yourPassword
        cy.get('[name="username"]').type(username);
        cy.get('[name="password"]').type(password);
        cy.wait(getRandomWait(1000, 3000));

        cy.get('[type="submit"]').click();
        cy.wait(getRandomWait(1000, 3000));

        cy.get("span").contains("Search").click();
        cy.wait(getRandomWait(1000, 3000));

        cy.get('[placeholder="Search"]').type("#" + hashtag);
        cy.wait(getRandomWait(1000, 3000));

        cy.contains("#" + hashtag).click();
        //  we should better use alias as well instead of 3000
        cy.wait(3000);

        cy.get("article a").eq(0).as("firstPost");
        cy.get("@firstPost").click();

        // Perform liking action on the first post
        cy.get('section [aria-label="Like"]').first().click();

        // Wait for a random time before proceeding to the next post
        cy.wait(getRandomWait(1000, 3000));

        // Click the "Next" button to proceed to the next post
        cy.get('button svg[aria-label="Next"]').click();

        // Loop through the remaining posts
        for (let i = 1; i < 100; i++) {
            // Wait for a random time before clicking the like button on the current post
            cy.wait(getRandomWait(1000, 3000));

            // Click the like button on the current post
            cy.get('section [aria-label="Like"]').first().click();

            cy.wait(getRandomWait(1000, 3000));

            // Click the "Next" button to proceed to the next post
            cy.get('button svg[aria-label="Next"]').click();
        }
    });
});
