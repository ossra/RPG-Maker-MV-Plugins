// +====================================================================================+
// |||  Window | Choice List
// +====================================================================================+
/*:
 * @plugindesc [1.10] Controls various choice list window options.
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
 * @default ossra-bbCPaTCrLPwH6ow
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.10
 *   - Release : 11th September 2019
 *   - Updated : 13th September 2019
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 * ==| Plugin Commands         |=================================================
 *
 *  (+) ossra ChoiceList setPosition x y retain
 *   |--------------------------------------------------------------------------|
 *   | Set the position of the choice list on the screen.
 *   |--------------------------------------------------------------------------|
 *   | < Name >        < Type >        < Note >
 *   | x               Integer
 *   | y               Integer
 *   | retain          Boolean         Uses current X,Y values until cleared
 *   |--------------------------------------------------------------------------|
 *
 *  (+) ossra ChoiceList clearPosition
 *   |--------------------------------------------------------------------------|
 *   | Resets the position of the choice list on the screen.
 *   |--------------------------------------------------------------------------|
 *
 *  (+) ossra ChoiceList setLayout align rows columns retain
 *   |--------------------------------------------------------------------------|
 *   | Set the layout of the choice list.
 *   |--------------------------------------------------------------------------|
 *   | < Name >        < Type >        < Note >
 *   | align           String          Aligns text to left, center, or right
 *   | rows            Integer
 *   | columns         Integer
 *   | retain          Boolean         Uses current layout until cleared
 *   |--------------------------------------------------------------------------|
 *
 *  (+) ossra ChoiceList clearLayout
 *   |--------------------------------------------------------------------------|
 *   | Resets the layout of the choice list.
 *   |--------------------------------------------------------------------------|
 *
 *  (+) ossra ChoiceList setItemStyle width retain
 *   |--------------------------------------------------------------------------|
 *   | Set the layout of the choice list.
 *   |--------------------------------------------------------------------------|
 *   | < Name >        < Type >        < Note >
 *   | width           Integer
 *   | retain          Boolean         Uses current layout until cleared
 *   |--------------------------------------------------------------------------|
 *
 *  (+) ossra ChoiceList clearItemStyle
 *   |--------------------------------------------------------------------------|
 *   | Resets the layout of the choice list.
 *   |--------------------------------------------------------------------------|
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
          var path = Ossra.Command.filter(function(command) {
            return command.plugin === args[0] && command.name === args[1];
          });

          if (path) {
            var group  = path[0].group;
            var plugin = path[0].plugin;
            var name   = path[0].name;
            var func   = Ossra.Plugin[group][plugin]['Command'][name];

            if (typeof func !== 'undefined') {
              func(args.slice(2, args.length), this);
            }
          }
        }

      }; // Game_Interpreter ‹‹ pluginCommand

    }

  // +=================================================|                       Commands |
  // | [Plugin] Commands
  // +==================================================================================+

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

  // NEW -------------------------------------------------------------------------------+
  // | [Method] setPosition
  // +----------------------------------------------------------------------------------+

    registerPluginCommand('setPosition');

    $.setPosition = function(args, interpreter) {

      if (args.length >= 2) {

        var x      = Number(args[0]);
        var y      = Number(args[1]);
        var retain = args[2] ? args[2] === 'true' : false;

        $gameMessage.setPointOverride(true, x, y, retain);

      }

    }; // Commands ‹‹ setPosition

  // NEW -------------------------------------------------------------------------------+
  // | [Method] clearPosition
  // +----------------------------------------------------------------------------------+

    registerPluginCommand('clearPosition');

    $.clearPosition = function(args, interpreter) {

      $gameMessage.clearPointOverride();

    }; // Commands ‹‹ clearPosition

  // NEW -------------------------------------------------------------------------------+
  // | [Method] setLayout
  // +----------------------------------------------------------------------------------+

    registerPluginCommand('setLayout');

    $.setLayout = function(args, interpreter) {

      if (args.length >= 3) {

        var align      = args[0];
        var rows       = Number(args[1]);
        var columns    = Number(args[2]);
        var retain     = args[3] ? args[3] === 'true' : false;

        $gameMessage.setLayoutOverride(true, align, rows, columns, retain);

      }

    }; // Commands ‹‹ setLayout

  // NEW -------------------------------------------------------------------------------+
  // | [Method] clearLayout
  // +----------------------------------------------------------------------------------+

    registerPluginCommand('clearLayout');

    $.clearLayout = function(args, interpreter) {

      $gameMessage.clearLayoutOverride();

    }; // Commands ‹‹ clearLayout

  // NEW -------------------------------------------------------------------------------+
  // | [Method] setItemStyle
  // +----------------------------------------------------------------------------------+

    registerPluginCommand('setItemStyle');

    $.setItemStyle = function(args, interpreter) {

      if (args.length >= 1) {

        var width      = Number(args[0]);
        var retain     = args[1] ? args[1] === 'true' : false;

        $gameMessage.setItemStyleOverride(true, width, retain);

      }

    }; // Commands ‹‹ setItemStyle

  // NEW -------------------------------------------------------------------------------+
  // | [Method] clearItemStyle
  // +----------------------------------------------------------------------------------+

    registerPluginCommand('clearItemStyle');

    $.clearItemStyle = function(args, interpreter) {

      $gameMessage.clearItemStyleOverride();

    }; // Commands ‹‹ clearItemStyle

  })(ossCommand);                                                                    // }



  (function($) {                                                                     // {

  // +=================================================|                   Game_Message |
  // | [Plugin] Game_Message
  // +==================================================================================+

    var $obj = setNamespace(ossObject, 'Game_Message');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] initialize
  // +----------------------------------------------------------------------------------+

    $obj.initialize = $.prototype.initialize;

    $.prototype.initialize = function() {

      $obj.initialize.call(this);

      this.initOverride();

    }; // Game_Message << initialize

  // NEW -------------------------------------------------------------------------------+
  // | [Method] setPointOverride
  // +----------------------------------------------------------------------------------+

    $.prototype.setPointOverride = function(enable, x, y, retain) {

      this.__choiceOverride.point.enable = enable;
      this.__choiceOverride.point.retain = retain;
      this.__choiceOverride.point.x = x;
      this.__choiceOverride.point.y = y;

    }; // Game_Message << setPointOverride

  // NEW -------------------------------------------------------------------------------+
  // | [Method] setLayoutOverride
  // +----------------------------------------------------------------------------------+

    $.prototype.setLayoutOverride = function(enable, align, rows, columns, retain) {

      this.__choiceOverride.layout.enable     = enable;
      this.__choiceOverride.layout.retain     = retain;
      this.__choiceOverride.layout.align      = align;
      this.__choiceOverride.layout.rows       = rows;
      this.__choiceOverride.layout.columns    = columns;

    }; // Game_Message << setLayoutOverride

  // NEW -------------------------------------------------------------------------------+
  // | [Method] setItemStyleOverride
  // +----------------------------------------------------------------------------------+

    $.prototype.setItemStyleOverride = function(enable, width, retain) {

      this.__choiceOverride.style.enable     = enable;
      this.__choiceOverride.style.retain     = retain;
      this.__choiceOverride.style.width      = width;

    }; // Game_Message << setItemStyleOverride

  // NEW -------------------------------------------------------------------------------+
  // | [Method] clearPointOverride
  // +----------------------------------------------------------------------------------+

    $.prototype.clearPointOverride = function() {

      this.__choiceOverride.point = {
        enable: false,
        retain: false,
        x: 0,
        y: 0
      };

    }; // Game_Message << clearPointOverride

  // NEW -------------------------------------------------------------------------------+
  // | [Method] clearLayoutOverride
  // +----------------------------------------------------------------------------------+

    $.prototype.clearLayoutOverride = function() {

      this.__choiceOverride.layout = {
        enable: false,
        retain: false,
        align: 'left',
        rows: 0,
        columns: 0
      };

    }; // Game_Message << clearLayoutOverride

  // NEW -------------------------------------------------------------------------------+
  // | [Method] clearItemStyleOverride
  // +----------------------------------------------------------------------------------+

    $.prototype.clearItemStyleOverride = function() {

      this.__choiceOverride.style = {
        enable: false,
        retain: false,
        width: 96
      };

    }; // Game_Message << clearItemStyleOverride

  // NEW -------------------------------------------------------------------------------+
  // | [Method] getChoiceOverride
  // +----------------------------------------------------------------------------------+

    $.prototype.getChoiceOverride = function() {

      return this.__choiceOverride;

    }; // Game_Message << getChoiceOverride

  // NEW -------------------------------------------------------------------------------+
  // | [Method] initOverride
  // +----------------------------------------------------------------------------------+

    $.prototype.initOverride = function() {

      this.__choiceOverride = { };

      this.clearPointOverride();
      this.clearLayoutOverride();
      this.clearItemStyleOverride();

    }; // Game_Message << initOverride

  })(Game_Message);                                                                  // }



  (function($) {                                                                     // {

  // +=================================================|              Window_ChoiceList |
  // | [Plugin] Window_ChoiceList
  // +==================================================================================+

    var $win = setNamespace(ossObject, 'Window_ChoiceList');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] initialize
  // +----------------------------------------------------------------------------------+

    $win.initialize = $.prototype.initialize;

    $.prototype.initialize = function(messageWindow) {

      this.__choiceOverride = $gameMessage.getChoiceOverride();

      $win.initialize.call(this, messageWindow);

    }; // Window_ChoiceList << initialize

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] start
  // +----------------------------------------------------------------------------------+

    $win.start = $.prototype.start;

    $.prototype.start = function() {

      this.__choiceOverride = $gameMessage.getChoiceOverride();

      $win.start.call(this);

    }; // Window_ChoiceList << start

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] updatePlacement
  // +----------------------------------------------------------------------------------+

    $win.updatePlacement = $.prototype.updatePlacement;

    $.prototype.updatePlacement = function() {

      $win.updatePlacement.call(this);

      if (this.__choiceOverride.point.enable) {
        this.x = this.__choiceOverride.point.x;
        this.y = this.__choiceOverride.point.y;
      }

    }; // Window_ChoiceList << updatePlacement

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] numVisibleRows
  // +----------------------------------------------------------------------------------+

    $win.numVisibleRows = $.prototype.numVisibleRows;

    $.prototype.numVisibleRows = function() {

      if (this.__choiceOverride.layout.enable) {
        return this.__choiceOverride.layout.rows;
      } else {
        return $win.numVisibleRows.call(this);
      }

    }; // Window_ChoiceList << numVisibleRows

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] maxCols
  // +----------------------------------------------------------------------------------+

    $win.maxCols = $.prototype.maxCols;

    $.prototype.maxCols = function() {

      if (this.__choiceOverride.layout.enable) {
        return this.__choiceOverride.layout.columns;
      } else {
        return $win.maxCols.call(this);
      }

    }; // Window_ChoiceList << maxCols

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] itemTextAlign
  // +----------------------------------------------------------------------------------+

    $win.itemTextAlign = $.prototype.itemTextAlign;

    $.prototype.itemTextAlign = function() {

      if (this.__choiceOverride.layout.align) {
        return this.__choiceOverride.layout.align;
      } else {
        return $win.itemTextAlign.call(this);
      }

    }; // Window_ChoiceList << itemTextAlign

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] windowWidth
  // +----------------------------------------------------------------------------------+

    $win.windowWidth = $.prototype.windowWidth;

    $.prototype.windowWidth = function() {

      if (this.__choiceOverride.layout.columns > 0) {
        var width = this.maxChoiceWidth() * this.maxCols() + this.padding * 2;

        return width;
      } else {
        return $win.windowWidth.call(this);
      }


    }; // Window_ChoiceList << windowWidth

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] drawItem
  // +----------------------------------------------------------------------------------+

    $win.drawItem = $.prototype.drawItem;

    $.prototype.drawItem = function(index) {

      if (this.__choiceOverride.layout.align) {
        Window_Command.prototype.drawItem.call(this, index);
      } else {
        $win.drawItem.call(this, index);
      }

    }; // Window_ChoiceList << drawItem

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] close
  // +----------------------------------------------------------------------------------+

    $win.close = $.prototype.close;

    $.prototype.close = function() {

      if (!this.__choiceOverride.point.retain) {
        $gameMessage.clearPointOverride();
      }

      if (!this.__choiceOverride.layout.retain) {
        $gameMessage.clearLayoutOverride();
      }

      if (!this.__choiceOverride.style.retain) {
        $gameMessage.clearItemStyleOverride();
      }

      $win.close.call(this);

    }; // Window_ChoiceList << close

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] maxChoiceWidth
  // +----------------------------------------------------------------------------------+

    $win.maxChoiceWidth = $.prototype.maxChoiceWidth;

    $.prototype.maxChoiceWidth = function() {

      if (this.__choiceOverride.style.enable) {

        return this.__choiceOverride.style.width;
      } else {
        return $win.maxChoiceWidth.call(this);
      }

    }; // Window_ChoiceList << maxChoiceWidth

  })(Window_ChoiceList);                                                             // }



})('Window.ChoiceList', 1.10);                                                       // }



// |///////////////////////////////////| End of File |//////////////////////////////////|