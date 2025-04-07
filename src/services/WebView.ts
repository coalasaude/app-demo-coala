import { extractYouTubeVideoId } from '@/v3/utils/extractYouTubeVideoId'

class WebView {
  private webview?: any

  constructor() {
    this.getWebView()
  }

  open(url?: string | URL | undefined, target?: string | undefined, features?: string | undefined) {
    this.getWebView()
    if (this.webview) {
      this.webview.postMessage('OPEN: ' + String(url))
      return true
    }
    setTimeout(() => window.open(url, target, features))
    return true
  }

  hasWebView() {
    this.getWebView()
    return !!this.webview
  }

  getWebView() {
    if (typeof window !== 'undefined') {
      this.webview = (window as any)?.ReactNativeWebView || (document as any)?.ReactNativeWebView
    }
    return this.webview
  }

  sendVideoUrl(videoUrl?: string) {
    this.getWebView()

    if (this.webview) {
      let url
      if (videoUrl?.includes('youtube')) {
        const videoId = extractYouTubeVideoId(videoUrl)
        url = `https://www.youtube.com/embed/${videoId}?&autoplay=1&mute=1&showinfo=0&controls=1&fullscreen=1`
      } else {
        url = videoUrl
      }

      this.webview.postMessage('PLAY_VIDEO: ' + url)
    }
  }
}

export const WebViewManager = new WebView()
