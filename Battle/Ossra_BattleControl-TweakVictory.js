// +====================================================================================+
// |||  Battle | Tweak Victory
// +====================================================================================+
/*:
 *  @plugindesc [1.00] Provides tweaks for the victory scene at the end of battle.
 *  @author Ossra
 *
 *  @param Victory Options
 *
 *  @param Perform Victory Motion
 *  @desc Controls whether actors perform the victory motion after the battle ends.
 *  @parent Victory Options
 *  @type boolean
 *  @on Enable
 *  @off Disable
 *  @default true
 *
 *  @param Play Victory ME
 *  @desc Controls whether the victory ME is played after the battle ends.
 *  @parent Victory Options
 *  @type boolean
 *  @on Enable
 *  @off Disable
 *  @default true
 *
 *  @param Display Victory Message
 *  @desc Controls whether the victory message is displayed after the battle ends.
 *  @parent Victory Options
 *  @type boolean
 *  @on Enable
 *  @off Disable
 *  @default true
 *
 *  @param Display Rewards
 *  @desc Controls whether rewards (gold, etc) are displayed after the battle ends.
 *  @parent Victory Options
 *  @type boolean
 *  @on Enable
 *  @off Disable
 *  @default true
 *
 *  @param Plugin
 *
 *  @param Global Identifier
 *  @parent Plugin
 *  @desc Global identification tag for internal use only. Do not change.
 *  @default ossra-8BuTSTRnkJEFjKI
 *
 *  @help
 * ==| Plugin                  |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.00 [RPG Maker MV 1.6.2]
 *   - Release : 4th September 2019
 *   - Updated : 4thrd September 2019
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 * ==| Troop Comment Tags      |=================================================
 *
 *        Create a comment in one of the Troop's event pages and then use the
 *   following tag(s) to enable or disable the various victory options.
 *
 *  (+) <ossTweakVictory victoryMotion boolean>
 *   |
 *   |     Enable or disable the victory animation of each actor.
 *   |
 *   |-> boolean
 *   | Value(s) - true, false
 *
 *  (+) <ossTweakVictory playME boolean>
 *   |
 *   |     Enable or disable playing the victory ME.
 *   |
 *   |-> boolean
 *   | Value(s) - true, false
 *
 *  (+) <ossTweakVictory victoryMessage boolean>
 *   |
 *   |     Enable or disable displaying the victory message.
 *   |
 *   |-> boolean
 *   | Value(s) - true, false
 *
 *  (+) <ossTweakVictory displayRewards boolean>
 *   |
 *   |     Enable or disable displaying rewards (gold, etc).
 *   |
 *   |-> boolean
 *   | Value(s) - true, false
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
Ossra.Command  = Ossra.Command  || {};



(function(pluginName, pluginVersion) {                                               // {

  'use strict';

  // +=================================================|                           Util |
  // | [Plugin] Util
  // +==================================================================================+

  // +----------------------------------------------------------------------------------+
  // | [Method] getPlugin
  // +----------------------------------------------------------------------------------+

  function getPlugin (gid, prop) {

    return $plugins.filter(function(plugin) {
      return plugin.parameters['Global Identifier'] === gid;
    })[0][prop];

  }; // Util ‹‹ getPlugin

  // +----------------------------------------------------------------------------------+
  // | [Method] setNamespace
  // +----------------------------------------------------------------------------------+

  function setNamespace (namespace, namestring, value) {

    var tChildren = namestring.split('.'),
        tParent   = namespace;

    for (var i = 0; i <= tChildren.length - 1; i++) {
      if (typeof tParent[tChildren[i]] === 'undefined') {
        if (value && i == tChildren.length - 1) {
          tParent[tChildren[i]] = value;
        } else {
          tParent[tChildren[i]] = {};
        }
      }
      tParent = tParent[tChildren[i]];
    }

    return tParent;

  };

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

  (function() {                                                                      // {

    // [Setup] Settings - Plugin
    var ossParams = getPlugin('ossra-8BuTSTRnkJEFjKI', 'parameters');
    ossParams     = parseParams(ossParams);

    ossData.victoryMotion  = ossParams['Perform Victory Motion'];
    ossData.playME         = ossParams['Play Victory ME'];
    ossData.victoryMessage = ossParams['Display Victory Message'];
    ossData.displayRewards = ossParams['Display Rewards'];

  })();                                                                              // }



  (function($) {                                                                     // {

  // +=================================================|                    DataManager |
  // | [Plugin] DataManager
  // +==================================================================================+

    var $man  = setNamespace(ossManager, 'DataManager');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] isDatabaseLoaded
  // +----------------------------------------------------------------------------------+

    $man.isDatabaseLoaded = $.isDatabaseLoaded;

    $.isDatabaseLoaded = function() {

      if (!$man.isDatabaseLoaded.call(this)) return false;

      this.processTweakVictoryNotetags($dataTroops);

      return true;

    }; // DataManager ‹‹ isDatabaseLoaded

  // NEW -------------------------------------------------------------------------------+
  // | [Method] processTweakVictoryNotetags
  // +----------------------------------------------------------------------------------+

    $.processTweakVictoryNotetags = function(database) {

      var length = database.length;

      for (var t = 1; t < length; t++) {

        var troop = database[t];

        if (!troop) continue;
        troop.__victoryTweak = {
          victoryMotion: null,
          playME: null,
          victoryMessage: null,
          displayRewards: null
        }
        var pageLength = troop.pages.length;
        for (var p = 0; p < pageLength; ++p) {
          var page = troop.pages[p];
          if (page) this.processTweakVictoryData(troop, page);
        }
      }

    }; // DataManager ‹‹ processTweakVictoryNotetags

  // NEW -------------------------------------------------------------------------------+
  // | [Method] processTweakVictoryData
  // +----------------------------------------------------------------------------------+

    $.processTweakVictoryData = function(troop, page) {

      var length = page.list.length;

      for (var p = 0; p < length; p++) {

        var pageItem = page.list[p];

        if (pageItem) {

          if (pageItem.code === 108 || pageItem.code === 408) {

            var line = pageItem.parameters[0];

            if (line) {
              if (line.match(/<OSSTWEAKVICTORY VICTORYMOTION (TRUE|FALSE)>/i)) {
                troop.__victoryTweak['victoryMotion'] = RegExp.$1 === 'true';
              } else if (line.match(/<OSSTWEAKVICTORY PLAYME (TRUE|FALSE)>/i)) {
                troop.__victoryTweak['playME'] = RegExp.$1 === 'true';
              } else if (line.match(/<OSSTWEAKVICTORY VICTORYMESSAGE (TRUE|FALSE)>/i)) {
                troop.__victoryTweak['victoryMessage'] = RegExp.$1 === 'true';
              } else if (line.match(/<OSSTWEAKVICTORY DISPLAYREWARDS (TRUE|FALSE)>/i)) {
                troop.__victoryTweak['displayRewards'] = RegExp.$1 === 'true';
              }
            }

          }

        }

      }

    }; // DataManager ‹‹ processTweakVictoryData

  })(DataManager);                                                                   // }



  (function($) {                                                                     // {

  // +=================================================|                  BattleManager |
  // | [Plugin] BattleManager
  // +==================================================================================+

    var $man = setNamespace(ossManager, 'BattleManager');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] playVictoryMe
  // +----------------------------------------------------------------------------------+

    $man.playVictoryMe = $.playVictoryMe;

    $.playVictoryMe = function() {

      if ($gameTroop.__victoryTweak.playME) {
        $man.playVictoryMe.call(this);
      }

    }; // BattleManager ‹‹ playVictoryMe

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] displayVictoryMessage
  // +----------------------------------------------------------------------------------+

    $man.displayVictoryMessage = $.displayVictoryMessage;

    $.displayVictoryMessage = function() {

      if ($gameTroop.__victoryTweak.victoryMessage) {
        $man.displayVictoryMessage.call(this);
      }

    }; // BattleManager ‹‹ displayVictoryMessage

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] displayRewards
  // +----------------------------------------------------------------------------------+

    $man.displayRewards = $.displayRewards;

    $.displayRewards = function() {

      if ($gameTroop.__victoryTweak.displayRewards) {
        $man.displayRewards.call(this);
      }

    }; // BattleManager ‹‹ displayRewards

  })(BattleManager);                                                                 // }



  (function($) {                                                                     // {

  // +=================================================|                     Game_Party |
  // | [Plugin] Game_Party
  // +==================================================================================+

    var $obj = setNamespace(ossObject, 'Game_Party');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] performVictory
  // +----------------------------------------------------------------------------------+

    $obj.performVictory = $.prototype.performVictory;

    $.prototype.performVictory = function() {

      if ($gameTroop.__victoryTweak.victoryMotion) {
        $obj.performVictory.call(this);
      }

    }; // Game_Party ‹‹ performVictory

  })(Game_Party);                                                                    // }



  (function($) {                                                                     // {

  // +=================================================|                     Game_Troop |
  // | [Plugin] Game_Troop
  // +==================================================================================+

    var $obj = setNamespace(ossObject, 'Game_Troop');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] clear
  // +----------------------------------------------------------------------------------+

    $obj.clear = $.prototype.clear;

    $.prototype.clear = function() {

      $obj.clear.call(this);

      this.__victoryTweak = {
        victoryMotion: null,
        playME: null,
        victoryMessage: null,
        displayRewards: null
      }

    }; // Game_Troop ‹‹ clear

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] setup
  // +----------------------------------------------------------------------------------+

    $obj.setup = $.prototype.setup;

    $.prototype.setup = function(troopId) {

      $obj.setup.call(this, troopId);

      for (var [key, value] of Object.entries(this.troop().__victoryTweak)) {
        this.__victoryTweak[key] = value !== null ? value : ossData[key];
      }

    }; // Game_Troop ‹‹ setup

  })(Game_Troop);                                                                    // }



})('Battle.TweakVictory', 1.00);                                                     // }



// |///////////////////////////////////| End of File |//////////////////////////////////|