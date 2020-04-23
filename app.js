const { SetlApiSDK } = require('@setl/api-sdk');
const client = new SetlApiSDK('https://example.setllabs.io');

const errorHandler = (e) => {console.error(e)};

/**
 * An example app of logging into SETL API and register asset on blockchain
 * along with issuing your first asset
 */
(async () => {

    // Login using API
    const token = await client.login({
        username: 'demouser',
        password: 'password'
    }).catch(errorHandler);

    console.log("[utility/login]: ", token);

    // Get Details about User Logged in
    let me = await client.me().catch(errorHandler);
    me = JSON.parse(me);
    if (me) console.log("[request/me]: ", me);

    // Get current Blockchain state information
    const state = await client.state().catch(errorHandler);
    if (state) console.log('[request/state]: ', state);

    // Register a new Namespace called `Bank of SETL`
    const registerNamespace = await client.registerNamespace({
        address: 'ACuJPutUKicKA6c30K0eavPbEHDBhhnVGg',
        namespace: 'Bank of SETL',
    }).catch(errorHandler);
    if (registerNamespace) console.log(registerNamespace);

    // Register a new asset `Coin` in the `Bank of SETL` Namespace
    const registerAsset = await client.registerAsset({
        address: 'ACuJPutUKicKA6c30K0eavPbEHDBhhnVGg',
        namespace: 'Bank of SETL',
        classId: 'Coin',
    }).catch(errorHandler);
    if (registerAsset) console.log(registerAsset);

    // Issue the Address from issuance address to a new address
    const issueAsset = await client.issueAsset({
        amount: 500000,
        namespace: 'Bank of SETL',
        classId: 'Coin',
        fromAddress: 'ACuJPutUKicKA6c30K0eavPbEHDBhhnVGg',
        toAddress: 'AOriP45Byw3b9jho1GNdw_A2gUZ8Py-Gzg'
    }).catch(errorHandler);
    if (issueAsset) console.log(issueAsset);


    // Check Balances every 5 seconds
    setInterval(async () => {
        const holdingsDetail = await client.holdingsDetail().catch(errorHandler);
        if (holdingsDetail) console.log("[request/holdingsDetail]: ", holdingsDetail);
    }, 5000);

})();