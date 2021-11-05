const kuma = require('./kuma');
const popularitiesJson = require('@mdn/yari/popularities.json');
const { asDefinitionList, isDefinitionList } = require("@mdn/yari/markdown/m2h/handlers/dl");

module.exports = {
    kuma,
    popularitiesJson,
    markdown: {
        asDefinitionList,
        isDefinitionList,
    }
}