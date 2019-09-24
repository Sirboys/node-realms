const Client = require('../Client/Methods');
const PlayerInfo = require("./PlayerInfo");
const ValueObject = require("./ValueObject");
const RealmsWorldOptions = require("./RealmsWorldOptions");
const RealmsDescriptionDto = require("./RealmsDescriptionDto");
const RealmsServerAddress = require("./RealmsServerAddress");
const WorldDownload = require("./WorldDownload");
const UploadInfo = require("./UploadInfo");
const BackupList = require("./BackupList");
const RealmsWorldResetDto = require("./RealmsWorldResetDto");

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
            this.properties = new RealmsDescriptionDto(parsedJSON.name,parsedJSON.motd,this);
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
             * @type {Map<Number,RealmsWorldOptions>}
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
            } else {
                return a.name.toLowerCase() < b.name.toLowerCase();
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
    /**
     * @returns {RealmsServerAddress}
     */
    get joinCreditails(){
            return new RealmsServerAddress(this.client.joinToWorld(this.id));
    }
    /**
     * 
     * @param {number} slot 
     */
    changeSlot(slot){
        if (slot == this.activeSlot){
            console.error("Slot is already set");
        }else{
            this.client.setSlot(this.id,slot);
            return this.detailInformation();
        }
    }
    /**
     * @returns {Boolean}
     */
    open(){
        return this.client.openRealm(this.id);
    }
    /**
     * @returns {Boolean}
     */
    close(){
        return this.client.closeRealm(this.id);
    }
    download(slot){
        return new WorldDownload(this.client.download(this.id,slot));
    }
    downloadActiveSlot(){
        return this.download(this.activeSlot);
    }
    /**
     * @returns {UploadInfo}
     */
    upload(){
        return new UploadInfo(this.client.uploadInfo(this.id));
    }
    /**
     * 
     * @param {Number|String} minigameId 
     * @returns {Boolean}
     */
    setMinigame(minigameId){
        return this.client.setMinigame(this.id,minigameId);
    }
    backups(){
        return new BackupList(this.client.backups(this.id),this)
    }
    /**
     * 
     * @param {Number} id 
     * @returns {Boolean}
     */
    setTemplate(id){
        let realmsworldresetdto = new RealmsWorldResetDto(null, id, -1, false)
        return this.client.resetWorld(this.id,realmsworldresetdto);
    }
    createNewWorld(seed,levelType,generateStructures){
        let realmsworldresetdto = new RealmsWorldResetDto(seed, -1, levelType, generateStructures);
        return this.client.resetWorld(this.id,realmsworldresetdto);
    }
}
module.exports = RealmsServer;