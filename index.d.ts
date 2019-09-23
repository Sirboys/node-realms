//TODO: Add everything.
//TODO: Check everything.
//TODO: Replace (almost) every 'any' with the actual types.

declare module "minecraft-realms" {
  export class Backup extends ValueObject {
    world: any;
    backupId: any;
    lastModifiedDate: Date;
    size: any;
    metadata: Metadata;

    constructor(parsedJSON: any, world: any);
  }

  export class BackupList {
    world: any;
    backups: Backup[];
    constructor(parsedJSON: any, world: any);
    getBackup(id: any): Backup;
  }

  export interface Metadata {
    game_difficulty: any;
    name: any,
    game_server_version: any,
    enabled_packs: any,
    description: any,
    game_mode: any,
    world_type: any
  }


  export class Ops extends ValueObject {
    ops: any;
    world: RealmsServer;
    constructor(unparsedJSON: string, world: RealmsServer);
  }

  export class PendingInvite extends ValueObject {
    client: Client;
    invitationId: any;
    worldName: any;
    worldDescription: any;
    worldOwnerName: any;
    worldOwnerUuid: any;
    date: Date;
    constructor(parsedJSON: any, client: Client);
    accept(): void;
    reject(): void;
    //TODO: This is where is stopped working
  }

  export class Client {
    constructor(accessToken: string, version: string, username: string);
    get trial(): boolean;
    get availability(): boolean;
    get compatible(): "COMPATIBLE" | "OUTDATED" | "OTHER";
    get invitesCount(): number;
    get worlds(): RealmsServerList;
    get news(): RealmsNews;
    /**
     * @param type The type of the Template `MINIGAME`, `ADVENTUREMAP`, `NORMAL`, `EXPERIENCE`, or `INSPIRATION`.
     * @param page 
     * @param size 
     */
    templates(type: string, page: number, size: number): RealmsTemplatePaginatedList;
    get invites(): PendingInvitesList;
    get activities(): any;
  }

  export class RealmsClient {
    /**
     * Main class for control Realms
     * @param {String} accessToken 
     * @param {String} version 
     * @param {String} username 
     */
    constructor(accessToken: string, version: string, username: string);
    //GET requests
    checkAvailable(): boolean;
    checkCompatiables(): boolean;
    invitesCount(): number;
    invites(): any;
    trial(): boolean;
    news(): RealmsNews;
    activities(): string;
    subscriptions(worldId: number): any;
    joinToWorld(worldId: number): any;
    world(worldId: number): any;
    backups(worldId: number): any;
    download(worldId: number, slot: number): any;
    templates(type: string, page: number, size: number): any;
    worlds(): any;
    //PUT requests
    setMinigame(worldId: number, minigameId: number): boolean;
    setSlot(worldId: number, slot: number): any;
    acceptInvite(invitationId: any): any;
    rejectInvite(invitationId: any): any;
    openRealm(worldId: number): any;
    closeRealm(worldId: number): any;
    uploadInfo(worldId: number): any;
    //DELETE Requests
    kickPlayer(worldId: number, UUID: string): any;
    deopPlayer(worldId: number, UUID: string): any;
    //POST Requests
    makeOp(worldId: number, UUID: string): any;
    invitePlayer(worldId: number, username: string): any;
    resetWorld(worldId: number, realmsworldresetdto: RealmsDesctiptionDto): any;
    setDesctiption(realmsdesctiptiondto: RealmsDesctiptionDto);
  }

  interface RealmsNews {
    client: any;
    newsLink: string;
  }

  enum Status {
    CLOSED = "CLOSED",
    OPEN = "OPEN",
    UNINITIALIZED = "UNINITIALIZED"
  }

  enum WorldType {
    DEFAULT = 0,
    FLAT = 1,
    LARGE_BIOMES = 2,
    AMPLIFIED = 3
  }

  enum Templates {
    ADVENTURES = "ADVENTUREMAP",
    WORLD_TEMPLATES = "NORMAL",
    MINIGAMES = "MINIGAME",
    EXPERIENCES = "EXPERIENCE",
    INSPIRATION = "INSPIRATION"
  }

  type SlotNumber = 1 | 2 | 3 | 4;

  class RealmsServerList {
    servers: RealmsServer[];
    getWorld(id: number): RealmsServer;
  }

  class RealmsServer {
    sortPlayers(): RealmsServer;
    detailInformation(): RealmsServer;
    invitePlayer(username: string): RealmsServer;
    getPlayerByUUID(uuid: string): any;
    getPlayerByName(name: string): any;
    get joinCreditails(): RealmsServerAddress;
    changeSlot(slot: SlotNumber): any;
    open(): boolean;
    close(): boolean;
    download(slot: SlotNumber): any;
    downloadActiveSlot(): any;
    upload(): UploadInfo;
    setMinigame(minigameId: number | string): boolean;
    backups(): BackupList;
    setTemplate(id: number): boolean;
    createNewWorld(seed: string, levelType: any, generateStructures: boolean);
  }

  class ValueObject {
    toString(): string;
    toJSON(): any;
  }
}