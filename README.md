Realms Client API
=====================
Realms Control module for Node.JS


#### Main Class

```js
const Realms = require("realms");

var realms = new Realms('token:$ACCESS_TOKEN:63a91ed9a480454696d8e000678f61e2',"1.14.4","Sirboys");
//Replace $ACCESS_TOKEN to you access token. From launcher profiles or Mojang Auth API.
//For more info see https://wiki.vg/Authentication

if (realms.availability == true){
    console.log("Realms available for this user");
}
```