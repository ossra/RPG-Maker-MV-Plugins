// +====================================================================================+
// |||  Game | Background Color
// +====================================================================================+
/*:
 * @plugindesc [1.05] Changes the background color of the game.
 * @author Ossra
 *
 * @param Color Options
 * @type text
 * @default ------------------------------------
 *
 * @param HTML Document
 * @parent Color Options
 * @desc The desired color of the HTML document background.
 * @type text
 * @default #000000
 *
 * @param Game Background
 * @parent Color Options
 * @desc The desired color of the game background.
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
 *   - Version : 1.05
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



  (function($) {                                                                     // {

  // +=================================================|                      Functions |
  // | [Plugin] Functions
  // +==================================================================================+

  // +----------------------------------------------------------------------------------+
  // | [Method] createColorObject
  // +----------------------------------------------------------------------------------+

    $.createColorObject = function (data) {
      var obj = { hex: 0, array: [0,0,0,255], val: '000000' };

      if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(data)) {
        obj.val   = RegExp.$1;
        obj.hex   = parseInt('0x' + obj.val);
        obj.array = obj.val.length === 3 ? obj.val.match(/.{1}/g) : obj.val.match(/.{2}/g);
        obj.array = obj.array.map(function(color) { return parseInt('0x' + color); });
        obj.array.push(255);
      }

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

  // [Setup] Set Background Color
    var docColor  = ossConfig['HTML Document']   || '#000000';
    var gameColor = ossConfig['Game Background'] || '#000000';

    ossConfig['Game Background'] = ossFunc.createColorObject(gameColor);

    var cssColor = 'background-color: ' + docColor + ' !important;';

    var cssText = '';
    cssText     = cssText + 'height: 100vh;';
    cssText     = cssText + 'width: 100vw;';
    cssText     = cssText + 'margin: auto;';
    cssText     = cssText + cssColor;

    document.documentElement.style.cssText = cssColor;
    document.body.style.cssText            = cssText;

  })();                                                                              // }



  (function($) {                                                                     // {

  // +=================================================|                    Game_Screen |
  // | [Plugin] Game_Screen
  // +==================================================================================+

    var $obj = setNamespace(ossObject, 'Game_Screen');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] clear
  // +----------------------------------------------------------------------------------+

    $obj.clear = $.prototype.clear;

    $.prototype.clear = function() {

      $obj.clear.call(this);

      this.clearBaseScreenColor();

    }; // Game_Screen << clear

  // NEW -------------------------------------------------------------------------------+
  // | [Method] clearBaseScreenColor
  // +----------------------------------------------------------------------------------+

    $.prototype.clearBaseScreenColor = function() {

      this._baseScreenColor = ossConfig['Game Background'].array;

    }; // Game_Screen << clearBaseScreenColor

  // NEW -------------------------------------------------------------------------------+
  // | [Method] baseScreenColor
  // +----------------------------------------------------------------------------------+

    $.prototype.baseScreenColor = function() {

      return this._baseScreenColor;

    }; // Game_Screen << baseScreenColor

  // NEW -------------------------------------------------------------------------------+
  // | [Method] setBaseScreenColor
  // +----------------------------------------------------------------------------------+

    $.prototype.setBaseScreenColor = function(color) {

      this._baseScreenColor = color;

    }; // Game_Screen << setBaseScreenColor

  })(Game_Screen);                                                                   // }



  (function($) {                                                                     // {

  // +=================================================|                 Spriteset_Base |
  // | [Plugin] Spriteset_Base
  // +==================================================================================+

    var $spr = setNamespace(ossSprite, 'Spriteset_Base');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] update
  // +----------------------------------------------------------------------------------+

    $spr.update = $.prototype.update;

    $.prototype.update = function() {

      $spr.update.call(this);
      
      this.updateBaseSprites();

    }; // Spriteset_Base << update

  // NEW -------------------------------------------------------------------------------+
  // | [Method] updateScreenSprites
  // +----------------------------------------------------------------------------------+

    $.prototype.updateBaseSprites = function() {

      var color = $gameScreen.baseScreenColor();

      this._blackScreen.setColor(color[0], color[1], color[2]);

    }; // Spriteset_Base << updateScreenSprites

  })(Spriteset_Base);                                                                // }



})('Game.BackgroundColor', 1.05);                                                    // }



// |///////////////////////////////////| End of File |//////////////////////////////////|