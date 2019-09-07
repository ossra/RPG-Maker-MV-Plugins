// +====================================================================================+
// |||  Picture | Custom Origin
// +====================================================================================+
/*:
 *  @plugindesc [1.00] Overrides and provides additional origin points for pictures.
 *  @author Ossra
 *
 *  @param Origin Options
 *
 *  @param Custom Origin List
 *  @desc Custom origin points for pictures.
 *  @parent Origin Options
 *  @type struct<dataOrigin>[]
 *  @default ["{\"Name\":\"Upper Left\",\"Anchor X\":\"0.0\",\"Anchor Y\":\"0.0\"}","{\"Name\":\"Center\",\"Anchor X\":\"0.5\",\"Anchor Y\":\"0.5\"}","{\"Name\":\"Bottom Right\",\"Anchor X\":\"1.0\",\"Anchor Y\":\"1.0\"}"]
 *
 *  @param Plugin
 *
 *  @param Global Identifier
 *  @parent Plugin
 *  @desc Global identification tag for internal use only. Do not change.
 *  @default ossra-nWPsp4PWQ6GM7k9
 *
 *  @help
 * ==| Plugin                  |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.00 [RPG Maker MV 1.6.2]
 *   - Release : 7th September 2019
 *   - Updated : 7th September 2019
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 * ==| Plugin Commands         |=================================================
 *
 *  (+) <ossra setOrigin pictureId originId>
 *   |--------------------------------------------------------------------------|
 *   | Sets an origin for the specified picture.
 *   |--------------------------------------------------------------------------|
 *   | < Name >        < Type >        < Note >
 *   | pictureId       Integer
 *   | originId        Integer
 *   |--------------------------------------------------------------------------|
 *
 * ==| Script Commands         |=================================================
 *
 *  (+) $gameScreen.picture(pictureId).setOrigin(originId)
 *   |--------------------------------------------------------------------------|
 *   | Sets an origin for the specified picture.
 *   |--------------------------------------------------------------------------|
 *   | < Name >        < Type >        < Note >
 *   | pictureId       Integer
 *   | originId        Integer
 *   |--------------------------------------------------------------------------|
 */
