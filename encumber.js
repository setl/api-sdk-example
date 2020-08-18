(async () => {
    const { SetlApiSDK } = require('@setl/api-sdk');
    const client = new SetlApiSDK('https://example.setllabs.io');

    const errorHandler = (e) => {console.error(e)};

    const token = await client.login({
        username: 'demouser',
        password: 'password'
    }).catch(errorHandler);

    console.log("[utility/login]: ", token);

    const timestamp = Math.floor(Date.now() / 1000);
    const ref = `example-encumber-${timestamp}`;

    const addressAdmin = 'AJTVZrd56GhFjhE-4A0ArgeAq4cUI1R94w';
    const addressEncumberAgainst = 'ACuJPutUKicKA6c30K0eavPbEHDBhhnVGg';
    const addressPayTo = 'AMyMPCaWNHh3jVDOM0GpgEfdZD-FmnQhdA';

    // Encumber Asset
    const encumberAsset = await client.encumber({
        address: addressEncumberAgainst,
        administrators: [
                {
                    "address": addressAdmin,
                    "endTime": timestamp+3600,
                    "startTime": timestamp
                }
            ],
        amount: 10,
        beneficiaries: [
                {
                    "address": addressPayTo,
                    "endTime": timestamp+3600,
                    "startTime": timestamp
                }
            ],
        classId: "GBP",
        namespace: "Bank of England",
        isCumulative: false,
        metadata: "",
        reference: ref
    }).catch(errorHandler);
    if (encumberAsset) console.log(encumberAsset);

    // Exercise Encumbrance
    const exerciseEncumbrance = await client.exerciseEncumbrance({
        address: addressAdmin, // must be the admin address from the encumber above 
        amount: 1,
        classId: "GBP",
        namespace: "Bank of England",
        reference: ref,
        subjectAddress: addressEncumberAgainst,
        paymentAddress: addressPayTo // is a beneficiaries from the encumberance from above 
    }).catch(errorHandler);
    if (exerciseEncumbrance) console.log(exerciseEncumbrance);

    // Unencumber Asset
    const unencumber = await client.unencumber({
        address: addressAdmin, // must be the admin address from the encumber above 
        amount: 1,
        classId: "GBP",
        namespace: "Bank of England",
        reference: ref,
        subjectAddress: addressEncumberAgainst
    }).catch(errorHandler);
    if (unencumber) console.log(unencumber);

})();