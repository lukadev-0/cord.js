import type {
  NonThreadGuildBasedChannel,
  DMChannel,
  TextBasedChannel,
  GuildEmoji,
  GuildBan,
  Guild,
  GuildMember,
  PartialGuildMember,
  Collection,
  Snowflake,
  Invite,
  Message,
  PartialMessage,
  MessageReaction,
  PartialMessageReaction,
  User,
  PartialUser,
  Presence,
  Client,
  Role,
  ThreadChannel,
  ThreadMember,
  Typing,
  VoiceState,
  TextChannel,
  NewsChannel,
  Interaction,
  StageInstance,
  Sticker,
  GuildScheduledEvent,
} from 'discord.js'
import { IntentsBitField } from 'discord.js'

/**
 * Data object of Discord.js events
 *
 * @public
 */
export interface DiscordClientEventData {
  cacheSweep: { message: string }
  channelCreate: { channel: NonThreadGuildBasedChannel }
  channelDelete: {
    channel: DMChannel | NonThreadGuildBasedChannel
  }
  channelPinsUpdate: { channel: TextBasedChannel; date: Date }
  channelUpdate: {
    oldChannel: DMChannel | NonThreadGuildBasedChannel
    newChannel: DMChannel | NonThreadGuildBasedChannel
  }
  warn: { message: string }
  emojiCreate: { emoji: GuildEmoji }
  emojiDelete: { emoji: GuildEmoji }
  emojiUpdate: { oldEmoji: GuildEmoji; newEmoji: GuildEmoji }
  error: { error: Error }
  guildBanAdd: { ban: GuildBan }
  guildBanRemove: { ban: GuildBan }
  guildCreate: { guild: Guild }
  guildDelete: { guild: Guild }
  guildUnavailable: { guild: Guild }
  guildIntegrationsUpdate: { guild: Guild }
  guildMemberAdd: { member: GuildMember }
  guildMemberAvailable: {
    member: GuildMember | PartialGuildMember
  }
  guildMemberRemove: {
    member: GuildMember | PartialGuildMember
  }
  guildMembersChunk: {
    members: Collection<Snowflake, GuildMember>
    guild: Guild
    data: { count: number; index: number; nonce: string | undefined }
  }
  guildMemberUpdate: {
    oldMember: GuildMember | PartialGuildMember
    newMember: GuildMember
  }
  guildUpdate: { oldGuild: Guild; newGuild: Guild }
  inviteCreate: { invite: Invite }
  inviteDelete: { invite: Invite }
  messageCreate: { message: Message }
  messageDelete: { message: Message | PartialMessage }
  messageReactionRemoveAll: {
    message: Message | PartialMessage
    reactions: Collection<string | Snowflake, MessageReaction>
  }
  messageReactionRemoveEmoji: {
    reaction: MessageReaction | PartialMessageReaction
  }
  messageDeleteBulk: {
    messages: Collection<Snowflake, Message | PartialMessage>
  }
  messageReactionAdd: {
    reaction: MessageReaction | PartialMessageReaction
    user: User | PartialUser
  }
  messageReactionRemove: {
    reaction: MessageReaction | PartialMessageReaction
    user: User | PartialUser
  }
  messageUpdate: {
    oldMessage: Message | PartialMessage
    newMessage: Message | PartialMessage
  }
  presenceUpdate: {
    oldPresence: Presence | null
    newPresence: Presence
  }
  ready: { client: Client<true> }
  invalidated: Record<string, never>
  roleCreate: { role: Role }
  roleDelete: { role: Role }
  roleUpdate: { oldRole: Role; newRole: Role }
  threadCreate: { thread: ThreadChannel }
  threadDelete: { thread: ThreadChannel }
  threadListSync: {
    threads: Collection<Snowflake, ThreadChannel>
  }
  threadMemberUpdate: {
    oldMember: ThreadMember
    newMember: ThreadMember
  }
  threadMembersUpdate: {
    oldMembers: Collection<Snowflake, ThreadMember>
    newMembers: Collection<Snowflake, ThreadMember>
  }
  threadUpdate: {
    oldThread: ThreadChannel
    newThread: ThreadChannel
  }
  typingStart: { typing: Typing }
  userUpdate: {
    oldUser: User | PartialUser
    newUser: User
  }
  voiceStateUpdate: {
    oldState: VoiceState
    newState: VoiceState
  }
  webhookUpdate: { channel: TextChannel | NewsChannel }
  interactionCreate: { interaction: Interaction }
  shardDisconnect: { closeEvent: CloseEvent; shardId: number }
  shardError: { error: Error; shardId: number }
  shardReady: {
    shardId: number
    unavailableGuilds: Set<Snowflake> | undefined
  }
  shardReconnecting: { shardId: number }
  shardResume: { shardId: number; replayedEvents: number }
  stageInstanceCreate: { stageInstance: StageInstance }
  stageInstanceUpdate: {
    oldStageInstance: StageInstance | null
    newStageInstance: StageInstance
  }
  stageInstanceDelete: { stageInstance: StageInstance }
  stickerCreate: { sticker: Sticker }
  stickerDelete: { sticker: Sticker }
  stickerUpdate: { oldSticker: Sticker; newSticker: Sticker }
  guildScheduledEventCreate: {
    guildScheduledEvent: GuildScheduledEvent
  }
  guildScheduledEventUpdate: {
    oldGuildScheduledEvent: GuildScheduledEvent
    newGuildScheduledEvent: GuildScheduledEvent
  }
  guildScheduledEventDelete: {
    guildScheduledEvent: GuildScheduledEvent
  }
  guildScheduledEventUserAdd: {
    guildScheduledEvent: GuildScheduledEvent
    user: User
  }
  guildScheduledEventUserRemove: {
    guildScheduledEvent: GuildScheduledEvent
    user: User
  }
}

