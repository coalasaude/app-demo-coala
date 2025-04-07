interface SaaSSettingsConstructorParams {
  videoCallType: 'JITSI' | 'VIDEOSDK'
  videoCallNative: boolean
}

export class SaaSSettings {
  public readonly videoCallType: 'JITSI' | 'VIDEOSDK'
  public readonly videoCallNative: boolean

  constructor(params: SaaSSettingsConstructorParams) {
    this.videoCallType = params.videoCallType
    this.videoCallNative = params.videoCallNative
  }
}
