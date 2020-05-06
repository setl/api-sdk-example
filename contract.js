(async () => {
  const { SetlApiSDK } = require('@setl/api-sdk');
  const client = new SetlApiSDK('https://example.setllabs.io');

  const errorHandler = (e) => {console.error(e)};

  const token = await client.login({
      username: 'demouser',
      password: 'hello123'
  }).catch(errorHandler);

  const timestamp = Math.floor(Date.now() / 1000);

  console.log("[utility/login]: ", token);

  const sampleSendAssetContract = {
      "txType": "NEW_CONTRACT",
      "walletId": 26,
      "timestamp": timestamp,
      "address": "ACuJPutUKicKA6c30K0eavPbEHDBhhnVGg",
      "function": "dvp_uk",
      "contractData": {
        "contractFunction": "dvp_uk",
        "parties": [
          2,
          [
            "ACuJPutUKicKA6c30K0eavPbEHDBhhnVGg",
            "ACuJPutUKicKA6c30K0eavPbEHDBhhnVGg",
            [
              [
                "ACuJPutUKicKA6c30K0eavPbEHDBhhnVGg",
                "Bank of England",
                "GBP",
                10,
                "",
                "",
                false,
                ""
              ]
            ],
            [],
            "",
            "",
            false
          ],
          [
            "AISFnZmt5lLUCmj6n0Ws6H8QAmuUalb0Ew",
            "AISFnZmt5lLUCmj6n0Ws6H8QAmuUalb0Ew",
            [],
            [
              [
                "AISFnZmt5lLUCmj6n0Ws6H8QAmuUalb0Ew",
                "Bank of England",
                "GBP",
                10
              ]
            ],
            "",
            "",
            false
          ]
        ],
        "authorisations": [],
        "addencumbrances": [],
        "events": [
          "commit",
          "expiry"
        ],
        "startdate": timestamp,
        "expiry": timestamp + 3600,
        "encumbrance": [
          false,
          ""
        ],
        "protocol": "",
        "metadata": "{\"title\": \"Send 10 Assets\"}"
      }
  };

  let createTx = await client.createTx(sampleSendAssetContract).catch(errorHandler);
  createTx = JSON.parse(createTx);
  if (createTx) console.log("[tx/create]: ", createTx);
})();