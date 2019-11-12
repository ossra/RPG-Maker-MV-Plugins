// +====================================================================================+
// |||  Game | Startup Scene
// +====================================================================================+
/*:
 * @plugindesc [1.00] Adds the ability to select what scene is loaded on boot.
 * @author Ossra
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.00 [RPG Maker MV 1.6.2]
 *   - Release : 11th November 2019
 *   - Updated : 11th November 2019
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 * @param headerPluginOptions
 * @text Plugin Options
 * @type text
 * @default ------------------------------------
 *
 * @param scene
 * @text Initial Scene
 * @desc The scene to load on boot.
 * @parent headerPluginOptions
 * @type combo
 * @option Scene_Title
 * @option Scene_Map
 * @option Scene_Load
 * @default Scene_Title
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
 * @default ossra-6hcsRbEoBG5SeSk
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

      'scene': 'Scene_Title'

    };

  // +----------------------------------------------------------------------------------+
  // | [Setup] Create Configuration
  // +----------------------------------------------------------------------------------+

    createConfig('ossra-6hcsRbEoBG5SeSk', ossDefaults);

  })();                                                                              // }



  (function($) {                                                                     // {

  // +=================================================|                     Scene_Boot |
  // | [Plugin] Scene_Boot
  // +==================================================================================+

    var $scn = setNamespace(ossScene, 'Scene_Boot');

  // OVERWRITE -------------------------------------------------------------------------+
  // | [Method] start
  // +----------------------------------------------------------------------------------+

    $.prototype.start = function() {

      Scene_Base.prototype.start.call(this);

      SoundManager.preloadImportantSounds();

      var scene = window[ossConfig.scene];

      if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
      } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(scene);
      } else {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(scene);
      }

      this.updateDocumentTitle();

    }; // Scene_Boot << start

  })(Scene_Boot);                                                                    // }



})('Game.StartupScene', 1.00);                                                       // }



// |///////////////////////////////////| End of File |//////////////////////////////////|