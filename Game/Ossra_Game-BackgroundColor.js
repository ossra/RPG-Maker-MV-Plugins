// +====================================================================================+
// |||  Game | Background Color
// +====================================================================================+
/*:
 * @plugindesc [1.02] Changes the background color of the game.
 * @author Ossra
 *
 * @param General Options
 * @type text
 * @default ------------------------------------
 *
 * @param Color
 * @parent General Options
 * @desc The desired color of the game background.
 * NOTE: Value may be any valid CSS color.
 * @type text
 * @default #000000
 *
 * @param Plugin Data
 * @type text
 * @default ------------------------------------
 *
 * @param Global Identifier
 * @parent Plugin Data
 * @desc Global identification tag for internal use only. Do not edit.
 * @type text
 * @default ossra-ZiztVs0QrLyque8
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.02
 *   - Release : 21st September 2019
 *   - Updated : 21st September 2019
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 */
// +====================================================================================+


// +===================================================|                      Namespace |
// | [Global] Namespace
// +====================================================================================+

var Imported   = Imported       || {};
Imported.Ossra = Imported.Ossra || {};

var Ossra      = Ossra          || {};
Ossra.Util     = Ossra.Util     || {};
Ossra.Share    = Ossra.Share    || {};
Ossra.Plugin   = Ossra.Plugin   || {};
Ossra.Command  = Ossra.Command  || [];



(function(pluginName, pluginVersion) {                                               // {

  'use strict';

  // +=================================================|                      Functions |
  // | [Plugin] Functions
  // +==================================================================================+

  // +----------------------------------------------------------------------------------+
  // | [Method] setNamespace
  // +----------------------------------------------------------------------------------+

  function setNamespace (namespace, namestring, value) {

    var children = namestring.split('.'),
        parent   = namespace;

    for (var i = 0; i <= children.length - 1; i++) {
      if (typeof parent[children[i]] === 'undefined') {
        if (value && i == children.length - 1) {
          parent[children[i]] = value;
        } else {
          parent[children[i]] = {};
        }
      }
      parent = parent[children[i]];
    }

    return parent;

  }; // Functions << setNamespace



  // +=================================================|                      Namespace |
  // | [Plugin] Namespace
  // +==================================================================================+

  // [Namespace] Imported
  setNamespace(Imported.Ossra, pluginName, pluginVersion);

  // [Namespace] Plugin
  var ossPlugin   = setNamespace(Ossra.Plugin, pluginName);

  var ossCore     = setNamespace(ossPlugin, 'Core');
  var ossManager  = setNamespace(ossPlugin, 'Manager');
  var ossObject   = setNamespace(ossPlugin, 'Object');
  var ossScene    = setNamespace(ossPlugin, 'Scene');
  var ossSprite   = setNamespace(ossPlugin, 'Sprite');
  var ossWindow   = setNamespace(ossPlugin, 'Window');

  var ossData     = setNamespace(ossPlugin, 'Data');
  var ossConfig   = setNamespace(ossPlugin, 'Config');
  var ossRegExp   = setNamespace(ossPlugin, 'RegExp');
  var ossCommand  = setNamespace(ossPlugin, 'Command');
  var ossFunc     = setNamespace(ossPlugin, 'Function');



  (function() {                                                                      // {

  // +=================================================|                      Functions |
  // | [Setup] Functions
  // +==================================================================================+

  // +----------------------------------------------------------------------------------+
  // | [Method] getPlugin
  // +----------------------------------------------------------------------------------+

    function getPlugin (gid) {

      return $plugins.filter(function(plugin) {
        return plugin.parameters['Global Identifier'] === gid;
      })[0]['parameters'];

    }; // Setup << getPlugin

  // +----------------------------------------------------------------------------------+
  // | [Method] getAllParameters
  // +----------------------------------------------------------------------------------+

    function getAllParameters (gid) {

      var parameters = getPlugin(gid);

      return parseAllParameters(parameters);

    }; // Setup << getAllParameters

  // +----------------------------------------------------------------------------------+
  // | [Method] parseAllParameters
  // +----------------------------------------------------------------------------------+
    function parseAllParameters (input) {

      Object.keys(input).forEach(function(key) {
        try {
          input[key] = JSON.parse(input[key]);

          parseAllParameters(input[key]);
        } catch (e) {

        }
      });

      return input;

    }; // Setup << parseAllParameters
  
  // +=================================================|                  Configuration |
  // | [Setup] Configuration
  // +==================================================================================+

  // [Setup] Prepare Configuration
    ossConfig = getAllParameters('ossra-ZiztVs0QrLyque8');

  })();                                                                              // }



  (function() {                                                                      // {

  // +=================================================|                 Game_Character |
  // | [Plugin] Game_Character
  // +==================================================================================+

    var bgColor = 'background-color: ' + ossConfig['Color'] + ' !important;';

    var cssText = '';
    cssText     = cssText + 'height: 100vh;';
    cssText     = cssText + 'width: 100vw;';
    cssText     = cssText + 'margin: auto;';
    cssText     = cssText + bgColor;

    document.body.style.cssText = cssText;

    document.documentElement.style.cssText = bgColor;

  })();                                                                              // }



})('Game.BackgroundColor', 1.02);                                                    // }



// |///////////////////////////////////| End of File |//////////////////////////////////|