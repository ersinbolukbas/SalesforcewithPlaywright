import { Locator, Page, expect } from '@playwright/test';
import exp from "constants";

export class VerkoopHomePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    accountNaam = () => this.page.locator("input[name='Name']");
    accountNummer = () => this.page.locator("input[name='AccountNumber']");
    telefoon = () => this.page.locator("input[name='Phone']");
    fax = () => this.page.locator("input[name='Fax']");
    websiteNaam = () => this.page.locator("[name='Website']");
    tickersymbol = () => this.page.locator("input[name='TickerSymbol']");
    jaaromzet = () => this.page.locator("input[name='AnnualRevenue']");
    sicCode = () => this.page.locator("input[name='Sic']");
    werknemer = () => this.page.locator("input[name='NumberOfEmployees']");
    typeVanIndustrie = () => this.page.locator("(//button[@aria-haspopup='listbox'])[3]");
    sektor = () => this.page.locator("(//button[@aria-haspopup='listbox'])[5]");
    eigendom = () => this.page.locator("(//button[@aria-haspopup='listbox'])[4]");
    beoordeling = () => this.page.locator("(//button[@aria-haspopup='listbox'])[2]");

    slaExpirationDate = () => this.page.locator("[name='SLAExpirationDate__c']");
    slaSerialNummer = () => this.page.locator("[name='SLASerialNumber__c']");
    nummerVanLocatie = () => this.page.locator("[name='NumberofLocations__c']");
    customerPriority = () => this.page.locator("(//button[@aria-haspopup='listbox'])[6]");
    sla = () => this.page.locator("(//button[@aria-haspopup='listbox'])[7]");
    upsellOpportunity = () => this.page.locator("(//button[@aria-haspopup='listbox'])[8]");
    active = () => this.page.locator("(//button[@aria-haspopup='listbox'])[9]");

    beschrijvingTextarea = () => this.page.locator("(//textarea[@class='slds-textarea'])[3]");
    sicBescrijving = () => this.page.locator("[name='SicDesc']");
    tradeStyle = () => this.page.locator("[name='Tradestyle']");

    opslaanBtn = () => this.page.locator("button[name='SaveEdit']");

    accountElements = {
        accountBtn: "a[title='Accounts']",
        nieuweAccountBtn: "li[data-target-selection-name='sfdc:StandardButton.Account.New']",
        importerenBtn: "a[title='Importeren']",
        afdrukbareWeergaveBtn: "a[title='Afdrukbare weergave']",
    };

    async accountBtn() {
        await this.page.waitForSelector(this.accountElements.accountBtn);
        await this.page.click(this.accountElements.accountBtn);
        //await this.page.locator("a[title='Accounts']").click();
    }

    async nieuweAccountMakenBtn() {
        await this.page.click(this.accountElements.nieuweAccountBtn);
    }

    async importerenBtn() {
        await this.page.click(this.accountElements.importerenBtn);
    }

    async afdrukbareWeergaveBtn() {
        await this.page.click(this.accountElements.afdrukbareWeergaveBtn);
    }

    async invullenPersonlijkeGegevens(
        aNaam: string,
        aNummer: string,
        tel: string,
        faxx: string,
        website: string,
        tickersymboll: string,
        jaar_omzet: string,
        sic_Code: string,
        werknemers: string
    ) {
        await this.accountNaam().fill(aNaam);
        await this.accountNummer().fill(aNummer);
        await this.telefoon().fill(tel);
        await this.fax().fill(faxx);
        await this.websiteNaam().fill(website);
        await this.tickersymbol().fill(tickersymboll);
        await this.jaaromzet().fill(jaar_omzet);
        await this.sicCode().fill(sic_Code);
        await this.werknemer().fill(werknemers);
    }

    async selectTypeVanIndustrie(industrieNaam: string) {
        await this.typeVanIndustrie().click();     
        await this.page.waitForLoadState('load');
        // await this.page.waitForTimeout(500);
        await this.page.getByRole('option', { name: `${industrieNaam}` }).locator('span').nth(1).click();
       
    };

    async selectSector(sector: string) {
        await this.sektor().click();     
        await this.page.waitForLoadState('load');
        // await this.page.waitForTimeout(500);
        await this.page.getByRole('option', { name: `${sector}` }).locator('span').nth(1).click();
    };

    async selectEigendom(eigendom: string) {
        await this.eigendom().click();     
        await this.page.waitForLoadState('load');
        // await this.page.waitForTimeout(500);
        await this.page.getByRole('option', { name: `${eigendom}` }).locator('span').nth(1).click();
    };

    async selectBeoordeling(beoordeling: string) {
        await this.beoordeling().click();     
        await this.page.waitForLoadState('load');
        // await this.page.waitForTimeout(500);
        await this.page.getByRole('option', { name: `${beoordeling}` }).locator('span').nth(1).click();
    };

    async InvulAdresGegevens(
        typenVanAddress: string,
        straat: string,
        postcode: string,
        stad: string,
        provincie: string,
        land: string
    ) {
        const streetElement = await this.page.$(`//*[contains(@data-target-selection-name, "${typenVanAddress}")]//textarea`);
        const postalCodeElement = await this.page.$(`//*[contains(@data-target-selection-name, "${typenVanAddress}")]//input[@name="postalCode"]`);
        const cityElement = await this.page.$(`//*[contains(@data-target-selection-name, "${typenVanAddress}")]//input[@name="city"]`);
        const provinceElement = await this.page.$(`//*[contains(@data-target-selection-name, "${typenVanAddress}")]//input[@name="province"]`);
        const countryElement = await this.page.$(`//*[contains(@data-target-selection-name, "${typenVanAddress}")]//input[@name="country"]`);
    
        if (streetElement && postalCodeElement && cityElement && provinceElement && countryElement) {
            await streetElement.fill(straat);
            await postalCodeElement.fill(postcode);
            await cityElement.fill(stad);
            await provinceElement.fill(provincie);
            await countryElement.fill(land);
        } else {
            console.error("Controleer je gegevens");
        }
    }

    async invullenAanvullendeGegevens(
        datum: string,
        slaSerial: string,
        nummerLocatie: string,
    ){
        await this.slaExpirationDate().fill(datum);
        await this.slaSerialNummer().fill(slaSerial);
        await this.nummerVanLocatie().fill(nummerLocatie);
    }

    async selectCustomerPriority(customerPriority: string) {
        await this.customerPriority().click();     
        await this.page.waitForLoadState('load');
        // await this.page.waitForTimeout(500);
        await this.page.getByRole('option', { name: `${customerPriority}` }).locator('span').nth(1).click();
    };
    async selectSla(sla: string) {
        await this.sla().click();     
        await this.page.waitForLoadState('load');
        // await this.page.waitForTimeout(500);           
        await this.page.getByRole('option', { name: `${sla}` }).locator('span').nth(1).click();
    };

    async selectUpsellOpportunity(opportunity: string) {
        await this.upsellOpportunity().click();  
        await this.page.waitForLoadState('load');   
        // await this.page.waitForTimeout(500);           
        await this.page.getByRole('option', { name: `${opportunity}` }).locator('span').nth(1).click();
    };

    async selectActive(actief: string) {
        await this.active().click();     
        // await this.page.waitForTimeout(500);           
        await this.page.waitForLoadState('load');
        await this.page.getByRole('option', { name: `${actief}` }).locator('span').nth(1).click();
    };

    async InvullenMeerDetails(
        accountBeschrijving: string,
        sicBeschrijving: string,
        tradeStyle: string,
    ){
        await this.beschrijvingTextarea().fill(accountBeschrijving);
        await this.sicBescrijving().fill(sicBeschrijving);
        await this.tradeStyle().fill(tradeStyle);
    }
    
    async opslaanAccountBtn() {
        await this.opslaanBtn().click();    
    }
    











}