/**
 * The names of the parameters of Discord.js events
 *
 * @public
 */
export const DiscordClientEventProperties = {
  apiRequest: ['request'],
  apiResponse: ['response'],
  cacheSweep: ['message'],
  channelCreate: ['channel'],
  channelDelete: ['channel'],
  channelPinsUpdate: ['channel', 'time'],
  channelUpdate: ['oldChannel', 'newChannel'],
  warn: ['message'],
  emojiCreate: ['emoji'],
  emojiDelete: ['emoji'],
  emojiUpdate: ['oldEmoji', 'newEmoji'],
  error: ['error'],
  guildBanAdd: ['ban'],
  guildBanRemove: ['ban'],
  guildCreate: ['guild'],
  guildDelete: ['guild'],
  guildUnavailable: ['guild'],
  guildIntegrationsUpdate: ['guild'],
  guildMemberAdd: ['member'],
  guildMemberAvailable: ['member'],
  guildMemberRemove: ['member'],
  guildMembersChunk: ['members', 'guild', 'chunk'],
  guildMemberUpdate: ['oldMember', 'newMember'],
  guildUpdate: ['oldGuild', 'newGuild'],
  inviteCreate: ['invite'],
  inviteDelete: ['invite'],
  messageCreate: ['message'],
  messageDelete: ['message'],
  messageReactionRemoveAll: ['message', 'reactions'],
  messageReactionRemoveEmoji: ['reaction'],
  messageDeleteBulk: ['messages'],
  messageReactionAdd: ['reaction', 'user'],
  messageReactionRemove: ['reaction', 'user'],
  messageUpdate: ['oldMessage', 'newMessage'],
  presenceUpdate: ['oldPresence', 'newPresence'],
  ready: ['client'],
  invalidated: [],
  roleCreate: ['role'],
  roleDelete: ['role'],
  roleUpdate: ['oldRole', 'newRole'],
  threadCreate: ['thread'],
  threadDelete: ['thread'],
  threadListSync: ['threads'],
  threadMemberUpdate: ['oldMember', 'newMember'],
  threadMembersUpdate: ['oldMembers', 'newMembers'],
  threadUpdate: ['oldThread', 'newThread'],
  typingStart: ['typing'],
  userUpdate: ['oldUser', 'newUser'],
  voiceStateUpdate: ['oldState', 'newState'],
  webhookUpdate: ['channel'],
  interactionCreate: ['interaction'],
  shardDisconnect: ['closeEvent', 'shardId'],
  shardError: ['error', 'shardId'],
  shardReady: ['shardId', 'unavailableGuilds'],
  shardReconnecting: ['shardId'],
  shardResume: ['shardId', 'replayedEvents'],
  stageInstanceCreate: ['stageInstance'],
  stageInstanceUpdate: ['oldStageInstance', 'newStageInstance'],
  stageInstanceDelete: ['stageInstance'],
  stickerCreate: ['sticker'],
  stickerDelete: ['sticker'],
  stickerUpdate: ['oldSticker', 'newSticker'],
  guildScheduledEventCreate: ['guildScheduledEvent'],
  guildScheduledEventUpdate: [
    'oldGuildScheduledEvent',
    'newGuildScheduledEvent',
  ],
  guildScheduledEventDelete: ['guildScheduledEvent'],
  guildScheduledEventUserAdd: ['guildScheduledEvent', 'user'],
  guildScheduledEventUserRemove: ['guildScheduledEvent', 'user'],
}

