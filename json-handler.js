import setting from "./setting.json" assert{type: 'json'}

let settingStr = JSON.stringify(setting)
const settingObj = JSON.parse(settingStr)

let defaultProgLang = settingObj.default_programming_language