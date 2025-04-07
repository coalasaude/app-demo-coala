import { EventEmitter } from 'events'

export enum EventBusEnum {
  FEATURE_FLAG_LOAD = 'FEATURE_FLAG_LOAD',
}

export const eventBus = new EventEmitter()
