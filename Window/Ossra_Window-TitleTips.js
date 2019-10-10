// +====================================================================================+
// |||  Window | Title Tips
// +====================================================================================+
/*:
 *  @plugindesc [1.00] Creates a tip window on the title screen.
 *  @author Ossra
 *
 * @help
 * ==| Plugin                  |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.00 [RPG Maker MV 1.6.2]
 *   - Release : 9th October 2019
 *   - Updated : 9th October 2019
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 * @param _pluginOptions
 * @text Plugin Options
 * @type text
 * @default ------------------------------------
 *
 * @param window
 * @text Tip Window
 * @desc Options for the tip window.
 * @parent _pluginOptions
 * @type struct<windowOptions>
 *
 * @param style
 * @text Tip Text
 * @desc Text style of the tips.
 * @parent _pluginOptions
 * @type struct<styleOptions>
 *
 * @param data
 * @text Tip Data
 * @desc The database of tips for the window to display.
 * @parent _pluginOptions
 * @type struct<dataTip>[]
 *
 * @param mode
 * @text Tip Mode
 * @desc The display mode of the tip window.
 * @parent _pluginOptions
 * @type select
 * @option Random
 * @value 0
 * @option Sequential
 * @value 1
 * @default 0
 *
 * @param initial
 * @text Default Tip
 * @desc The initial tip to be displayed.
 * @parent _pluginOptions
 * @type number
 * @default 1
 * @min 1
 *
 * @param _pluginData
 * @text Plugin Data
 * @type text
 * @default ------------------------------------
 *
 * @param gid
 * @text Global Identifier
 * @desc Global identification tag for internal use only. Do not change.
 * @parent _pluginData
 * @default ossra-zigazkzEkDvogDR
 */
// +===================================================|                        Structs |
// | [Plugin] Structs
// +====================================================================================+
/*~struct~windowOptions:
 * @param x__evalParam
 * @text X
 * @desc X coordinate of the tip window. Evaluated as JavaScript.
 * [Variables] 's' <Scene_Title>
 * @type text
 * @default 0
 *
 * @param y__evalParam
 * @text Y
 * @desc Y coordinate of the tip window. Evaluated as JavaScript.
 * [Variables] 's' <Scene_Title>
 * @type text
 * @default 0
 *
 * @param width__evalParam
 * @text Width
 * @desc Width of the tip window. Evaluated as JavaScript.
 * [Variables] 's' <Scene_Title>
 * @type text
 * @default 350
 *
 * @param lines
 * @text Lines
 * @desc Number of text lines to be shown by the tip window.
 * @type number
 * @default 1
 * @min 1
 *
 * @param background
 * @text Background
 * @desc Window style to be used by the tip window.
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @default 0
 */
/*~struct~styleOptions:
 * @param size
 * @text Size
 * @desc Font size for each tip.
 * Default: -1 (Use Default Font Size).
 * @type number
 * @default -1
 * @min -1
 *
 * @param color__getColor
 * @text Color
 * @desc Font color for each tip. Use any valid hex color values.
 * @type text
 * @default #ffffff
 *
 * @param lineHeight
 * @text Line Height
 * @desc The height of each tip line.
 * Default: -1 (Use Default Line Height).
 * @type number
 * @default -1
 * @min -1
 */
