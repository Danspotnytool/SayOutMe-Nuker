module.exports = {
    /**
     * The delay between every request in milliseconds
     * @type {number}
     */
    delay: 100,

    /**
     * Limit the number of requests
     * Set to 0 for no limit
     * 
     * @type {number}
     */
    limit: 0,

    /**
     * The request cookies
     * Change this to your own cookies
     * 
     * @type {string}
     */
    cookies: 'PHPSESSID=5f88d3675b82555837365ebb621e245a; _ga=GA1.1.617583782.1656327955; popcashpu=1; _ga_48P48Y8C8F=GS1.1.1656327955.1.1.1656328020.0',

    /**
     * The message to send
     * @type {string}
     */
    message: '',

    /**
     * The URL to send the message to
     * @type {string}
     * @example https://sayout.me/say/loremipsum
     */
    url: '',
};