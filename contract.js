(async () => {
  const { SetlApiSDK } = require('@setl/api-sdk');
  const client = new SetlApiSDK('https://example.setllabs.io');

  const errorHandler = (e) => {console.error(e)};

  const token = await client.login({
      username: 'demouser',
      password: 'password'
  }).catch(errorHandler);

  const timestamp = Math.floor(Date.now() / 1000);

  console.log("[utility/login]: ", token);

  /*

  A contract is a contingent set obligations and benefits which is asserted into the blockchain.  It is not executed
  until all the conditions are met - including parties and other authorisers signing and all assets for transfer
  being available.

  Author - the contract creator may or may not be a participant in the contract.

  parameters - a set of 'values' that can be supplied to the contract and used in calculations in the paylists and
  receive lists

  parties - any number of parties with each party having a paylist and a receive list comprising any number payments or
  receipts of assets.  A valid contract must balance payments and receipts for each asset in total

  authorisations -
   any number of authorisers who must sign the contract before it is executed

  addencumbrances - any number of encumbrances (locking in favor of another party) to be implemented on execution

  */


  // ******************************************************************************************************************
  //
  //  Set up the Author
  //
  // ******************************************************************************************************************

  let authoringAddress = "ACh8e3CbDGcy6zG9lZ1-uXDOnNC4kbIkGw";

  // ******************************************************************************************************************
  //
  //  Set parameters that can be used in as values in the paylist or receive list
  //
  // ******************************************************************************************************************

  /*

  'parameters'    :     # (Optional). 'parameters' are values that may be substituted into payment / receipt lines
  {
     'key' :            # 'key' is the variable name used in payment / receipt lines, we recommend that all keys are specified
                          in lower case. Keys are not case sensitive when value substitution takes place, but are case sensitive
                          for signing or commitment purposes. If two keys are given which resolve to the same lower-case value,
                          then one will arbitrarily get precedence.

     [

       Address,         # Address or Public Key that may update this variable via a 'Commit' transaction.
                          This item always relates to the Authorising party, i.e. never the Attorney.
       Value,           # value to insert, empty string ('') indicates a not-yet-set value.
       CalculatedIndex, # 'Values' will be evaluated before use in 'CalculatedIndex' order. This allows a calculation sequence
                          to be defined.
       ContractSpecific,# (API Optional) (Int)
                            0 : (default) Signature message does not include ContractAddress,
                            1 : It does. This allows a parameter value to, optionally, be sent to multiple contracts is required.
       CalculationOnly, # (API Optional) (Int)
                            0 : (default) Normal - Requires signature etc.
                            1 : Is only present as an intermediate value to be evaluated in consensus thus can
                                not be changed and does not require signature.
       Signature        # (API Optional) Signature of '[ContractAddress|]key|Value' by 'Public Key'. 'ContractAddress|' is
                          included in the message if 'ContractSpecific' != 0
                          For PoA, this signature relates to the Attorney public key which will be taken from the Transaction
                          and saved in PoaPublicKey.
       PoaPublicKey     # (API Optional) Internal Use. do not specify. Used to record PoaPublic key when PoAs have been used to sign
       ],
     ...
     },

  */

  let parameters={};


  // ******************************************************************************************************************
  //
  //  Set up Parties
  //
  // ******************************************************************************************************************

  /*

    parties :

    [
     PartyIdentifier,
     SigAddress,
     [                  # pay list, may be an empty list.
        [
        Address,        # Address from which payment will be taken.
        NameSpace,      # Asset Issuer
        AssetID,        # Asset Class
        Qty1,           # Amount
        Public Key,     # Public Key for this Address. HEX. 64 chars.
        Signature,      # Base64. Signature of [NameSpace, AssetID, Qty] by Address1
        Issuance,       # (Bool) Issue new asset to fulfil this payment. Only works if this Payment Address (which MUST
                          be specified at contract creation) is the Asset Issuance Address, otherwise causes a validation
                          error.
                        # Will use an encumbranece, like other payments, when this payment / party is not signed.
        MetaData        # (String) Metadata related to this payment. Will be copied through to 'Effective' Transactions.
        ],
        ...
     ],
     [                  # receive list, may be an empty list.
        [
        Address2,       # Address to which payment will be made
        NameSpace1,     # Asset Issuer
        AssetID1,       # Asset Class
        Qty1],          # Amount
     ...
     ],
     Public Key,        # Public key of this party. If not specified, may be provided by a DVP_Commit transaction.
     Signature,         # Signature of contractAddress by SigAddress. Usually empty string, provided by a DVP_Commit
                          transaction.
     MustSign           # Boolean. If True, then party must sign, otherwise 'receipt-only' parties are not required to
                          sign and Encumbrances will be used without signature.
    ]

    */


  // ----------------- party 1 ------------------------------

  // Set up party1 pay list and receive list

  let party1PayList = [
    [
      "ACh8e3CbDGcy6zG9lZ1-uXDOnNC4kbIkGw",
      "US Federal Reserve",
      "USD",
      10,
      "",
      "",
      false,
      ""
    ]
  ];

  let party1ReceiveList =[];

  // add paylist and receivelist to party 1

  let party1 = [
    "ACh8e3CbDGcy6zG9lZ1-uXDOnNC4kbIkGw",
    "ACh8e3CbDGcy6zG9lZ1-uXDOnNC4kbIkGw",
    party1PayList,
    party1ReceiveList,
    "",
    "",
    false
  ];

  // ----------------- party 2 ------------------------------

  // Set up party2 pay list and receive list

  let party2PayList = [];

  let party2ReceiveList =[
    [
      "AISFnZmt5lLUCmj6n0Ws6H8QAmuUalb0Ew",
      "US Federal Reserve",
      "USD",
      10
    ]
  ];

  // add pay list and receive list to party2

  let party2 = [
    "ABBm2PkJcgTymEOxzkqP1HDEDxBkiCNgWg",
    "ABBm2PkJcgTymEOxzkqP1HDEDxBkiCNgWg",
    party2PayList,
    party2ReceiveList,
    "",
    "",
    false
  ];

  // ----------------- insert all parties ---------------------

  // Set up the parties in the contract

  let contractParties = [
    2,
    party1,
    party2
  ];

  // ******************************************************************************************************************
  //
  //  Set up Authorisations
  //
  // ******************************************************************************************************************

  /*

  'authorisations': # A list (may be empty) of additional commitments required to validate the contract
  [
      [
      publickey,            # HEX. public key, 64 chars. Alternatively you may specify an Address, in which case 'Signature' may not
                              be supplied, but must be provided by a Commit transaction. This item always relates to the Authorising
                              party, i.e. never the PoA Attorney.
      AuthorisationID       # (May be empty string),
      Signature,            # (API Optional) Base64. Signature of the conatenation of the ContractAddress and the AuthorisationID.
                              Usually empty string, provided by subsequent commitment.
                              For PoA, this signature relates to the Attorney public key which will be taken from the Transaction
                              and saved in PoaPublicKey.
      MetaData,             # (API Optional) User data. May be specified. Will be overwritten by MetaData from Commit if provided.
      Refused               # (API Optional) If true, then this Authorisation is 'Refused'. Refused Authorisations will not count as
                              signed. This value may be set during Commit TXs.
      ContractSpecific,     # (API Optional) (Int) 0 : Signature message does not include ContractAddress, 1 : (default) It does.
                              This allows an authorisation to, optionally, be sent to multiple contracts if required.
      PoaPublicKey          # Internal Use. do not specify. Used to record PoaPublic key when PoAs have been used to sign.
      ],
      ...
   ]

   */

  let authorisations = [];

  // ******************************************************************************************************************
  //
  //  Add Encumbrances on execution - i.e. encumber assets after they are moved
  //
  // ******************************************************************************************************************

  /*

  'addencumbrances' :       # (Optional). Encumbrances to be put in place at the time of contract execution.
  [
       [
          publickey,        # Address or Public Key that may update this variable via a 'Commit' transaction. If a signature is
                              provided, then this needs to be a public key, unless the signature was provided by POA.
                              This item always relates to the Authorising party, i.e. never the Attorney.
          fullassetid,      # Asset to which this encumbrance relates
          reference,        # Reference for this encumbrance, will be set to the contract address if omitted.
          amount,           # Amount of this Encumbrance
          [beneficiaries],  # Beneficiaries.  Those addresses that may exercise an encumbrance with Start and End Times. End time
                              of 0 indicates unending. Format [[Address, StartUTC_Secs, EndUTC_Secs], ...]
          [administrators], # Administrators. Those addresses that may cancel (Amend as a future enhancement ?) an encumbrance with
                              Start and End Times. End time of 0 indicates unending.
                              Format [[Address, StartUTC_Secs, EndUTC_Secs], ...]
          Signature,        # (API Optional) Signature of
                              sha256(ujson.dumps([contractAddress, fullAssetID, reference, amount], sort_keys=True)).hexdigest()
                              If provided by POA, this Signature will have matched the Authoring Public key.
          PoaPublicKey      # (API Optional) Internal Use. do not specify. Used to record PoaPublic key when PoAs have been used to sign

       ],
       ...
    ]

   */

  let addencumbrances = [];


  // ******************************************************************************************************************
  //
  //  Allow contract creator to meet contract obligations from assets encumbered to the contract creator's address
  //
  // ******************************************************************************************************************


  /*

  'encumbrance'   :
  [
      Use Creator Encumbrance (Bool),
      EncumbranceName (String) defaults to Contract Address

  ],

  # (Optional) If included and 'Use Creator Encumbrance' is True, then Unsigned Parties are allowed
    (unless marked MustSign)
  # and unsigned payments will be fulfilled if there is an encumbrance to the address that creates the
    contract (not the contract address)
  # with the specified EncumbranceName.
  # Encumbrances can either be enduring or specific to a contract. To allow encumbrances specific to a
    contract, if
  # 'EncumbranceName' is empty, then the contract address is used as the EncumbranceName.
  # Enduring encumbrances are consumed as unsigned payments are made against them.
  # Contract specific encumbrances (i.e. those that have the contract address as reference) are consumed as they
  # are used and deleted in any case when the contract exercises or expires.

  Encumbrances may be specified towards the contract author in which case the contract definition should indicate their possible existence.

  If an Encumbrance is specified, then unless a party is marked as 'MustSign', any appropriate encumbrance may be used without party signature or
  payment signature.
  In the case where a party IS marked as 'MustSign', then the party must be signed but, again, the payments need not be.

  Encumbrance logic :

    Only used at all if 'encumbrance.UseCreatorEncumbrance' is true.

    Only one encumbrance per payment is checked, encumbrance name priority is PaymentEncumbrance -> ContractEncumbrance -> ContractAddress


  Payment logic :

         If No Encumbrance :
         .
         .  If Signed :
         .  .
         .  .  If Issuance :
         .  .
         .  .    PAY
         .  .
         .  .  If Unencumbered holding sufficient :
         .  .
         .  .    PAY
         .
         If Has Encumbrance :
         .
         .  If sufficient Encumbrance
         .
         .  .    PAY
         .
         .  If insufficient Encumbrance :
         .  .
         .  .  If Signed and Unencumbered balance :
         .  .  .
         .  .  .  PAY
         .  .  .
         .  .  If Signed and Is Issuance :
         .  .  .
         .  .  .  PAY


   */


  let encumbrance = [
    false,
    ""
  ];

  // ******************************************************************************************************************
  //
  //  Combine into contract
  //
  // ******************************************************************************************************************

  let contractJSON = {
    "txType": "NEW_CONTRACT",
    "walletId": 26,
    "timestamp": timestamp,
    "address": authoringAddress,
    "function": "dvp_uk",
    "contractData": {
      "contractFunction": "dvp_uk",
      "parties":contractParties,
      "authorisations": authorisations,
      "addencumbrances": addencumbrances,
      "parameters":parameters,
      "events": [
          'commit',
          'expiry'
      ],
      "startdate": timestamp,
      "expiry": timestamp + 3600,
      "encumbrance": encumbrance,
      "protocol": "",
      "metadata": "{\"title\": \"Sample Contract\"}"
    }
  };


  // ******************************************************************************************************************
  //
  //  Assert contract into the blockchain
  //
  // ******************************************************************************************************************

  let createTx = await client.createTx(contractJSON).catch(errorHandler);

  createTx = JSON.parse(createTx);
  if (createTx) console.log("[tx/create]: ", createTx);

})();