/*~struct~dataTip:
 * @param wait
 * @text Tip Wait
 * @desc Amount of time to wait before displaying the next tip.
 * Use a value of -1 for an indefinite wait.
 * @type number
 * @default 600
 * @min -1
 *
 * @param text
 * @text Tip Text
 * @desc The text to be displayed. Message text codes can be used.
 * @type note
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



  // +=================================================|                  Configuration |
  // | [Plugin] Configuration
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
  // | [Method] evalParam
  // +----------------------------------------------------------------------------------+

    $.evalParam = function(param) {

      var func = function (s) {
        "use strict"

        return eval(param);
      };

      return func.bind(null);

    }; // Functions << evalParam

  // +----------------------------------------------------------------------------------+
  // | [Method] getColor
  // +----------------------------------------------------------------------------------+

    $.getColor = function (param) {

      var obj = { hex: 0, array: [0,0,0,255], val: '000000' };

      if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(param)) {
        obj.val   = RegExp.$1;

        obj.hex   = parseInt('0x' + obj.val);

        obj.array = obj.val.length === 3 ? obj.val.match(/.{1}/g) : obj.val.match(/.{2}/g);
        obj.array = obj.array.map(function(color) { return parseInt('0x' + color); });
        obj.array.push(255);
      }

      return obj;

    }; // Functions << getColor

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

      'window':
      {
        'x': ossFunc.evalParam(0),
        'y': ossFunc.evalParam(0),
        'width': ossFunc.evalParam(350),
        'lines': 1,
        'background': 0
      },
      'style':
      {
        'size': -1,
        'color': ossFunc.getColor(),
        'lineHeight': -1
      },
      'data':
      [
        {
          'wait': -1,
          'text': '[Empty Tip Text]'
        }
      ],
      'mode': 0,
      'initial': 1

    };

  // +----------------------------------------------------------------------------------+
  // | [Setup] Create Configuration
  // +----------------------------------------------------------------------------------+

    createConfig('ossra-zigazkzEkDvogDR', ossDefaults);

  })();                                                                              // }



  (function($) {                                                                     // {

  // +=================================================|               Window_TitleTips |
  // | [Window] Window_TitleTips
  // +==================================================================================+

    $.Window_TitleTips = function () {
      this.initialize.apply(this, arguments);
    }

    $ = $.Window_TitleTips;

    $.prototype = Object.create(Window_Help.prototype);
    $.prototype.constructor = $;

  // NEW -------------------------------------------------------------------------------+
  // | [Method] initialize
  // +----------------------------------------------------------------------------------+

    $.prototype.initialize = function(x, y, width, lines, data, options) {

      this._options = options;
      this._data    = data;
      this._text    = '';
      this._timer   = -1;
      this._tipId   = options.initial - 1;

      var height    = this.fittingHeight(lines || 1);

      Window_Base.prototype.initialize.call(this, x, y, width, height);

      this.applyOptions();

      this.setTip(this._tipId);

    }; // Window_TitleTips ‹‹ initialize

  // NEW -------------------------------------------------------------------------------+
  // | [Method] update
  // +----------------------------------------------------------------------------------+

    $.prototype.update = function() {

        Window_Base.prototype.update.call(this);

        this.updateTimer();

    }; // Window_TitleTips ‹‹ update

  // NEW -------------------------------------------------------------------------------+
  // | [Method] updateTimer
  // +----------------------------------------------------------------------------------+

    $.prototype.updateTimer = function() {

      if (this._timer > 0) {
        this._timer--;
      } else if (this._timer === 0) {
        this.nextTip();
        this.setTip(this._tipId);
      }

    }; // Window_TitleTips ‹‹ updateTimer

  // NEW -------------------------------------------------------------------------------+
  // | [Method] nextTip
  // +----------------------------------------------------------------------------------+

    $.prototype.nextTip = function() {

      switch (this._options.mode) {
        case 0:
          this._tipId = Math.floor(Math.random() * this._data.length);
          break;
        case 1:
          if (this._tipId + 1 < this._data.length) {
            this._tipId++;
          } else {
            this._tipId = 0;
          }
          break;
      };

    }; // Window_TitleTips ‹‹ nextTip

  // NEW -------------------------------------------------------------------------------+
  // | [Method] setTip
  // +----------------------------------------------------------------------------------+

    $.prototype.setTip = function(id) {

      var tip = this._data[id];

      if (tip) {
        var wait = tip.wait;
        var text = tip.text;
      } else {
        var wait = -1;
        var text = '[Empty Tip Text]';
      }

      this.setTimer(wait);
      this.setText(text);

    }; // Window_TitleTips ‹‹ setTip

  // NEW -------------------------------------------------------------------------------+
  // | [Method] setTimer
  // +----------------------------------------------------------------------------------+

    $.prototype.setTimer = function(frames) {

      this._timer = frames;

    }; // Window_TitleTips ‹‹ setTimer

  // NEW -------------------------------------------------------------------------------+
  // | [Method] applyOptions
  // +----------------------------------------------------------------------------------+

    $.prototype.applyOptions = function() {

      this.setBackgroundType(this._options.background);

    }; // Window_TitleTips ‹‹ applyOptions

  // NEW -------------------------------------------------------------------------------+
  // | [Method] normalColor
  // +----------------------------------------------------------------------------------+

    $.prototype.normalColor = function() {

      return '#' + this._options.fontColor.val;

    }; // Window_TitleTips ‹‹ normalColor

  // NEW -------------------------------------------------------------------------------+
  // | [Method] standardFontSize
  // +----------------------------------------------------------------------------------+

    $.prototype.standardFontSize = function() {

      if (this._options.fontSize > -1) {
        return this._options.fontSize;
      } else {
        return Window_Base.prototype.standardFontSize.call(this);
      }

    }; // Window_TitleTips ‹‹ standardFontSize

  // NEW -------------------------------------------------------------------------------+
  // | [Method] lineHeight
  // +----------------------------------------------------------------------------------+

    $.prototype.lineHeight = function() {

      if (this._options.lineHeight > -1) {
        return this._options.lineHeight;
      } else {
        return Window_Base.prototype.lineHeight.call(this);
      }

    }; // Window_TitleTips ‹‹ lineHeight

  })(window);                                                                        // }



  (function($) {                                                                     // {

  // +=================================================|                    Scene_Title |
  // | [Scene] Scene_Title
  // +==================================================================================+

    var $scn = setNamespace(ossScene, 'Scene_Title');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] create
  // +----------------------------------------------------------------------------------+

    $scn.create = $.prototype.create;

    $.prototype.create = function() {

      $scn.create.call(this);

      this.createTipsWindow();

    }; // Scene_Title ‹‹ create

  // NEW -------------------------------------------------------------------------------+
  // | [Method] createTipsWindow
  // +----------------------------------------------------------------------------------+

    $.prototype.createTipsWindow = function() {

      var x       = ossConfig.window.x(this);
      var y       = ossConfig.window.y(this);
      var width   = ossConfig.window.width(this);
      var lines   = ossConfig.window.lines;
      var data    = ossConfig.data;

      var options = {
        'background': ossConfig.window.background,
        'fontSize': ossConfig.style.size,
        'fontColor': ossConfig.style.color,
        'lineHeight': ossConfig.style.lineHeight,
        'initial': ossConfig.initial,
        'mode': ossConfig.mode
      };

      this._tipsWindow = new Window_TitleTips(x, y, width, lines, data, options);
      this.addWindow(this._tipsWindow);

    }; // Scene_Title ‹‹ createTipsWindow

  })(Scene_Title);                                                                   // }



})('Window.TitleTips', 1.00);                                                        // }



// |///////////////////////////////////| End of File |//////////////////////////////////|