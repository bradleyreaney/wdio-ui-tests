class Helper {

    async checkForAlert() {
        await browser.waitUntil(
            async () => (await browser.getAlertText(), {
                timeout: 2000,
                timeoutMsg: 'Alert box did not exist after 2s'
            })
        )
    }
}

module.exports = new Helper();