const Client = require('../Client/Methods');
const PlayerInfo = require("./PlayerInfo");
const ValueObject = require("./ValueObject");
const RealmsWorldOptions = require("./RealmsWorldOptions");
const PlayerList = require("./PlayerList");
const Ops = require("./Ops");
const RealmsDescriptionDto = require("./RealmsDescriptionDto");

class RealmsServer extends ValueObject{
    /**
     * 
     * @param {String} unparsedJSON 
     */
    
    constructor(unparsedJSON,client){
        super();
        try{
            /**
             * @type {Client}
             */
            this.client = client;

            let parsedJSON = JSON.parse(unparsedJSON);
            this.id = parsedJSON.id;
            this.remoteSubscriptionId = parsedJSON.remoteSubscriptionId;
            this.owner = parsedJSON.owner;
            this.ownerUUID = parsedJSON.ownerUUID;
            this.realmsdescriptiondto = new RealmsDescriptionDto(parsedJSON.name,parsedJSON.motd,this);
            this.defaultPermission = parsedJSON.defaultPermission;
            this.state = parsedJSON.state;
            this.daysLeft = parsedJSON.daysLeft;
            this.expired = parsedJSON.expired;
            this.expiredTrial = parsedJSON.expiredTrial;
            this.gracePeriod = parsedJSON.gracePeriod;
            this.worldType = parsedJSON.worldType;
            /**
            * @type {PlayerInfo[]}
            */
            this.players = [];
            if (parsedJSON.players != null){
                parsedJSON.players.forEach(player => {
                    this.players.push(new PlayerInfo(player,this));
                });
            }
            this.maxPlayers = parsedJSON.maxPlayers;
            this.minigameName = parsedJSON.minigameName;
            this.minigameId = parsedJSON.minigameId;
            this.minigameImage = parsedJSON.minigameImage;
            this.activeSlot = parsedJSON.activeSlot;
            /**
             * @type {Map<number,RealmsWorldOptions>}
             */
            this.slots = parsedJSON.slots;
            if (parsedJSON.slots){
                let slots = new Map();
                for (let i=1;i<=3;i++){
                    slots.set(i,RealmsWorldOptions.parse(parsedJSON.slots[i-1].options));
                }
                this.slots = slots
            }
            this.member = parsedJSON.member;
            this.clubId = parsedJSON.clubId;
        }catch(e){
            console.error("Could parse RealmsServer: "+ e);
        }
    }
    sortPlayers(){
        this.players.sort(function(a, b){
            if (a.accepted != b.accepted){
                return Number(b.accepted) - Number(a.accepted);
            }else{
                return a.name.charCodeAt(0) - b.name.charCodeAt(0);
            }
        });
        return this;
    }
    detailInformation(){
        return new RealmsServer(this.client.world(this.id),this.client);
    }
    invitePlayer(username){
        return new RealmsServer(this.client.invitePlayer(this.world.id,username),this.client);
    }
    getPlayerByUUID(uuid){
        return this.players.find(playerInfo => playerInfo.uuid.toLowerCase() == uuid.toLowerCase());
    }
    getPlayerByName(name){
        return this.players.find(playerInfo => playerInfo.name.toLowerCase() == name.toLowerCase());
    }
}
module.exports = RealmsServer;