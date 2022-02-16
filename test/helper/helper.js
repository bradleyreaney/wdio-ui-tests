class Helper {

    async checkForAlert() {
        await browser.waitUntil(
            async () => (await browser.getAlertText(), {
                timeout: 2000,
                timeoutMsg: 'Alert box did not exist after 2s'
            })
        )
    }

    async waitForElementToExist(element, timeout, errorMessage) {
        await element.waitForExist({
            timeout: timeout,
            timeoutMsg: errorMessage
        });
    }
}

module.exports = new Helper();