// +====================================================================================+
 /*~struct~dataOrigin:
 *  @param Name
 *  @desc Name of the custom origin.
 *  @type text
 *
 *  @param Anchor X
 *  @desc X value of the custom origin. Decimal values accepted.
 *  @type number
 *  @default 0.0
 *  @decimals 1
 *  @min 0
 *  @max 1
 *
 *  @param Anchor Y
 *  @desc Y value of the custom origin. Decimal values accepted.
 *  @type number
 *  @default 0.0
 *  @decimals 1
 *  @min 0
 *  @max 1
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

  // +=================================================|                           Util |
  // | [Plugin] Util
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

  };

  // +----------------------------------------------------------------------------------+
  // | [Method] getParams
  // +----------------------------------------------------------------------------------+

  function getParams (gid, prop) {

    return $plugins.filter(function(plugin) {
      return plugin.parameters['Global Identifier'] === gid;
    })[0][prop];

  }; // Util ‹‹ getParams

  // +----------------------------------------------------------------------------------+
  // | [Method] parseParams
  // +----------------------------------------------------------------------------------+
  function parseParams (params) {

    for (var [key, value] of Object.entries(params)) {
      try {
        params[key] = JSON.parse(value);

        parseParams(params[key]);
      } catch (e) {

      }
    }

    return params;

  }; // Util ‹‹ parseParams

  // +----------------------------------------------------------------------------------+
  // | [Method] parseDefaults
  // +----------------------------------------------------------------------------------+

  function parseDefaults (params, defaults) {

    for (var [key, value] of Object.entries(defaults)) {
      if (params.hasOwnProperty(key)) {
        if (value.constructor === Object) {
          if (params[key].constructor !== Object) {
            params[key] = {};
          }
          params[key] = parseDefaults(params[key], defaults[key]);
        } else if (value.constructor === Array) {
          if (params[key].constructor !== Array) {
            params[key] = [];
          } else {
            params[key].map(struct => {
              parseDefaults(struct, defaults[key][0]);
            });
          }
        } else if (params[key] === '') {
          params[key] = defaults[key];
        }
      }
    }

    return params;

  }; // Util ‹‹ parseDefaults

  // +----------------------------------------------------------------------------------+
  // | [Method] registerPluginCommand
  // +----------------------------------------------------------------------------------+

  function registerPluginCommand (command) {

    var namespace = pluginName.split('.');

    var path = {
      name: command,
      group: namespace[0],
      plugin: namespace[1]
    }

    Ossra.Command.push(path);

  }; // Util ‹‹ registerPluginCommand



  // +=================================================|                  Configuration |
  // | [Plugin] Configuration
  // +==================================================================================+

  // [Setup] Namespace - Imported
  setNamespace(Imported.Ossra, pluginName, pluginVersion);

  // [Setup] Namespace - Plugin
  var ossPlugin   = setNamespace(Ossra.Plugin, pluginName);

  var ossData     = setNamespace(ossPlugin, 'Data');
  var ossCore     = setNamespace(ossPlugin, 'Core');
  var ossManager  = setNamespace(ossPlugin, 'Manager');
  var ossObject   = setNamespace(ossPlugin, 'Object');
  var ossScene    = setNamespace(ossPlugin, 'Scene');
  var ossSprite   = setNamespace(ossPlugin, 'Sprite');
  var ossWindow   = setNamespace(ossPlugin, 'Window');
  var ossCommand  = setNamespace(ossPlugin, 'Command');
  var ossFunct    = setNamespace(ossPlugin, 'Function');



  (function() {                                                                      // {

    // [Setup] Defaults - Plugin
    var ossDefaults = {

      'Custom Origin List': [
        {
          'Name': '',
          'Anchor X': 0.0,
          'Anchor Y': 0.0
        }
      ]

    }

    // [Setup] Settings - Plugin
    var ossParams   = getParams('ossra-nWPsp4PWQ6GM7k9', 'parameters');
    ossParams       = parseParams(ossParams);
    ossParams       = parseDefaults(ossParams, ossDefaults);

    ossData.anchorList = [ ];

    if (ossParams['Custom Origin List']) {
      ossParams['Custom Origin List'].forEach(anchor => {
        var tmpAnchor = { };

        tmpAnchor.x = anchor['Anchor X'];
        tmpAnchor.y = anchor['Anchor Y'];

        ossData.anchorList.push(tmpAnchor);
      });
    }

  })();                                                                              // }



  // +=================================================|               Game_Interpreter |
  // | [Object] Game_Interpreter
  // +==================================================================================+

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] pluginCommand
  // +----------------------------------------------------------------------------------+

  if (typeof Ossra.Share.pluginCommand === 'undefined') {

    Ossra.Share.pluginCommand = Game_Interpreter.prototype.pluginCommand;

    Game_Interpreter.prototype.pluginCommand = function(command, args) {

      Ossra.Share.pluginCommand.call(this, command, args);

      if (command === 'ossra') {
        var path = Ossra.Command.find(command => command.name === args[0]);

        if (path) {
          var group  = path.group;
          var plugin = path.plugin;
          var name   = path.name;
          var func   = Ossra.Plugin[group][plugin]['Command'][name];

          if (typeof func !== 'undefined') {
            func(args.slice(1, args.length), this);
          }
        }
      }

    }; // Game_Interpreter ‹‹ pluginCommand

  }

  (function($) {                                                                     // {

  // +=================================================|                       Commands |
  // | [Plugin] Commands
  // +==================================================================================+

  // NEW -------------------------------------------------------------------------------+
  // | [Method] setOrigin
  // +----------------------------------------------------------------------------------+

    registerPluginCommand('setOrigin');

    $.setOrigin = function(args, interpreter) {

      if (args.length === 2) {
        var pictureId = Number(args[0]);
        var originId  = Number(args[1]);
        var picture   = $gameScreen.picture(pictureId);

        if (picture) {
          picture.setOrigin(originId);
        }
      }

    }; // Commands ‹‹ setOrigin

  })(ossCommand);                                                                    // }



  (function($) {                                                                     // {

  // +=================================================|                   Game_Picture |
  // | [Plugin] Game_Picture
  // +==================================================================================+

  // NEW -------------------------------------------------------------------------------+
  // | [Method] setOrigin
  // +----------------------------------------------------------------------------------+

    $.prototype.setOrigin = function(origin) {

      this._origin = origin;

    }; // Game_Picture ‹‹ setOrigin

  })(Game_Picture);                                                                // }



  (function($) {                                                                     // {

  // +=================================================|                 Sprite_Picture |
  // | [Plugin] Sprite_Picture
  // +==================================================================================+

    var $spr = setNamespace(ossSprite, 'Sprite_Picture');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] updateOrigin
  // +----------------------------------------------------------------------------------+

    $spr.updateOrigin = $.prototype.updateOrigin;

    $.prototype.updateOrigin = function() {

      $spr.updateOrigin.call(this);

      var origin  = this.picture().origin();
      var anchor  = ossData.anchorList[origin];

      if (anchor) {
        this.anchor.x = anchor.x;
        this.anchor.y = anchor.y;
      }

    }; // Sprite_Picture ‹‹ updateOrigin

  })(Sprite_Picture);                                                                // }



})('Picture.CustomOrigin', 1.00);                                                    // }



// |///////////////////////////////////| End of File |//////////////////////////////////|