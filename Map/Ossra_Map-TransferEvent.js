// +====================================================================================+
// |||  Map | Event On Transfer
// +====================================================================================+
/*:
 * @plugindesc [1.12] Run a specified common event when entering or exiting a map.
 * @author Ossra
 *
 * @param Plugin Data
 * @type text
 * @default ------------------------------------
 *
 * @param Global Identifier
 * @parent Plugin Data
 * @desc Global identification tag for internal use only. Do not edit.
 * @type text
 * @default ossra-AHqAOeLogbadvlV
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.12
 *   - Release : 6th July 2016
 *   - Updated : 14th September 2019
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

  // +=================================================|                  Configuration |
  // | [Setup] Configuration
  // +==================================================================================+

    ossRegExp.note        = { };
    ossRegExp.note.single = /<ossra EventOnTransfer (enter|exit) (\d+)>/i;
    ossRegExp.note.global = /<ossra EventOnTransfer (enter|exit) (\d+)>/gi;

    ossData.enterEventId = 0;
    ossData.exitEventId  = 0;
    ossData.runEvent     = false;

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
        var notes  = $dataMap.note.match(ossRegExp.note.global);

        if (notes) {
          notes.forEach(function(data) {
            if (ossRegExp.note.single.test(data)) {
              ossData[RegExp.$1 + 'EventId'] = Number(RegExp.$2);
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



})('Map.EventOnTransfer', 1.12);                                                     // }



// |///////////////////////////////////| End of File |//////////////////////////////////|