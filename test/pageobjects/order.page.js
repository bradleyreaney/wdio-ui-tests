const casual = require('casual');

class OrderPage {

    get orderModalTitle() {
        return $('#orderModalLabel');
    }
    get orderName() {
        return $('#name');
    }
    get orderCountry() {
        return $('#country');
    }
    get orderCity() {
        return $('#city');
    }
    get orderCreditCardNumber() {
        return $('#card');
    }
    get orderCreditCardMonth() {
        return $('#month');
    }
    get orderCreditCardYear() {
        return $('#year');
    }
    get orderPurchaseButton() {
        return $('button=Purchase');
    }
    get orderConfirmation() {
        return $('h2=Thank you for your purchase!');
    }
    get orderConfirmationOkButton() {
        return $('[class="confirm btn btn-lg btn-primary"]');
    }

    async completeOrderForm(specOptions) {
        await browser.pause(1000);
        await this.orderName.setValue(specOptions.name || casual.full_name);
        await this.orderCountry.setValue(specOptions.country || casual.country);
        await this.orderCity.setValue(specOptions.city || casual.city);
        await this.orderCreditCardNumber.setValue(specOptions.cardNumber || casual.card_number());
        await this.orderCreditCardMonth.setValue(specOptions.cardMonth || '12');
        await this.orderCreditCardYear.setValue(specOptions.cardYear || '30');
    }

    async clickOrderConfirmationOkButton() {
        await browser.pause(500);
        await this.orderConfirmationOkButton.click();
    }
}

module.exports = new OrderPage();