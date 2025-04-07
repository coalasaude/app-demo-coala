import { EventModel, EventModelConstructor } from './event.model'

type TimelineModelConstructor = {
  events: EventModelConstructor[]
  meta: { isAuthorized: boolean }
}

export class TimelineModel {
  private _events: EventModel[]
  private _meta: { isAuthorized: boolean }

  constructor(params: TimelineModelConstructor) {
    this._events = params.events.map((event) => new EventModel(event))
    this._meta = params.meta
  }

  get events(): EventModel[] {
    return this._events
  }

  get records(): Required<EventModel>[] {
    return (this._events.filter((event) => event.type === 'RECORD') as Required<EventModel>[]) || []
  }

  get meta() {
    return this._meta
  }
}
