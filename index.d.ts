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

  export class Client {
    client: RealmsClient;
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
    templates(type: string, page: number, size: number): WorldTemplatePaginatedList;
    get invites(): PendingInvitesList;
    get activities(): any;
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

  export class PendingInvitesList extends ValueObject {
    client: Client;
    invites: PendingInvite[];
    constructor(unparsedJSON: string, client: Client);
    getInvite(id: number): PendingInvite;
  }

  export class PlayerInfo extends ValueObject {
    world: RealmsServer;
    client: Client;
    name: string;
    uuid: string;
    operator: boolean;
    accepted: boolean;
    online: boolean;

    constructor(parsedJSON: any, realmsServer: RealmsServer);
    makeOp(): Ops;
    deopPlayer(): Ops;
    kickPlayer(): RealmsServer;
  }

  export class PlayerList extends ValueObject {
    players: PlayerInfo[];
  }


  export class RealmsClient {
    accessToken: string;
    uuid: string;
    username: string;
    version: string;
    constructor(accessToken: string, version: string, username: string);
    //GET requests
    checkAvailable(): boolean;
    checkCompatiables(): boolean;
    invitesCount(): number;
    invites(): string;
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
    resetWorld(worldId: number, realmsworldresetdto: RealmsDescriptionDto): any; //is this actually a RealmsDescriptionDto or a RealmsWorldResetDto?
    setDesctiption(realmsdesctiptiondto: RealmsDescriptionDto);
  }

  export class RealmsDescriptionDto extends ValueObject {
    name: string;
    description: string;
    world: RealmsServer;
    constructor(name: string, description: string, world: RealmsServer);
    setName(name: string): RealmsServer;
    setDescription(description: string): RealmsServer;
    setProperties(name: string, description: string): RealmsServer;
  }

  export class RealmsNews extends ValueObject {
    client: Client;
    newsLink: string;
    constructor(unparsedJSON: string, client: Client);
  }

  export class RealmsServer {
    client: Client;
    id: number;
    remoteSubscriptionId: number;
    owner: string;
    ownerUUID: string;
    properties: RealmsDescriptionDto;
    defaultPermission: string;
    state: Status;  //probably Status // Resolved
    daysLeft: number;
    expired: boolean;
    expiredTrial: boolean;
    gracePeriod: boolean;
    worldType: string; // probably Template
    players: PlayerInfo[];
    maxPlayers: number;
    minigameName: string;
    minigameId: number;
    minigameImage: string;
    activeSlot: SlotNumber; //probably SlotNumber  // Resolved
    slots: Map<number, RealmsWorldOptions>;
    member: boolean;
    clubId: number;
    constructor(unparsedJSON: string, client: Client);
    sortPlayers(): RealmsServer;
    detailInformation(): RealmsServer;
    invitePlayer(username: string): RealmsServer;
    getPlayerByUUID(uuid: string): PlayerInfo;
    getPlayerByName(name: string): PlayerInfo;
    get joinCreditails(): RealmsServerAddress;
    changeSlot(slot: SlotNumber): RealmsServer;
    open(): boolean;
    close(): boolean;
    download(slot: SlotNumber): WorldDownload;
    downloadActiveSlot(): WorldDownload;
    upload(): UploadInfo;
    setMinigame(minigameId: number | string): boolean;
    backups(): BackupList;
    setTemplate(id: number): boolean;
    createNewWorld(seed: string, levelType: any, generateStructures: boolean): any;
  }

  export class RealmsServerAddress extends ValueObject {
    address: string;
    resourcePackUrl: string;
    resourcePackHash: string;
    constructor(unparsedJSON: string);
  }

  export class RealmsServerList {
    servers: RealmsServer[];
    client: Client;
    constructor(unparsedJSON: string, client: Client);
    getWorld(id: number): RealmsServer;
  }

  export class RealmsWorldOptions extends ValueObject {
    pvp: boolean;
    spawnAnimals: boolean;
    spawnMonsters: boolean;
    spawnNPCs: boolean;
    spawnProtection: number;
    commandBlocks: boolean;
    difficulty: Difficulty;
    gameMode: GameMode;
    forceGamemode: boolean;
    slotName: string;
    templateId: number;
    templateImage: string;
    adventureMap: boolean;
    empty: boolean;
    // the rest is in the JSON but isn't saved.
    // resourcePackHash: string;
    // incompatibilities: any[];
    // versionRef: string;
    // versionLock: string;
    // cheatsAllowed: boolean;
    // texturePacksRequired: boolean;
    // enabledPacks: {
    //   resourcePacks: any[];
    //   behaviorPacks: any[];
    // };
    // customGameServerGlobalProperties: any;

    constructor(pvp: boolean, spawnAnimals: boolean, spawnMonsters: boolean, spawnNPCs: boolean, spawnProtection: boolean, commandBlocks: boolean, difficulty: Difficulty, gameMode: GameMode, forceGameMode: boolean, slotName: string)
    static parse(unparsedJSON: string): RealmsWorldOptions;
    static getEmptyDefaults(): RealmsWorldOptions;
    setEmpty(empty: boolean): void;
  }

  export class RealmsWorldResetDto extends ValueObject {
    constructor(seed: string, worldTemplateId: number, levelType: any, generateStructures: boolean);
    seed: string;
    worldTemplateId: number;
    levelType: any; // probably either WorldType or Templates
    generateStructures: boolean;
  }

  export class Request {
    token: string;
    uuid: string;
    version: string;
    username: string;
    endpoint: string;
    constructor(token: string, uuid: string, version: string, username: string);
    get cookieHeader(): string;
    get(url: string): string;
    post(url: string, payload: any): string;
    put(url: string): string;
    delete(url: string): string;
  }

  export class UploadInfo extends ValueObject {
    worldClosed: boolean;
    token: string;
    uploadEndpoint: any;
    port: any;
    constructor(unparsedJSON: string);
  }

  export class ValueObject {
    toString(): string;
    toJSON(): JSON;
  }

  export class WorldDownload extends ValueObject {
    downloadLink: string;
    resourcePackUrl: string;
    resourcePackHash: string;
    constructor(unparsedJSON: string);
  }

  export class WorldTemplate extends ValueObject {
    id: number;
    name: string;
    version: string;
    author: string;
    image: string;
    trailer: string;
    recommendedPlayers: string;
    type: Templates;
    constructor(parsedJSON: any);
  }

  export class WorldTemplatePaginatedList extends ValueObject {
    size: number;
    page: number;
    total: number;
    templates: WorldTemplate[];
    constructor(unparsedJSON: string);
    getTemplate(id: number): WorldTemplate;
  }


  export enum GameMode {
    SURVIVAL = 0,
    CREATIVE = 1,
    ADVENTURE = 2,
    SPECTATOR = 3
  }

  export enum Difficulty {
    PEACEFUL = 0,
    EASY = 1,
    NORMAL = 2,
    HARD = 3
  }

  export enum Status {
    CLOSED = "CLOSED",
    OPEN = "OPEN",
    UNINITIALIZED = "UNINITIALIZED"
  }

  export enum WorldType {
    DEFAULT = 0,
    FLAT = 1,
    LARGE_BIOMES = 2,
    AMPLIFIED = 3
  }

  export enum Templates {
    ADVENTURES = "ADVENTUREMAP",
    WORLD_TEMPLATES = "NORMAL",
    MINIGAMES = "MINIGAME",
    EXPERIENCES = "EXPERIENCE",
    INSPIRATION = "INSPIRATION"
  }

  export type SlotNumber = 1 | 2 | 3 | 4;

}
