// +====================================================================================+
// |||  Character | Follower Control
// +====================================================================================+
/*:
 * @plugindesc [1.00] Controls and enhances various aspects of followers.
 * @author Ossra
 *
 * @param Follower Options
 * @type text
 * @default ------------------------------------
 *
 * @param Gather On Jump
 * @parent Follower Options
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 *
 * @param Plugin Data
 * @type text
 * @default ------------------------------------
 *
 * @param Global Identifier
 * @parent Plugin Data
 * @desc Global identification tag for internal use only. Do not edit.
 * @type text
 * @default ossra-rhMpLxh6bOcNAaI
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.00
 *   - Release : 10th September 2019
 *   - Updated : 10th September 2019
 *   - License : Free for Commercial and Non-Commercial Usage
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

  var ossData     = setNamespace(ossPlugin, 'Data');
  var ossCore     = setNamespace(ossPlugin, 'Core');
  var ossManager  = setNamespace(ossPlugin, 'Manager');
  var ossObject   = setNamespace(ossPlugin, 'Object');
  var ossScene    = setNamespace(ossPlugin, 'Scene');
  var ossSprite   = setNamespace(ossPlugin, 'Sprite');
  var ossWindow   = setNamespace(ossPlugin, 'Window');
  var ossCommand  = setNamespace(ossPlugin, 'Command');
  var ossFunc     = setNamespace(ossPlugin, 'Function');



  (function($) {                                                                     // {

  // +=================================================|                      Functions |
  // | [Plugin] Functions
  // +==================================================================================+

  // +----------------------------------------------------------------------------------+
  // | [Method] between
  // +----------------------------------------------------------------------------------+

    $.between = function(a, b) {
      var min = Math.min(a, b),
          max = Math.max(a, b);

      return this > min && this < max;
    }; // Functions << between

  // +----------------------------------------------------------------------------------+
  // | [Method] createColorObject
  // +----------------------------------------------------------------------------------+

    $.createColorObject = function (data) {
      var obj = { hex: 0, array: [0,0,0,255] };

      obj.hex = parseInt('0x' + data);
      obj.array = data.length === 3 ? data.match(/.{1}/g) : data.match(/.{2}/g);
      obj.array = obj.array.map(function(color) { return parseInt('0x' + color); });
      obj.array.push(255);

      return obj;
    }; // Functions << createColorObject

  })(ossFunc);                                                                       // }



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

    function getAllParameters (gid, defaults, output) {

      var parameters = getPlugin(gid);
      parameters     = parseAllParameters(parameters);
      parameters     = parseDefaultData(parameters, defaults, output);

    }; // Setup << getAllParameters

  // +----------------------------------------------------------------------------------+
  // | [Method] parseAllParameters
  // +----------------------------------------------------------------------------------+
    function parseAllParameters (input) {

      for (var [key, value] of Object.entries(input)) {
        try {
          input[key] = JSON.parse(value);

          parseAllParameters(input[key]);
        } catch (e) {

        }
      }

      return input;

    }; // Setup << parseAllParameters

  // +----------------------------------------------------------------------------------+
  // | [Method] parseDefaultData
  // +----------------------------------------------------------------------------------+

    function parseDefaultData (input, defaults, output) {

      for (var [key, value] of Object.entries(defaults)) {
        var _key     = key.split(' ');
        _key[0]      = _key[0].toLowerCase();
        _key         = _key.join('');

        output[_key] = value.constructor();
        input        = input ? input : value.constructor();

        switch (value.constructor) {
          case Object:
            output[_key] = parseDefaultData(input[key], defaults[key], output[_key]);
            break;
          case Array:
            input[key].forEach(function (struct, index) {
              output[_key][index] = defaults[key][0].constructor();
              parseDefaultData(struct, defaults[key][0], output[_key][index]);
            });
            break;
          default:
            if (input !== undefined) {
              output[_key] = input[key] !== undefined ? input[key] : defaults[key];
            } else {
              output[_key] = defaults[key];
            }
            break;
        }
      }

      return output;

    }; // Setup << parseDefaultData



  // +=================================================|                  Configuration |
  // | [Setup] Configuration
  // +==================================================================================+

  // [Setup] Configuration Defaults
    var ossDefaults = {
      'Gather On Jump': true
    }

  // [Setup] Prepare Configuration
    getAllParameters('ossra-rhMpLxh6bOcNAaI', ossDefaults, ossData);

  })();                                                                              // }



  (function($) {                                                                     // {

  // +=================================================|                 Game_Followers |
  // | [Plugin] Game_Followers
  // +==================================================================================+

    var $obj = setNamespace(ossObject, 'Game_Followers');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] jumpAll
  // +----------------------------------------------------------------------------------+

    $obj.jumpAll = $.prototype.jumpAll;

    $.prototype.jumpAll = function(args) {

      if (ossData.gatherOnJump === true) {
        $obj.jumpAll.call(this, args);
      }

    }; // Game_Followers << jumpAll

  })(Game_Followers);                                                                // }



})('Character.FollowerControl', 1.00);                                               // }



// |///////////////////////////////////| End of File |//////////////////////////////////|