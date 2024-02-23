import { Locator, Page, expect } from "@playwright/test";
import exp from "constants";

export class HomePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    usernameInput = () => this.page.getByLabel('Gebruikersnaam');
    passwordInput = () => this.page.getByLabel('Wachtwoord');

    async navigateTo(url: string) {
        await this.page.goto(url);
        await this.page.waitForTimeout(1000);
        await this.page.locator("button[id='onetrust-accept-btn-handler']").click();
    }

    async clickToLoginBtn() {
        await this.page.getByLabel('Site tools', { exact: true }).locator('span').filter({ hasText: 'Inloggen' }).click();
        await this.page.getByRole('link', { name: 'Salesforce', exact: true }).click();
        await this.page.waitForTimeout(2000);
    }

    async inloggen(username: string, password: string) {
        await this.page.waitForLoadState('load');
        await this.usernameInput().fill(username.toString());
        await this.passwordInput().fill(password.toString());
        await this.page.locator("input[id='Login']").click();

        await this.page.waitForLoadState('load');
        // const title = await this.page.title();
        const title = await this.page.locator("title").first().innerText();
        expect(title).toEqual("Lightning Experience");
        // expect(await this.page.locator("div[class='slds-global-header__logo']").nth(1)).toBeVisible();
    }

    async waffleIcon() {
        const waffleIcon = this.page.locator("div[class='slds-icon-waffle']");
        await waffleIcon.click();
        await this.page.waitForLoadState('load');
    }

    async waffleIconVerkoopBtn() {
        const verkoopBtn = this.page.locator("a[data-label='Verkoop']");
        await verkoopBtn.click();
        await this.page.waitForLoadState('load');
        expect(await this.page.locator("[class='slds-truncate'][title='Verkoop']").isVisible());
    }
















}