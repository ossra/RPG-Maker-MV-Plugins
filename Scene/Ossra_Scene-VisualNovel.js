// +====================================================================================+
// |||  Scene | Visual Novel (Base)
// +====================================================================================+
/*:
 * @plugindesc [0.13A] Adds a Visual Novel scene.
 * @author Ossra
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 0.13A [RPG Maker MV 1.6.2]
 *   - Release : 26th November 2019
 *   - Updated : 26th November 2019
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 * @param optionsPluginOptions
 * @text Plugin Options
 * @type text
 * @default ------------------------------------
 *
 * @param scenes
 * @text Scenes
 * @desc Visual Novel scene configuration.
 * @parent optionsPluginOptions
 * @type struct<optionsScene>[]
 *
 * @param sceneDefault
 * @text Default Scene
 * @desc The default scene to use.
 * @parent optionsPluginOptions
 * @type number
 * @default 1
 * @min 1
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
 * @default ossra-OfbPJETXuTmabIv
 *
 */
// +===================================================|                        Structs |
// | [Plugin] Structs
// +====================================================================================+
/*~struct~optionsScene:
 * @param commonEvent
 * @text Common Event
 * @desc The initial common event to run for the scene.
 * @type common_event
 * @default 0
 *
 * @param displayName
 * @text Display Name
 * @desc
 * @type text
 *
 * @param audio
 * @text Audio
 * @desc
 * @type struct<sceneAudio>
 *
 * @param parallax
 * @text Parallax
 * @desc
 * @type struct<sceneParallax>
 *
 * @param battle
 * @text Battle
 * @desc
 * @type struct<sceneBattle>
 *
 * @param note
 * @text Note
 * @desc
 * @type note
 */
/*~struct~sceneAudio:
 * @param bgm
 * @text BGM
 * @desc
 * @type struct<audioBgm>
 *
 * @param bgs
 * @text BGS
 * @desc
 * @type struct<audioBgs>
 */
/*~struct~audioBgm:
 * @param name
 * @text File
 * @desc
 * @type file
 * @dir audio/bgm/
 *
 * @param volume
 * @text Volume
 * @desc
 * @type number
 * @default 90
 * @max 100
 *
 * @param pitch
 * @text Pitch
 * @desc
 * @type number
 * @default 100
 * @max 200
 * @min 50
 *
 * @param pan
 * @text Pan
 * @desc
 * @type number
 * @default 0
 * @max 100
 * @min -100
 *
 * @param pos
 * @text Position
 * @desc
 * @type number
 * @default 0
 */
/*~struct~audioBgs:
 * @param name
 * @text File
 * @desc
 * @type file
 * @dir audio/bgs/
 *
 * @param volume
 * @text Volume
 * @desc
 * @type number
 * @default 90
 * @max 100
 *
 * @param pitch
 * @text Pitch
 * @desc
 * @type number
 * @default 100
 * @max 200
 * @min 50
 *
 * @param pan
 * @text Pan
 * @desc
 * @type number
 * @default 0
 * @max 100
 * @min -100
 *
 * @param pos
 * @text Position
 * @desc
 * @type number
 * @default 0
 */
/*~struct~sceneParallax:
 * @param image
 * @text Image
 * @desc
 * @type file
 * @dir img/parallaxes/
 *
 * @param scroll
 * @text Scroll
 * @desc
 * @type struct<parallaxScroll>
 */
/*~struct~parallaxScroll:
 * @param sx
 * @text Horizontal
 * @desc
 * @type number
 * @default 0
 * @max 32
 * @min -32
 *
 * @param sy
 * @text Vertical
 * @desc
 * @type number
 * @default 0
 * @max 32
 * @min -32
 */
/*~struct~sceneBattle:
 * @param encounters
 * @text Encounter List
 * @desc
 * @type troop[]
 *
 * @param background
 * @text Background
 * @desc
 * @type struct<battleBack>
 */
