// +====================================================================================+
// |||  Character | Stage Manager
// +====================================================================================+
/*:
 * @plugindesc [0.42A] Adds various options for controlling the move route of events.
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
 * @default ossra-1HyQV4gycpHitiO
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 0.42A
 *   - Release : 18th September 2019
 *   - Updated : 22nd January 2020
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

  // +=================================================|                  Configuration |
  // | [Setup] Configuration
  // +==================================================================================+

    ossRegExp.command = /^ossra\s[a-z]+\s(.+)$/i;

  })();                                                                              // }



  (function($) {                                                                     // {

  // +=================================================|                 Game_Character |
  // | [Plugin] Game_Character
  // +==================================================================================+

    var $obj = setNamespace(ossObject, 'Game_Character');
    var _fnc = setNamespace(ossFunc, 'Game_Character');
    
  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] initMembers
  // +----------------------------------------------------------------------------------+

    $obj.initMembers = $.prototype.initMembers;

    $.prototype.initMembers = function() {

      $obj.initMembers.call(this);

      this.__waitOn = [];

    }; // Game_Character << initMembers

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] processMoveCommand
  // +----------------------------------------------------------------------------------+

    $obj.processMoveCommand = $.prototype.processMoveCommand;

    $.prototype.processMoveCommand = function(command) {

      switch (command.code) {
        case $.ROUTE_SCRIPT:
          if (ossRegExp.command.test(command.parameters[0])) {
            _fnc.processMoveCommand.call(this, RegExp.$1.split(' '));
            break;
          }
        default:
          $obj.processMoveCommand.call(this, command);
          break;
      }

    }; // Game_Character << processMoveCommand

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] processRouteEnd
  // +----------------------------------------------------------------------------------+

    $obj.processRouteEnd = $.prototype.processRouteEnd;

    $.prototype.processRouteEnd = function() {

      if (this.__waitOn.length > 0) {
        this._moveRouteIndex -= 1;
        this._waitCount = 1;
      } else  {
        $obj.processRouteEnd.call(this);
      }

    }; // Game_Character << processRouteEnd

  // NEW -------------------------------------------------------------------------------+
  // | [Method] processMoveCommand
  // +----------------------------------------------------------------------------------+

    _fnc.processMoveCommand = function(line) {

      if (line[0] === 'copy') {
        var targets  = line[1].split(',').map(Number);
        var amount   = Number(line[2]);
        var repeat   = line[3] ? line[3] === 'true' : false;
        var skip     = line[4] ? line[4] === 'true' : false;
        var wait     = line[5] ? line[5] === 'true' : false;
        var baseIndex = this._moveRouteIndex + 1;

        for (var i = 0; i < targets.length; i++) {
          var targetId = targets[i];
          var target   = null;

          if (targetId < 0) {
              target   = $gamePlayer;
              targetId = -1;
          } else {
              target   = $gameMap.event(targetId);
          }

          var list     = JsonEx.makeDeepCopy(this._moveRoute.list);
          list         = list.slice(baseIndex, baseIndex + amount);

          var route    = _fnc.createRoute.call(this, list, repeat, skip, wait);

          target.forceMoveRoute(route);

          if (route.wait) {
            if (this.__waitOn.indexOf(targetId) === -1) this.__waitOn.push(targetId);
          }
        }

        this._moveRouteIndex = this._moveRouteIndex + amount;
      }

      if (line[0] === 'callback') {
        var targetId = Number(line[1]);
        var target   = { id: 0, object: null };
        var eventId  = this._eventId;

        if (targetId < 0) {
            target.id     = -1;
            target.object = $gamePlayer;
        } else {
            target.id     = targetId;
            target.object = $gameMap.event(targetId);
        }

        if (target.object) {
          var index = target.object.__waitOn.indexOf(eventId);

          if (index > -1) {
            target.object.__waitOn.splice(index, 1);
          }
        }
      }

    }; // Game_Character << processMoveCommand

  // NEW -------------------------------------------------------------------------------+
  // | [Method] createRoute
  // +----------------------------------------------------------------------------------+

    _fnc.createRoute = function(list, repeat, skippable, wait) {

      if (wait) {
        var eventId    = this._eventId;
        var parameters = 'ossra StageManager callback ' + eventId;

        list.push({ code: 45, parameters: [parameters] });
      }

      list.push({ code: 0 });

      return { list: list, repeat: repeat, skippable: skippable, wait: wait };

    }; // Game_Character << createRoute

  })(Game_Character);                                                                // }



})('Character.StageManager', 0.42);                                                  // }



// |///////////////////////////////////| End of File |//////////////////////////////////|