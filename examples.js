const { SetlApiSDK } = require('@setl/api-sdk');
const client = new SetlApiSDK('https://example.setllabs.io');

const errorHandler = (e) => {console.error(e)};

(async () => {
    
    // Login using API
    const token = await client.login({
        username: 'demouser',
        password: 'password'
    }).catch(errorHandler);

    console.log("[utility/login]: ", token);

    // request/me
    let me = await client.me().catch(errorHandler);
    me = JSON.parse(me);
    if (me) console.log("[request/me]: ", me);

    // request/wallets
    let wallets = await client.wallets().catch(errorHandler);
    wallets = JSON.parse(wallets);
    if (wallets) console.log("[request/wallets]: ", wallets);

    // request/wallet/{walletId}
    const wallet = await client.wallets({
        walletId: wallets[0].walletID,
    }).catch(errorHandler);
    if (wallet) console.log("[request/wallet]: ", wallet);

    // request/messages
    let messages = await client.messages().catch(errorHandler);
    messages = JSON.parse(messages)['messages'];
    if (messages) console.log("[request/messages]: ", messages);

    // request/messages/encrypt
    let encryptedMessage = await client.encryptMessage({
        aliceWalletId: messages[0]['receipientID'],
        bobWalletId: messages[0]['creatorID'],
        message: 'A test message.',
    }).catch(errorHandler);
    encryptedMessage = JSON.parse(encryptedMessage);
    if (encryptedMessage) console.log("[request/messages/encrypt]: ", encryptedMessage);

    // request/messages/decrypt
    const decryptedMessage = await client.decryptMessage({
        aliceWalletId: messages[0]['receipientID'],
        bobWalletId: messages[0]['creatorID'],
        encryptedMessage: encryptedMessage['encryptedMessage'],
    }).catch(errorHandler);
    if (decryptedMessage) console.log("[request/messages/decrypt]: ", decryptedMessage);

    // request/access
    let access = await client.access().catch(errorHandler);
    access = JSON.stringify(access);
    if (access) console.log("[request/access]: ", access);

    // request/addresses
    const addresses = await client.addresses()
   .catch(errorHandler);
    if (addresses) console.log("[request/addresses]: ", addresses);

    // request/allAssetClasses
    const assets = await client.allAssetClasses()
   .catch(errorHandler);
    if (assets) console.log("[request/allAssetClasses]: ", assets);

    // request/allNamespaces
    const allNamespaces = await client.allNamespaces().catch(errorHandler);
    if (allNamespaces) console.log("[request/allNamespaces]: ", allNamespaces);

    // request/contract
    const contract = await client.contract().catch(errorHandler);
    if (contract) console.log("[request/contract]: ", contract);

    // request/block
    const block = await client.block().catch(errorHandler);
    if (block) console.log("[request/block]: ", block);

    // request/holders
    const holders = await client.holders({
        namespace: 'DanDollar'
    }).catch(errorHandler);
    if (holders) console.log("[request/holders]: ", holders);

    // request/holdingsDetail
    const holdingsDetail = await client.holdingsDetail().catch(errorHandler);
    if (holdingsDetail) console.log("[request/holdingsDetail]: ", holdingsDetail);

    // request/holdingsDetails
    const holdingsDetails = await client.holdingsDetails().catch(errorHandler);
    if (holdingsDetails) console.log("[request/holdingsDetails]: ", holdingsDetails);

    // request/holdings
    const holdings = await client.holdings().catch(errorHandler);
    if (holdings) console.log("[request/holdings]: ", holdings);

    // request/assetClasses
    const assetClasses = await client.assetClasses({
        walletid: wallets[0].walletID,
    }).catch(errorHandler);
    if (assetClasses) console.log("[request/assetClasses]: ", assetClasses);

    // request/namespace
    const namespace = await client.namespace().catch(errorHandler);
    if (namespace) console.log('[request/namespace]: ', namespace);

    // request/newAddress
    let newAddress = await client.newAddress({
        walletId: wallets[0].walletID,
    }).catch(errorHandler);
    newAddress = JSON.parse(newAddress);
    if (newAddress) console.log('[request/newAddress]: ', newAddress);

    // request/poaAttorneyDetails
    const poaAttorneyDetails = await client.poaAttorneyDetails({
        address: newAddress.address,
    }).catch(errorHandler);
    if (poaAttorneyDetails) console.log('[request/poaAttorneyDetails]: ', poaAttorneyDetails);

    // request/poaOwnerDetails
    const poaOwnerDetails = await client.poaOwnerDetails({
        address: newAddress.address,
    }).catch(errorHandler);
    if (poaOwnerDetails) console.log('[request/poaOwnerDetails]: ', poaOwnerDetails);

    // request/state
    const state = await client.state().catch(errorHandler);
    if (state) console.log('[request/state]: ', state);

    // tx/null
    const nullResp = await client.null({
        address: 'ACuJPutUKicKA6c30K0eavPbEHDBhhnVGg',
    }).catch(errorHandler);
    if (nullResp) console.log(nullResp);

    // tx/transferAsset
    const transferAsset = await client.transferAsset({
        amount: 100,
        namespace: 'Bank of England',
        classId: 'GBP',
        fromAddress: 'ACuJPutUKicKA6c30K0eavPbEHDBhhnVGg',
        toAddress: 'AOriP45Byw3b9jho1GNdw_A2gUZ8Py-Gzg'
    }).catch(errorHandler);
    if (transferAsset) console.log(transferAsset);

    // tx/registerNamespace
    const registerNamespace = await client.registerNamespace({
        address: 'ACuJPutUKicKA6c30K0eavPbEHDBhhnVGg',
        namespace: 'Bank of SETL',
    }).catch(errorHandler);
    if (registerNamespace) console.log(registerNamespace);

    // tx/registerAsset
    const registerAsset = await client.registerAsset({
        address: 'ACuJPutUKicKA6c30K0eavPbEHDBhhnVGg',
        namespace: 'Bank of SETL',
        classId: 'Coin',
    }).catch(errorHandler);
    if (registerAsset) console.log(registerAsset);

    // tx/issueAsset
    const issueAsset = await client.issueAsset({
        amount: 500000,
        namespace: 'Bank of SETL',
        classId: 'Coin',
        fromAddress: 'ACuJPutUKicKA6c30K0eavPbEHDBhhnVGg',
        toAddress: 'AOriP45Byw3b9jho1GNdw_A2gUZ8Py-Gzg'
    }).catch(errorHandler);
    if (issueAsset) console.log(issueAsset);

    // utility/ping
    const ping = await client.ping().catch(errorHandler);
    if (ping) console.log("[utility/ping]: ", ping);

})();