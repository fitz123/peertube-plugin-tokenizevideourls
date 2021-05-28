async function register ({
  registerHook,
  registerSetting,
  settingsManager,
  storageManager,
  videoCategoryManager,
  videoLicenceManager,
  videoLanguageManager
  peertubeHelpers
}) {
    const fieldName = 'hello-world-field'

    registerHook({
      target: 'action:api.video.updated',
      handler: ({ video, body }) => {
        if (!body.pluginData) return

        storageManager.storeData(fieldName + '-' + video.id, body.pluginData[fieldName])
      }
    })

    registerHook({
      target: 'filter:api.video.get.result',
      handler: async (video) => {
        if (!video) return video

        if (!video.pluginData) video.pluginData = {}

        const result = await storageManager.getData(fieldName + '-' + video.id)
        video.pluginData[fieldName] = result

        return video
      }
    })
}

async function unregister () {
  return
}

module.exports = {
  register,
  unregister
}
