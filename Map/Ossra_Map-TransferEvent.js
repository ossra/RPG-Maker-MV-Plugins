// +====================================================================================+
// |||  Map | Event On Transfer
// +====================================================================================+
/*:
 * @plugindesc [1.17] Run a specified common event when entering or exiting a map.
 * @author Ossra
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.17 [RPG Maker MV 1.6.2]
 *   - Release : 6th July 2016
 *   - Updated : 4th November 2019
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 * @param headerPluginOptions
 * @text Plugin Options
 * @type text
 * @default ------------------------------------
 *
 * @param tags
 * @text Custom Map Tags
 * @desc Options for custom map tags.
 * @parent headerPluginOptions
 * @type struct<tagEvents>[]
 *
 * @param pluginData
 * @text Plugin Data
 * @type text
 * @default ------------------------------------
 *
 * @param gid
 * @text Global Identifier
 * @desc Global identification tag for internal use only. Do not change.
 * @parent pluginData
 * @default ossra-AHqAOeLogbadvlV
 *
 */
// +===================================================|                        Structs |
// | [Plugin] Structs
// +====================================================================================+
/*~struct~tagEvents:
 * @param name
 * @text Name
 * @desc Name of the map event tag.
 * @type text
 *
 * @param enter
 * @text Enter Event
 * @desc Options for the map enter event.
 * @type common_event
 * @default 0
 *
 * @param exit
 * @text Exit Event
 * @desc Options for the map exit event.
 * @type common_event
 * @default 0
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
        return plugin.parameters['gid'] === gid;
      })[0]['parameters'];

    }; // Setup << getPlugin

  // +----------------------------------------------------------------------------------+
  // | [Method] parseAllParameters
  // +----------------------------------------------------------------------------------+

    function parseAllParameters (input, defaults) {

      Object.keys(input).forEach(function(key) {
        if (typeof defaults[key] === 'undefined') {
          delete input[key];
        } else {
          try {
            input[key] = JSON.parse(input[key], function(_key, _value) {
              if (/^(\w+)__(\w+)$/i.test(_key)) {
                this[RegExp.$1] = ossFunc[RegExp.$2].call(this, _value);
              } else {
                return _value;
              }
            });

            if (Array.isArray(input[key])) {
              for (var i = 0; i < input[key].length; i++) {
                input[key][i] = JSON.parse(input[key][i]);
                input[key][i] = parseAllParameters(input[key][i], defaults[key][0]);
              }
            } else {
              parseAllParameters(input[key], defaults[key]);
            }
          } catch (e) {
            if (input[key] === '') input[key] = defaults[key];
          }
        }
      });

      return input;

    }; // Setup << parseAllParameters

  // +----------------------------------------------------------------------------------+
  // | [Method] createConfig
  // +----------------------------------------------------------------------------------+

    function createConfig (gid, defaults) {

      var parameters = getPlugin(gid);
      parameters     = parseAllParameters(parameters, defaults);

      Object.assign(ossConfig, parameters);

    }; // Setup << createConfig

  // +=================================================|                  Configuration |
  // | [Setup] Configuration
  // +==================================================================================+

  // +----------------------------------------------------------------------------------+
  // | [Setup] Create Defaults
  // +----------------------------------------------------------------------------------+

    var ossDefaults = {

      'tags':
      [
        {
          'name': null,
          'enter': 0,
          'exit': 0
        }
      ]

    };

  // +----------------------------------------------------------------------------------+
  // | [Setup] Create Configuration
  // +----------------------------------------------------------------------------------+

    createConfig('ossra-AHqAOeLogbadvlV', ossDefaults);

    ossRegExp.note        = { };
    ossRegExp.note.global = /<(.+)>/gi;
    ossRegExp.note.custom = /<(.+)>/i;
    ossRegExp.note.single = /<ossra EventOnTransfer (enter|exit) (\d+)>/i;

    ossData.enterEventId  = 0;
    ossData.exitEventId   = 0;
    ossData.runEvent      = false;

  })();                                                                              // }



  (function($) {                                                                     // {

  // +=================================================|                       Game_Map |
  // | [Plugin] Game_Map
  // +==================================================================================+

    var $obj = setNamespace(ossObject, 'Game_Map');
    var _fnc = setNamespace(ossFunc, 'Game_Map');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] setup
  // +----------------------------------------------------------------------------------+

    $obj.setup = $.prototype.setup;

    Game_Map.prototype.setup = function(mapId) {

      _fnc.resetTransferEvents();
      _fnc.setupNote();

      $obj.setup.call(this, mapId);

      if ($gamePlayer.newMapId() == $gameMap.mapId() && ossData.enterEventId > 0) {
        var enterEvent = $dataCommonEvents[ossData.enterEventId];

        if (enterEvent) {
          this._interpreter.setup(enterEvent.list);
        }
      }

    }; // Game_Map << setup

  // NEW -------------------------------------------------------------------------------+
  // | [Method] resetTransferEvents
  // +----------------------------------------------------------------------------------+

    _fnc.resetTransferEvents = function() {

      ossData.enterEventId = 0;
      ossData.exitEventId  = 0;

    }; // Game_Map << resetTransferEvents

  // NEW -------------------------------------------------------------------------------+
  // | [Method] setupNote
  // +----------------------------------------------------------------------------------+

    _fnc.setupNote = function() {

      if ($dataMap) {
        var notes = $dataMap.note.match(ossRegExp.note.global);

        if (notes) {
          notes.forEach(function(data) {
            if (ossRegExp.note.single.test(data)) {
              ossData[RegExp.$1 + 'EventId'] = Number(RegExp.$2);
            }

            if (ossRegExp.note.custom.test(data)) {
              var event = ossConfig.tags.filter(function(tag) {
                return RegExp.$1 === tag.name;
              })[0];

              if (event) {
                ossData['enterEventId'] = event.enter;
                ossData['exitEventId']  = event.exit;
              }
            }
          });
        }

      }

    }; // Game_Map << setupNote

  })(Game_Map);                                                                      // }



  (function($) {                                                                     // {

  // +=================================================|                      Scene_Map |
  // | [Plugin] Scene_Map
  // +==================================================================================+

    var $scn = setNamespace(ossObject, 'Scene_Map');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] updateTransferPlayer
  // +----------------------------------------------------------------------------------+

    $scn.updateTransferPlayer = $.prototype.updateTransferPlayer;

    $.prototype.updateTransferPlayer = function() {

      if ($gamePlayer.isTransferring() && ossData.exitEventId > 0) {

        if ($gamePlayer.newMapId() !== $gameMap.mapId() && !ossData.runEvent) {
          var exitEvent = $dataCommonEvents[ossData.exitEventId];

          if (exitEvent) {
            $gameMap._interpreter.setup(exitEvent.list);
            ossData.runEvent = true;
          } else {
            ossData.exitEventId = 0;
          }

        } else if (!$gameMap.isEventRunning()) {
          ossData.exitEventId = 0;
          ossData.runEvent    = false;
        }

      } else {
        $scn.updateTransferPlayer.call(this);
      }

    }; // Scene_Map << updateTransferPlayer

  })(Scene_Map);                                                                     // }



})('Map.EventOnTransfer', 1.17);                                                     // }



// |///////////////////////////////////| End of File |//////////////////////////////////|