/*~struct~battleBack:
 * @param back
 * @text Image 2
 * @desc
 * @type file
 * @dir img/battlebacks2/
 *
 * @param fore
 * @text Image 1
 * @desc
 * @type file
 * @dir img/battlebacks1/
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
  // | [Method] createData
  // +----------------------------------------------------------------------------------+

    $.createData = function(config) {

      var data = {
        'autoplayBgm': false,
        'autoplayBgs': false,
        'battleback1Name': '',
        'battleback2Name': '',
        'bgm': {},
        'bgs': {},
        'disableDashing': false,
        'displayName': '',
        'encounterList': [],
        'encounterStep': 0,
        'height': 0,
        'note': '',
        'parallaxLoopX': false,
        'parallaxLoopY': false,
        'parallaxName': '',
        'parallaxShow': false,
        'parallaxSx': 0,
        'parallaxSy': 0,
        'scrollType': 0,
        'specifyBattleback': false,
        'tilesetId': 0,
        'width': 0,
        'data': [],
        'events': [null],
        'meta': {},
        'commonEvent': 0
      };

      DataManager.extractMetadata(config);

      data.note = config.note;
      data.meta = config.meta;

      data.bgm = config.audio.bgm;
      data.bgs = config.audio.bgs;
      data.autoplayBgm = data.bgm.name !== '';
      data.autoplayBgs = data.bgs.name !== '';

      data.battleback1Name = config.battle.background.back;
      data.battleback2Name = config.battle.background.fore;

      var backEnable = data.battleback1Name !== '' && data.battleback2Name !== '';
      data.specifyBattleback = backEnable;

      data.displayName = config.displayName;

      data.parallaxName = config.parallax.image;
      data.parallaxSx = config.parallax.scroll.sx;
      data.parallaxSy = config.parallax.scroll.sy;
      data.parallaxLoopX = data.parallaxSx !== 0;
      data.parallaxLoopY = data.parallaxSy !== 0;

      data.commonEvent = config.commonEvent;

      return data;

    }; // Functions << createData

  })(ossFunc);                                                                       // }



  (function() {                                                                      // {

  // +=================================================|                      Functions |
  // | [Setup] Functions
  // +==================================================================================+

  // +----------------------------------------------------------------------------------+
  // | [Method] getParameters
  // +----------------------------------------------------------------------------------+

    function getParameters (gid) {

      return $plugins.filter(function(plugin) {
        return plugin.parameters['gid'] === gid;
      })[0]['parameters'];

    }; // Setup << getParameters

  // +----------------------------------------------------------------------------------+
  // | [Method] parseParameters
  // +----------------------------------------------------------------------------------+

    function parseParameters (json, defaults) {

      try {
        return JSON.parse(json, function(key, value) {
          var _arr = key.split('__');
          var _key = _arr[0];
          var _fnc = _arr[1];
          var _def = defaults[_key];
          var _val = value !== '' ? value : _def;

          if (defaults.hasOwnProperty(_key)) {
            if (typeof _fnc !== 'undefined') {
              this[_key] = ossFunc[_fnc].call(this, _val);
            } else if (Array.isArray(_def)) {
              _val = value !== '' ? JSON.parse(_val) : [];

              for (var i = 0; i < _val.length; i++) {
                _val[i] = parseParameters(_val[i], _def[0]);
              }

              return _val;
            } else if (typeof _def === 'string')  {
              return _val;
            } else {
              return parseParameters(_val, _def);
            }
          } else {
            return _key !== '' ? undefined : _val;
          }
        });
      } catch (error) {
        return defaults;
      }

    }; // Setup << parseParameters

  // +----------------------------------------------------------------------------------+
  // | [Method] createConfig
  // +----------------------------------------------------------------------------------+

    function createConfig (gid, defaults) {

      var parameters = getParameters(gid);
      parameters     = JSON.stringify(parameters);
      parameters     = parseParameters(parameters, defaults);

      Object.assign(ossConfig, parameters);

    }; // Setup << createConfig

  // +=================================================|                  Configuration |
  // | [Setup] Configuration
  // +==================================================================================+

  // +----------------------------------------------------------------------------------+
  // | [Setup] Set Defaults
  // +----------------------------------------------------------------------------------+

    var ossDefaults = {

      'scenes':
      [
        {
          'commonEvent': 0,
          'displayName': '',
          'audio':
          {
            'bgm':
            {
              'name': '',
              'volume': 90,
              'pitch': 100,
              'pan': 0,
              'pos': 0
            },
            'bgs':
            {
              'name': '',
              'volume': 90,
              'pitch': 100,
              'pan': 0,
              'pos': 0
            }
          },
          'parallax':
          {
            'image': '',
            'scroll':
            {
              'sx': 0,
              'sy': 0
            }
          },
          'battle':
          {
            'encounters':
            [
              0
            ],
            'background':
            {
              'back': '',
              'fore': ''
            }
          },
          'note': ''
        }
      ],
      'sceneDefault': 0

    };

  // +----------------------------------------------------------------------------------+
  // | [Setup] Set Configuration
  // +----------------------------------------------------------------------------------+

    createConfig('ossra-OfbPJETXuTmabIv', ossDefaults);

    ossData.sceneId = Math.max(ossConfig.sceneDefault - 1, 0);

  })();                                                                              // }



  (function() {                                                                      // {

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
          command = Ossra.Command.filter(function(element) {
            return element.plugin === args[0] && element.name === args[1];
          })[0];

          if (command) {
            command.func.call(this, args.slice(2, args.length));
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

    function registerPluginCommand (name, func) {

      var namespace = pluginName.split('.');

      var command = {
        group: namespace[0],
        plugin: namespace[1],
        name: name,
        func: func
      };

      Ossra.Command.push(command);

    }; // Util ‹‹ registerPluginCommand

  // NEW -------------------------------------------------------------------------------+
  // | [Command] goto
  // +----------------------------------------------------------------------------------+

    registerPluginCommand('goto', function(args) {

      if (args.length < 2) return;

      var subCommand = args[0];

      if (subCommand === 'scene') {
        var sceneId = Math.max(Number(args[1]) - 1, 0);

        ossData.sceneId = sceneId;
        $gamePlayer.reserveTransfer(0,0,0,2,0);
      }

    }); // Commands ‹‹ goto

  })();                                                                              // }



  (function($) {                                                                     // {

  // +=================================================|              Scene_VisualNovel |
  // | [Plugin] Scene_VisualNovel
  // +==================================================================================+

    function Scene_VisualNovel () {
      this.initialize.apply(this, arguments);
    }

    Scene_VisualNovel.prototype = Object.create(Scene_Map.prototype);
    Scene_VisualNovel.prototype.constructor = Scene_VisualNovel;

    $ = $['Scene_VisualNovel'] = Scene_VisualNovel;

  // NEW -------------------------------------------------------------------------------+
  // | [Method] initialize
  // +----------------------------------------------------------------------------------+

    $.prototype.initialize = function() {

      Scene_Base.prototype.initialize.call(this);

      this._waitCount = 0;
      this._encounterEffectDuration = 0;
      this._mapLoaded = false;
      this._touchCount = 0;

    }; // Scene_VisualNovel << initialize

  // NEW -------------------------------------------------------------------------------+
  // | [Method] create
  // +----------------------------------------------------------------------------------+

    $.prototype.create = function() {

      Scene_Base.prototype.create.call(this);

      this._transfer = $gamePlayer.isTransferring();

      // var sceneId = ossConfig.sceneDefault;
      var scene   = ossConfig.scenes[ossData.sceneId];
      $dataMap    = ossFunc.createData(scene);

    }; // Scene_VisualNovel << create

  // NEW -------------------------------------------------------------------------------+
  // | [Method] onMapLoaded
  // +----------------------------------------------------------------------------------+

    $.prototype.onMapLoaded = function() {

      if (this._transfer) {
        $gameMap.setup(0);

        var event = $dataCommonEvents[$dataMap.commonEvent];
        $gameMap._interpreter.setup(event.list);

        $gamePlayer.clearTransferInfo();
      }

      this.createDisplayObjects();

    }; // Scene_VisualNovel << onMapLoaded

  // NEW -------------------------------------------------------------------------------+
  // | [Method] update
  // +----------------------------------------------------------------------------------+

    $.prototype.update = function() {

      this.updateDestination();
      this.updateMainMultiply();

      if (this.isSceneChangeOk()) {
        this.updateScene();
      } else if (SceneManager.isNextScene(Scene_Battle)) {
        this.updateEncounterEffect();
      }

      this.updateWaitCount();

      Scene_Base.prototype.update.call(this);

    }; // Scene_VisualNovel << update

  // NEW -------------------------------------------------------------------------------+
  // | [Method] stop
  // +----------------------------------------------------------------------------------+

    $.prototype.stop = function() {

      Scene_Base.prototype.stop.call(this);

      if (SceneManager.isNextScene(Scene_VisualNovel)) {
        this._mapNameWindow.close();

        this.fadeOutForTransfer();
      } else {
        this._mapNameWindow.close();

        if (this.needsSlowFadeOut()) {
          this.startFadeOut(this.slowFadeSpeed(), false);
        } else if ($gamePlayer._transferring && $gamePlayer._newMapId > 0) { // SceneManager.isNextScene(Scene_Map)
          this.fadeOutForTransfer();
        } else if (SceneManager.isNextScene(Scene_Battle)) {
          this.launchBattle();
        }
      }

    }; // Scene_VisualNovel << stop

  // NEW -------------------------------------------------------------------------------+
  // | [Method] terminate
  // +----------------------------------------------------------------------------------+

    $.prototype.terminate = function() {

      if (SceneManager.isNextScene(Scene_VisualNovel)) {
        ImageManager.clearRequest();
      }

      Scene_Map.prototype.terminate.call(this);

    }; // Scene_VisualNovel << terminate

  // NEW -------------------------------------------------------------------------------+
  // | [Method] isMapTouchOk
  // +----------------------------------------------------------------------------------+

    $.prototype.isMapTouchOk = function() {

      return this.isActive(); //&& $gamePlayer.canMove();

    }; // Scene_VisualNovel << isMapTouchOk

  // NEW -------------------------------------------------------------------------------+
  // | [Method] createDisplayObjects
  // +----------------------------------------------------------------------------------+

    $.prototype.createDisplayObjects = function() {

      this.createSpriteset();
      this.createMapNameWindow();
      this.createWindowLayer();
      this.createAllWindows();

    }; // Scene_VisualNovel << createDisplayObjects

  // NEW -------------------------------------------------------------------------------+
  // | [Method] createSpriteset
  // +----------------------------------------------------------------------------------+

    $.prototype.createSpriteset = function() {

      this._spriteset = new Spriteset_VisualNovel();
      this.addChild(this._spriteset);

    }; // Scene_VisualNovel << createSpriteset

  // NEW -------------------------------------------------------------------------------+
  // | [Method] createAllWindows
  // +----------------------------------------------------------------------------------+

    $.prototype.createAllWindows = function() {

      Scene_Map.prototype.createAllWindows.call(this);

    }; // Scene_VisualNovel << createAllWindows

  // NEW -------------------------------------------------------------------------------+
  // | [Method] createMapNameWindow
  // +----------------------------------------------------------------------------------+

    $.prototype.createMapNameWindow = function() {

      this._mapNameWindow = new Window_MapName();
      this.addChild(this._mapNameWindow);

    }; // Scene_VisualNovel << createMapNameWindow

  // NEW -------------------------------------------------------------------------------+
  // | [Method] createMessageWindow
  // +----------------------------------------------------------------------------------+

    $.prototype.createMessageWindow = function() {

      this._messageWindow = new Window_Message();
      this.addWindow(this._messageWindow);

      this._messageWindow.subWindows().forEach(function(window) {
          this.addWindow(window);
      }, this);

    }; // Scene_VisualNovel << createMessageWindow

  // NEW -------------------------------------------------------------------------------+
  // | [Method] updateCallMenu
  // +----------------------------------------------------------------------------------+

    $.prototype.updateCallMenu = function() {

      if (this.isMenuEnabled()) {
        if (this.isMenuCalled()) {
          this.menuCalling = true;
        }
        if (this.menuCalling) { // && !$gamePlayer.isMoving()
          this.callMenu();
        }
      } else {
        this.menuCalling = false;
      }

    }; // Scene_VisualNovel << updateCallMenu

  // NEW -------------------------------------------------------------------------------+
  // | [Method] isMenuEnabled
  // +----------------------------------------------------------------------------------+

    $.prototype.isMenuEnabled = function() {

      return $gameSystem.isMenuEnabled() && this._waitCount === 0; // && !$gameMap.isEventRunning();

    }; // Scene_VisualNovel << isMenuEnabled

  // NEW -------------------------------------------------------------------------------+
  // | [Method] callMenu
  // +----------------------------------------------------------------------------------+

    $.prototype.callMenu = function() {

      SoundManager.playOk();
      // SceneManager.push(Scene_Menu);
      // Window_MenuCommand.initCommandPosition();
      // $gameTemp.clearDestination();
      // this._mapNameWindow.hide();
      this._waitCount = 2;

    }; // Scene_VisualNovel << callMenu

  // NEW -------------------------------------------------------------------------------+
  // | [Method] startEncounterEffect
  // +----------------------------------------------------------------------------------+

    $.prototype.startEncounterEffect = function() {

      // this._spriteset.hideCharacters();
      this._encounterEffectDuration = this.encounterEffectSpeed();

    }; // Scene_VisualNovel << startEncounterEffect

  // NEW -------------------------------------------------------------------------------+
  // | [Method] startEncounterEffect
  // +----------------------------------------------------------------------------------+

    $.prototype.updateEncounterEffect = function() {

      if (this._encounterEffectDuration > 0) {
        this._encounterEffectDuration--;
        var speed = this.encounterEffectSpeed();
        var n = speed - this._encounterEffectDuration;
        var p = n / speed;
        var q = ((p - 1) * 20 * p + 5) * p + 1;
        var zoomX = Graphics.width / 2;
        var zoomY = Graphics.height / 2;
        if (n === 2) {
          $gameScreen.setZoom(zoomX, zoomY, 1);
          this.snapForBattleBackground();
          this.startFlashForEncounter(speed / 2);
        }
        $gameScreen.setZoom(zoomX, zoomY, q);
        if (n === Math.floor(speed / 6)) {
          this.startFlashForEncounter(speed / 2);
        }
        if (n === Math.floor(speed / 2)) {
          BattleManager.playBattleBgm();
          this.startFadeOut(this.fadeSpeed());
        }
      }

    }; // Scene_VisualNovel << updateEncounterEffect

  })(window);                                                                        // }



  (function($) {                                                                     // {

  // +=================================================|          Spriteset_VisualNovel |
  // | [Plugin] Spriteset_VisualNovel
  // +==================================================================================+

    function Spriteset_VisualNovel () {
      this.initialize.apply(this, arguments);
    }
    
    Spriteset_VisualNovel.prototype = Object.create(Spriteset_Map.prototype);
    Spriteset_VisualNovel.prototype.constructor = Spriteset_VisualNovel;

    $ = $['Spriteset_VisualNovel'] = Spriteset_VisualNovel;

  // NEW -------------------------------------------------------------------------------+
  // | [Method] initialize
  // +----------------------------------------------------------------------------------+

    $.prototype.initialize = function() {

      Spriteset_Base.prototype.initialize.call(this);

    }; // Spriteset_VisualNovel << initialize

  // NEW -------------------------------------------------------------------------------+
  // | [Method] createLowerLayer
  // +----------------------------------------------------------------------------------+

    $.prototype.createLowerLayer = function() {

      Spriteset_Base.prototype.createLowerLayer.call(this);

      this.createParallax();
      // this.createTilemap();
      // this.createCharacters();
      // this.createShadow();
      // this.createDestination();
      this.createWeather();

    }; // Spriteset_VisualNovel << createLowerLayer

  // NEW -------------------------------------------------------------------------------+
  // | [Method] update
  // +----------------------------------------------------------------------------------+

    $.prototype.update = function() {

      Spriteset_Base.prototype.update.call(this);

      // this.updateTileset();
      this.updateParallax();
      // this.updateTilemap();
      // this.updateShadow();
      this.updateWeather();

    }; // Spriteset_VisualNovel << update
    
  // NEW -------------------------------------------------------------------------------+
  // | [Method] hideCharacters
  // +----------------------------------------------------------------------------------+

    $.prototype.hideCharacters = function() {
    }; // Spriteset_VisualNovel << hideCharacters
    
  // NEW -------------------------------------------------------------------------------+
  // | [Method] showCharacters
  // +----------------------------------------------------------------------------------+

    $.prototype.showCharacters = function() {
    }; // Spriteset_VisualNovel << showCharacters

  })(window);                                                                        // }



  (function($) {                                                                     // {

  // +=================================================|                      Scene_Map |
  // | [Plugin] Scene_Map
  // +==================================================================================+

    var $scn = setNamespace(ossScene, 'Scene_Map');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] terminate
  // +----------------------------------------------------------------------------------+

    $scn.stop = $.prototype.stop;

    $.prototype.stop = function() {

      if (SceneManager.isNextScene(Scene_VisualNovel)) {
        this.fadeOutForTransfer();
      }

      $scn.stop.call(this);

    }; // Scene_Map << stop

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] updateTransferPlayer
  // +----------------------------------------------------------------------------------+

    $scn.updateTransferPlayer = $.prototype.updateTransferPlayer;

    $.prototype.updateTransferPlayer = function() {

      if ($gamePlayer.isTransferring() && $gamePlayer._newMapId === 0) {
        SceneManager.goto(Scene_VisualNovel);
      } else {
        $scn.updateTransferPlayer.call(this);
      }

    }; // Scene_Map << updateTransferPlayer

  })(Scene_Map);                                                                     // }



  (function($) {                                                                     // {

  // +=================================================|                     Scene_Load |
  // | [Plugin] Scene_Load
  // +==================================================================================+

    var $scn = setNamespace(ossScene, 'Scene_Load');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] terminate
  // +----------------------------------------------------------------------------------+

    $scn.onLoadSuccess = $.prototype.onLoadSuccess;

    $.prototype.onLoadSuccess = function() {

      if ($gameMap._mapId === 0) {
        SoundManager.playLoad();
        this.fadeOutAll();
        this.reloadMapIfUpdated();
        SceneManager.goto(Scene_VisualNovel);
        this._loadSuccess = true;
      } else {
        $scn.onLoadSuccess.call(this);
      }

    }; // Scene_Load << onLoadSuccess

  })(Scene_Load);                                                                    // }



})('Scene.VisualNovel', 0.13);                                                       // }



// |///////////////////////////////////| End of File |//////////////////////////////////|