import { test as base } from '@playwright/test';
import { HomePage } from '../tests/pages/SalesforceHomePage';
import { VerkoopHomePage } from '../tests/pages/VerkoopHomePage';


// Geef de typen van jouw Fixtures aan.
type MyFixtures = {
  homepage: HomePage;
  verkoophomepage: VerkoopHomePage;
};

export const test = base.extend<MyFixtures>({
  
  homepage: async ({ page }, use: (arg: HomePage) => Promise<void>) => {
    await use(new HomePage(page));
  },

  verkoophomepage: async ({ page }, use: (arg: VerkoopHomePage) => Promise<void>) => {
    await use(new VerkoopHomePage(page));
  },

});

export { expect } from '@playwright/test';