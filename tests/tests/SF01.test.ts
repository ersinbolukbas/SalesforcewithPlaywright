import { test, expect } from '@playwright/test';
import * as data from '../testData/data.json';
import { HomePage } from '../pages/SalesforceHomePage';
import { VerkoopHomePage } from '../pages/VerkoopHomePage';

// import { test } from '../fixtures/Fixtures';

test.describe('inloggen naar salesforce', () => {

    test.beforeEach(async ({ page }) => {
        const homepage = new HomePage(page);
        await homepage.navigateTo(data.BaseUrl);
        await homepage.clickToLoginBtn();
        await homepage.inloggen(data.gebruikersnaam, data.wachtwoord);
    });

    test('Account aanmaken', async ({ page }) => {
        const homepage = new HomePage(page);
        const account = new VerkoopHomePage(page);
        await homepage.waffleIcon();
        await homepage.waffleIconVerkoopBtn();
        await account.accountBtn();
        await account.nieuweAccountMakenBtn();
        await account.invullenPersonlijkeGegevens(
            data.accounts.input.account1,
            data.accounts.input.accountNumber,
            data.accounts.input.telefoonnummer,
            data.accounts.input.fax,
            data.accounts.input.website,
            data.accounts.input.tickersymbol,
            data.accounts.input.jaaromzet,
            data.accounts.input.sicCode,
            data.accounts.input.employees
        );
        await account.InvulAdresGegevens(
            data.accounts.factuurAdres.factuurAdres,
            data.accounts.factuurAdres.adress,
            data.accounts.factuurAdres.postCode,
            data.accounts.factuurAdres.stad,
            data.accounts.factuurAdres.provincie,
            data.accounts.factuurAdres.land
        );
        await account.InvulAdresGegevens(
            data.accounts.verstuurAddress.verstuurAddress,
            data.accounts.verstuurAddress.adress,
            data.accounts.verstuurAddress.postCode,
            data.accounts.verstuurAddress.stad,
            data.accounts.verstuurAddress.provincie,
            data.accounts.verstuurAddress.land
        );
        await account.selectTypeVanIndustrie(data.accounts.input.typeVanIndustrie);
        await account.selectSector(data.accounts.input.typeVanSector);
        await account.selectEigendom(data.accounts.input.eigendom);
        await account.selectBeoordeling(data.accounts.input.beoordeling);

        await account.invullenAanvullendeGegevens(
            data.accounts.aanvullendeGegevens.slaExpirationDate,
            data.accounts.aanvullendeGegevens.slaSerialNummer,
            data.accounts.aanvullendeGegevens.numberOfLocations,
        )
        await account.selectCustomerPriority(data.accounts.aanvullendeGegevens.customerPriorityDropdown);
        await account.selectSla(data.accounts.aanvullendeGegevens.slaDropdown);
        await account.selectUpsellOpportunity(data.accounts.aanvullendeGegevens.upsellOpportunity);
        await account.selectActive(data.accounts.aanvullendeGegevens.active);

        await account.InvullenMeerDetails(
            data.accounts.meerDetails.accountBeschrijving,
            data.accounts.meerDetails.sic_bescrijving,
            data.accounts.meerDetails.tradeStyle
        )

        await account.opslaanAccountBtn();





    });


});
