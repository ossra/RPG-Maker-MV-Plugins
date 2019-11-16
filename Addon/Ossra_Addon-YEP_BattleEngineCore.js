// +====================================================================================+
// |||  Addon | YEP_BattleEngineCore
// +====================================================================================+
/*:
 * @plugindesc [1.00] Various addon features for the YEP_BattleEngineCore plugin.
 * @author Ossra
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.00 [RPG Maker MV 1.6.2]
 *   - Release : 15th November 2019
 *   - Updated : 15th November 2019
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 * @param optionsEnemySelect
 * @text Enemy Select
 * @type text
 * @default ------------------------------------
 *
 * @param colorFont
 * @text Enemy Font Color
 * @desc A list of font colors associated with javascript conditional triggers.
 * @parent optionsEnemySelect
 * @type struct<optionsColor>[]
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
 * @default ossra-hPPHvop17SLNDw7
 *
 */
// +===================================================|                        Structs |
// | [Plugin] Structs
// +====================================================================================+
/*~struct~optionsColor:
 * @param trigger__evalParam
 * @text Conditional Trigger
 * @desc The javascript conditional trigger to be evaluated.
 * [Variables] 'b' <Enemy Battler>
 * @type text
 *
 * @param options
 * @text Color Options
 * @desc Font color options for the enemy select box.
 * @type struct<colorData>
 */
/*~struct~colorData:
 * @param type
 * @text Color Type
 * @desc The type of color to be used. 
 * @type select
 * @option WindowSkin Color
 * @value 0
 * @option Custom Color
 * @value 1
 * @default 0
 *
 * @param window
 * @text WindowSkin Color
 * @desc The windowskin color ID to be used.
 * @type number
 * @default 0
 * @max 31
 *
 * @param custom__getColor
 * @text Custom Color
 * @desc The hex color to be used.
 * @type text
 * @default #FFFFFF
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
  // | [Method] evalParam
  // +----------------------------------------------------------------------------------+

    $.evalParam = function(param) {

      var func = function (b) {
        "use strict"

        return eval(param);
      };

      return func.bind(null);

    }; // Functions << evalParam

  // +----------------------------------------------------------------------------------+
  // | [Method] getColor
  // +----------------------------------------------------------------------------------+

    $.getColor = function (param) {

      var obj = {
        hex:  0,
        rgb:  [0,0,0],
        rgba: [0,0,0,255],
        raw:  '#000000'
      };

      if (/^#([0-9a-f]{6})$/i.test(param)) {
        obj.raw  = param;
        obj.hex  = parseInt('0x' + RegExp.$1);

        obj.rgb  = PIXI.utils.hex2rgb(obj.hex, [0,0,0]);
        obj.rgb  = obj.rgb.map(function(e) { return e * 255; });
        obj.rgba = PIXI.utils.hex2rgb(obj.hex, [0,0,0,1]);
        obj.rgba = obj.rgba.map(function(e) { return e * 255; });
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
                input[key][i] = JSON.parse(input[key][i], function(_key, _value) {
                  if (/^(\w+)__(\w+)$/i.test(_key)) {
                    this[RegExp.$1] = ossFunc[RegExp.$2].call(this, _value);
                  } else {
                    return _value;
                  }
                });
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

      'colorFont':
      [
        {
          'trigger': ossFunc.evalParam('false'),
          'options':
          {
            'type': 0,
            'window': 0,
            'custom': ossFunc.getColor('#FFFFFF')
          }
        }
      ]

    };

  // +----------------------------------------------------------------------------------+
  // | [Setup] Create Configuration
  // +----------------------------------------------------------------------------------+

    createConfig('ossra-hPPHvop17SLNDw7', ossDefaults);

  })();                                                                              // }



  (function($) {                                                                     // {

  // +=================================================|       Window_EnemyVisualSelect |
  // | [Plugin] Window_EnemyVisualSelect
  // +==================================================================================+

    var $win = setNamespace(ossWindow, 'Window_EnemyVisualSelect');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] refresh
  // +----------------------------------------------------------------------------------+

    $win.refresh = $.prototype.refresh;
  
    $.prototype.refresh = function() {

      for (var c = 0; c < ossConfig.colorFont.length; c++) {
        var data = ossConfig.colorFont[c];

        if (data.trigger.call(this, this._battler)) {
          var color = this.normalColor();

          if (data.options.type === 0) {
            color = this.textColor(data.options.window);
          } else if (data.options.type === 1) {
            color = data.options.custom.raw;
          }

          this.changeTextColor(color);
          break;
        }
      }

      $win.refresh.call(this);

    }; // Scene_Boot << start

  })(Window_EnemyVisualSelect);                                                      // }



})('Addon.YEP_BattleEngineCore', 1.00);                                              // }



// |///////////////////////////////////| End of File |//////////////////////////////////|