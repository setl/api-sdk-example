const { SetlApiSDK } = require('@setl/api-sdk');
const client = new SetlApiSDK('https://example.setllabs.io');
const express = require('express');
const app = express();

const errorHandler = (e) => {console.error(e)};

/**
 * Get Holdings Endpoint
 */
app.get('/holdings', async function(req, res) {
    console.log('[Request]');
    
    // Login using API
    await client.login({
        username: 'demouser',
        password: 'password'
    }).catch(errorHandler);

    // Get Holders
    const holdingsDetail = await client.holdingsDetail().catch(errorHandler);
    if (holdingsDetail) console.log("[request/holdingsDetail]: ", holdingsDetail);
    
    console.log('[Response]', holdingsDetail);

    // Response with Holders
    res.send(holdingsDetail);
})
   
// Listen on Port 3000 using Express
app.listen(3000);

console.log('SETL Express Example Listing on Port 3000');