/**
 * The intents of Discord.js events
 *
 * @public
 */
export const DiscordClientEventIntents = {
  apiRequest: null,
  apiResponse: null,
  cacheSweep: null,
  channelCreate: IntentsBitField.Flags.Guilds,
  channelDelete: IntentsBitField.Flags.Guilds,
  channelPinsUpdate: IntentsBitField.Flags.Guilds,
  channelUpdate: IntentsBitField.Flags.Guilds,
  warn: null,
  emojiCreate: IntentsBitField.Flags.GuildEmojisAndStickers,
  emojiDelete: IntentsBitField.Flags.GuildEmojisAndStickers,
  emojiUpdate: IntentsBitField.Flags.GuildEmojisAndStickers,
  error: null,
  guildBanAdd: IntentsBitField.Flags.GuildBans,
  guildBanRemove: IntentsBitField.Flags.GuildBans,
  guildCreate: IntentsBitField.Flags.Guilds,
  guildDelete: IntentsBitField.Flags.Guilds,
  guildUnavailable: null,
  guildIntegrationsUpdate: IntentsBitField.Flags.GuildIntegrations,
  guildMemberAdd: IntentsBitField.Flags.GuildMembers,
  guildMemberAvailable: IntentsBitField.Flags.GuildMembers,
  guildMemberRemove: IntentsBitField.Flags.GuildMembers,
  guildMembersChunk: IntentsBitField.Flags.GuildMembers,
  guildMemberUpdate: IntentsBitField.Flags.GuildMembers,
  guildUpdate: IntentsBitField.Flags.Guilds,
  inviteCreate: IntentsBitField.Flags.GuildInvites,
  inviteDelete: IntentsBitField.Flags.GuildInvites,
  messageCreate: IntentsBitField.Flags.GuildMessages,
  messageDelete: IntentsBitField.Flags.GuildMessages,
  messageReactionRemoveAll: IntentsBitField.Flags.GuildMessageReactions,
  messageReactionRemoveEmoji: IntentsBitField.Flags.GuildMessageReactions,
  messageDeleteBulk: 'messages',
  messageReactionAdd: IntentsBitField.Flags.GuildMessageReactions,
  messageReactionRemove: IntentsBitField.Flags.GuildMessageReactions,
  messageUpdate: IntentsBitField.Flags.GuildMessages,
  presenceUpdate: IntentsBitField.Flags.GuildPresences,
  ready: null,
  invalidated: null,
  roleCreate: IntentsBitField.Flags.Guilds,
  roleDelete: IntentsBitField.Flags.Guilds,
  roleUpdate: IntentsBitField.Flags.Guilds,
  threadCreate: IntentsBitField.Flags.Guilds,
  threadDelete: IntentsBitField.Flags.Guilds,
  threadListSync: IntentsBitField.Flags.Guilds,
  threadMemberUpdate: IntentsBitField.Flags.Guilds,
  threadMembersUpdate: null, // controlled by option
  threadUpdate: IntentsBitField.Flags.Guilds,
  typingStart: null, // controlled by option
  userUpdate: null,
  voiceStateUpdate: IntentsBitField.Flags.GuildVoiceStates,
  webhookUpdate: IntentsBitField.Flags.GuildWebhooks,
  interactionCreate: null,
  shardDisconnect: null,
  shardError: null,
  shardReady: null,
  shardReconnecting: null,
  shardResume: null,
  stageInstanceCreate: IntentsBitField.Flags.Guilds,
  stageInstanceUpdate: IntentsBitField.Flags.Guilds,
  stageInstanceDelete: IntentsBitField.Flags.Guilds,
  stickerCreate: IntentsBitField.Flags.GuildEmojisAndStickers,
  stickerDelete: IntentsBitField.Flags.GuildEmojisAndStickers,
  stickerUpdate: IntentsBitField.Flags.GuildEmojisAndStickers,
  guildScheduledEventCreate: IntentsBitField.Flags.GuildScheduledEvents,
  guildScheduledEventUpdate: IntentsBitField.Flags.GuildScheduledEvents,
  guildScheduledEventDelete: IntentsBitField.Flags.GuildScheduledEvents,
  guildScheduledEventUserAdd: IntentsBitField.Flags.GuildScheduledEvents,
  guildScheduledEventUserRemove: IntentsBitField.Flags.GuildScheduledEvents,
}
