// Note! This is in many ways copied verbatim from @mdn/yari
const mdnDataCSS = require('mdn-data/css');
const {
  s_named_color_link,
  s_system_color_link,
  s_where,
  s_syntax_value_definition,
  typeInfo,
  operators,
} = require('./localizations')
const syncReplace = require('./utils')

function cssSyntax(termName, initialAtRule) {
  const { targetLocale, slug } = this;
  let atRule = initialAtRule;
  
  let externallyDescribedTypesData = {
    "named-color": {
      link: s_named_color_link
    },
    "deprecated-system-color": {
      link: s_system_color_link
    }
  };

  let data = {
      ...mdnDataCSS,
      externallyDescribedTypes: externallyDescribedTypesData,
  };
  let name = termName || (slug ? slug.split("/").pop().toLowerCase() : "preview-wiki-content");

  // "Conflicting" documents have an MD5 postfix to deal with multiple conflicting documents.
  // In here we need a clean name so remove the MD5 part.
  name = name.replace(/(.*)_[a-f0-9]{32}$/, (_, x) => x);
  let rawSyntax = "";
  let formattedSyntax = "";
  
  function buildLink(match, type) {
      var link = "/" + targetLocale + "/docs/Web/CSS/";
      var title = "";
      var propertyName = type.match(/'(.+?)'/);
      // Handle property references like <'color'>
      if (propertyName) {
          if (data.properties[propertyName[1]]) {
              title = data.properties[propertyName[1]].syntax;
          }
          return "<a href=\"" + link + propertyName[1] + "\" title=\"" + title + "\">&lt;" + propertyName[0] + "&gt;</a>";
      // Handle basic types
      } else if (Object.prototype.hasOwnProperty.call(typeInfo, type)) {
          var typeLinkName = typeInfo[type].typeLinkName || type;
          link += typeLinkName;
          if (typeInfo[type].title) {
              title = typeInfo[type].title;
          } else {
              title = "";
          }
      // Handle types which we want to describe using a link to a different page
      }  else if (Object.prototype.hasOwnProperty.call(data.externallyDescribedTypes, type)) {
               return "<a href=\"/" + targetLocale + data.externallyDescribedTypes[type].link + "\">&lt;" + type + "&gt;</a>";
      // Handle advanced types having their syntax defined within the 'CSSData' template
      } else if (data.syntaxes[type]) {
          return "<a href=\"#" + type + "\">&lt;" + type + "&gt;</a>";
      // Handled advanced types having their syntax not defined
      } else {
          return "&lt;" + type + "&gt;";
      }
      return "<a href=\"" + link + "\" title=\"" + title + "\">&lt;" + type + "&gt;</a>";
  }
  function addBrackets(str) {
      return str.match(/\(\)$/) ? str : str + "()";
  }
  function formatSyntax(rawSyntax) {
      if (rawSyntax === "") {
          return "";
      }
      var formattedSyntax = rawSyntax;
      operators.forEach(function(operator) {
          if (formattedSyntax.indexOf("\n") !== -1 &&
              operator.title === "Curly braces") {
              return "";
          }
          formattedSyntax = formattedSyntax.replace(operator.regexp,
              function(match, text) {
              var linkText = match;
              if (match.indexOf("*") !== -1) {
                  linkText = "*";
              } else if (match.indexOf("}") !== -1) {
                  linkText = "}";
              } else if (typeof text === "string") {
                  linkText = text;
              }
              var output = "<a href=\"/" + targetLocale + "/docs/CSS/" +
                  s_syntax_value_definition + "#" + operator.anchor.toLowerCase() +
                  "\" title=\"" + operator.title + "\">" + linkText + "</a>";
              if (linkText === "|") {
                  output = " " + output + " ";
              } else if (linkText === "*" || linkText === "}") {
                  output = text + output;
              }
              return output;
          });
      });
      formattedSyntax = syncReplace(
          formattedSyntax,
          /<([a-z0-9()'-]+?( \[-?(\d+|∞),(\d+|∞)\])?)>/gi,
          buildLink
      );
      return formattedSyntax;
  }
  function formatTypesSyntax(formattedSyntax, describedTypes) {
      var formattedTypesSyntax = "";
      var types = [];
      var typeAnchorAttributes = formattedSyntax.match(/href=".+?"/g);
      if (typeAnchorAttributes) {
          typeAnchorAttributes.forEach(function(typeAnchorAttribute) {
              var type = typeAnchorAttribute.match(/href="(?:#|.*\/)(.+?)"/);
              if (types.indexOf(type[1]) === -1 &&
                  type[1].indexOf(s_syntax_value_definition) === -1) {
                  // Some data type page names have '_value' appended,
                  // which needs to be removed in order to find the syntax
                  var subType = type[1].replace("_value", "");
                  // Describe this type if it exists in "syntaxes" and
                  // it *does not* exist in externallyDescribedTypes
                  if ((Object.prototype.hasOwnProperty.call(data.syntaxes, subType)) &&
                      (!Object.prototype.hasOwnProperty.call(data.externallyDescribedTypes, subType))) {
                      types.push(subType);
                  }
              }
          });
          var typesSyntax = "";
          if (types.length > 0) {
              for(let index = 0; index < types.length; index++) {
                  let type = types[index];
                  // Avoid recursions by checking whether a type was already
                  // described before
                  // check whether https://github.com/mdn/data/pull/66 was merged
                  var syntax = data.syntaxes[type].syntax || data.syntaxes[type];
                  if (describedTypes.indexOf(type) === -1) {
                      typesSyntax += "<span id=\"" + type + "\">&lt;" + type +
                          "&gt;</span> = " + formatSyntax(syntax);
                      if (index < types.length - 1) {
                          typesSyntax += "<br/>";
                      }
                      describedTypes.push(type);
                  }
              }
              if (typesSyntax !== "") {
                  formattedTypesSyntax += "<p style=\"font-family:Open Sans,Arial," +
                      "sans-serif; margin: 10px 0 0 0;\">" + s_where +
                      "<br/><code style=\"font-family:Consolas,Monaco," +
                      "&quot;Andale Mono&quot;,monospace;\">" + typesSyntax +
                      "</code></p>";
              }
          }
          return formattedTypesSyntax + formatTypesSyntax(typesSyntax, describedTypes);
      }
      return formattedTypesSyntax;
  }
  if (!atRule) {
      var matches = null;
      if (slug) {
          matches = slug.match(/\/CSS\/(@.+?)(?=\/)/);
      }
      if (matches) {
          atRule = matches[1];
      }
  }
  if (name === "preview-wiki-content") {
      formattedSyntax = "<span style=\"color:red;\">Інформація недоступна в попередньому перегляді</span>";
  } else {
      if (atRule) {
          if (data.atRules[atRule] && data.atRules[atRule].descriptors && data.atRules[atRule].descriptors[name]) {
              rawSyntax = data.atRules[atRule].descriptors[name].syntax;
          }
      } else if (name[0] === "@") {
          if (data.atRules[name] && data.atRules[name].syntax) {
              rawSyntax = data.atRules[name].syntax;
          }
      } else if (name[0] === ":" && typeof data.selectors[name] !== 'undefined') {
          rawSyntax = data.selectors[name].syntax;
      } else if (data.properties[name]) {
          rawSyntax = data.properties[name].syntax;
      } else if (data.syntaxes[addBrackets(name)]) {
          rawSyntax = data.syntaxes[addBrackets(name)].syntax;
      }
      formattedSyntax = formatSyntax(rawSyntax);
      formattedSyntax += formatTypesSyntax(formattedSyntax, []);
  }
  let out = '';
  if (!formattedSyntax) {
      out = "<div class=\"notecard warning\"><h4>Інформація про синтаксис недоступна</h4><p>Жодного значення не знайшлося в базі даних.</p></div>";
  } else {
      out = `<pre>${formattedSyntax}</pre>`
  }


  return out;
}

module.exports.default = cssSyntax;
