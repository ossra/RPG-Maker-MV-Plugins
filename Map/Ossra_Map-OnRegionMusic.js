// +====================================================================================+
// |||  Map | On Region Music
// +====================================================================================+
/*:
 * @plugindesc [1.00] Adds the ability to set various sounds and music to regions.
 * @author Ossra
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.00 [RPG Maker MV 1.6.2]
 *   - Release : 19th January 2020
 *   - Updated : 19th January 2020
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 * @param optionsPluginOptions
 * @text Plugin Options
 * @type text
 * @default ------------------------------------
 *
 * @param map
 * @text Map Setup
 * @desc Map data which contains region and audio information.
 * @parent optionsPluginOptions
 * @type struct<optionsMap>[]
 *
 * @param fade
 * @text Fade Setup
 * @desc Fade data which controls fading for BGM and BGS audio files.
 * @parent optionsPluginOptions
 * @type struct<optionsFade>
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
 * @default ossra-uERqKRwpgD3WflI
 *
 */
// +===================================================|                        Structs |
// | [Plugin] Structs
// +====================================================================================+
/*~struct~optionsMap:
 * @param id
 * @text ID
 * @desc The ID of the map.
 * @type number
 * @default 1
 * @min 1
 *
 * @param region
 * @text Region Setup
 * @desc Region data which contains audio information.
 * @type struct<optionsRegion>[]
 */
/*~struct~optionsFade:
 * @param bgm
 * @text Fade BGM
 * @desc Controls BGM fading when entering a region.
 * @type struct<enableFade>
 *
 * @param bgs
 * @text Fade BGS
 * @desc Controls BGS fading when entering a region.
 * @type struct<enableFade>
 */
/*~struct~enableFade:
 * @param enable
 * @text Enable
 * @desc Enable or disable fading.
 * @type boolean
 * @default false
 *
 * @param duration
 * @text Duration
 * @desc Duration of the fade.
 * @type number
 * @decimals 2
 * @default 0.5
 */
/*~struct~optionsRegion:
 * @param id
 * @text ID
 * @desc The id of the region within the map.
 * @type number
 * @default 1
 * @min 1
 * @max 255
 *
 * @param audio
 * @text Audio Setup
 * @desc Audio data which contains audio file information.
 * @type struct<regionAudio>
 */
/*~struct~regionAudio:
 * @param battle
 * @text Battle
 * @desc The battle BGM for the region.
 * @type struct<audioBgm>
 *
 * @param bgm
 * @text BGM
 * @desc The field BGM for the region.
 * @type struct<audioBgm>
 *
 * @param bgs
 * @text BGS
 * @desc The field BGS for the region.
 * @type struct<audioBgs>
 *
 * @param me
 * @text ME
 * @desc The ME for the region.
 * @type struct<audioMe>
 *
 * @param se
 * @text SE
 * @desc The SE for the region.
 * @type struct<audioSe>
 */
/*~struct~audioBgm:
 * @param name
 * @text File
 * @desc The file name of the BGM.
 * @type file
 * @dir audio/bgm/
 *
 * @param volume
 * @text Volume
 * @desc The volume of the BGM.
 * @type number
 * @default 90
 * @max 100
 *
 * @param pitch
 * @text Pitch
 * @desc The pitch of the BGM.
 * @type number
 * @default 100
 * @max 200
 * @min 50
 *
 * @param pan
 * @text Pan
 * @desc The pan of the BGM.
 * @type number
 * @default 0
 * @max 100
 * @min -100
 *
 * @param pos
 * @text Position
 * @desc The initial position of the BGM.
 * @type number
 * @decimals 2
 * @default 0
 */
/*~struct~audioBgs:
 * @param name
 * @text File
 * @desc The file name of the BGS.
 * @type file
 * @dir audio/bgs/
 *
 * @param volume
 * @text Volume
 * @desc The volume of the BGS.
 * @type number
 * @default 90
 * @max 100
 *
 * @param pitch
 * @text Pitch
 * @desc The pitch of the BGS.
 * @type number
 * @default 100
 * @max 200
 * @min 50
 *
 * @param pan
 * @text Pan
 * @desc The pan of the BGS.
 * @type number
 * @default 0
 * @max 100
 * @min -100
 *
 * @param pos
 * @text Position
 * @desc The initial position of the BGS.
 * @type number
 * @decimals 2
 * @default 0
 */
/*~struct~audioMe:
 * @param name
 * @text File
 * @desc The file name of the ME.
 * @type file
 * @dir audio/me/
 *
 * @param volume
 * @text Volume
 * @desc The volume of the ME.
 * @type number
 * @default 90
 * @max 100
 *
 * @param pitch
 * @text Pitch
 * @desc The pitch of the ME.
 * @type number
 * @default 100
 * @max 200
 * @min 50
 *
 * @param pan
 * @text Pan
 * @desc The pan of the ME.
 * @type number
 * @default 0
 * @max 100
 * @min -100
 */
/*~struct~audioSe:
 * @param name
 * @text File
 * @desc The file name of the SE.
 * @type file
 * @dir audio/se/
 *
 * @param volume
 * @text Volume
 * @desc The volume of the SE.
 * @type number
 * @default 90
 * @max 100
 *
 * @param pitch
 * @text Pitch
 * @desc The pitch of the SE.
 * @type number
 * @default 100
 * @max 200
 * @min 50
 *
 * @param pan
 * @text Pan
 * @desc The pan of the SE.
 * @type number
 * @default 0
 * @max 100
 * @min -100
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
  // | [Method] getEmptyAudio
  // +----------------------------------------------------------------------------------+

    $.getEmptyAudio = function() {

      var object = {
        'battle':
        {
          'name': '',
          'volume': 90,
          'pitch': 100,
          'pan': 0,
          'pos': 0
        },
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
        },
        'me':
        {
          'name': '',
          'volume': 90,
          'pitch': 100,
          'pan': 0
        },
        'se':
        {
          'name': '',
          'volume': 90,
          'pitch': 100,
          'pan': 0
        }
      };

      return object;

    }; // Functions << getEmptyAudio

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

      'map':
      [
        {
          'id': 0,
          'region':
          [
            {
              'id': 0,
              'audio': ossFunc.getEmptyAudio()
            }
          ]
        }
      ],
      'fade':
      {
        'bgm':
        {
          'enable': false,
          'duration': 0.5
        },
        'bgs':
        {
          'enable': false,
          'duration': 0.5
        }
      }

    };

  // +----------------------------------------------------------------------------------+
  // | [Setup] Set Configuration
  // +----------------------------------------------------------------------------------+

    createConfig('ossra-uERqKRwpgD3WflI', ossDefaults);

    ossData.lastmap    = -1;
    ossData.lastRegion = -1;
    ossData.schedule   = {

      'bgm': {
        'in': null,
        'out': null
      },
      'bgs': {
        'in': null,
        'out': null
      }

    };

  })();                                                                              // }



  (function($) {                                                                     // {

  // +=================================================|                    Game_Player |
  // | [Plugin] Game_Player
  // +==================================================================================+

    var $obj = setNamespace(ossObject, 'Game_Player');
    var _fnc = setNamespace(ossFunc, 'Game_Player');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] update
  // +----------------------------------------------------------------------------------+

    $obj.update = $.prototype.update;

    $.prototype.update = function(sceneActive) {

      this.updateOnRegion();

      _fnc.updateSchedule();

      $obj.update.call(this, sceneActive);

    }; // Game_Player << update

  // NEW -------------------------------------------------------------------------------+
  // | [Method] onAudioById
  // +----------------------------------------------------------------------------------+

    _fnc.onAudioById = function(mapId, regionId) {

      var defaults = ossFunc.getEmptyAudio();

      if (regionId > 0) {
        for (var m = 0; m < ossConfig.map.length; m++) {
          var map = ossConfig.map[m];

          if (map.id === mapId) {
            for (var r = 0; r < map.region.length; r++) {
              var region = map.region[r];

              if (region.id === regionId) {
                return region.audio;
              }
            }
          }
        }
      } else {
        if ($dataMap.autoplayBgm) defaults.bgm = $dataMap.bgm;
        if ($dataMap.autoplayBgs) defaults.bgs = $dataMap.bgs;
      }

      return defaults;

    }; // Game_Player << onAudioById

  // NEW -------------------------------------------------------------------------------+
  // | [Method] updateOnRegion
  // +----------------------------------------------------------------------------------+

    $.prototype.updateOnRegion = function() {

      var regionId = this.regionId();
      var mapId    = $gameMap.mapId();

      if (ossData.lastRegion !== regionId || ossData.lastMap !== mapId) {
        var audio = _fnc.onAudioById(mapId, regionId);

        AudioManager.playMe(audio.me);
        AudioManager.playSe(audio.se);

        _fnc.processBattleBgm(audio);
        _fnc.processBgm(audio);
        _fnc.processBgs(audio);

        ossData.lastMap    = mapId;
        ossData.lastRegion = regionId;
      }

    }; // Game_Player << updateOnRegion

  // NEW -------------------------------------------------------------------------------+
  // | [Method] processBattleBgm
  // +----------------------------------------------------------------------------------+

    _fnc.processBattleBgm = function(audio) {

      if (audio.battle.name) {
        $gameSystem.setBattleBgm(audio.battle);
      } else {
        $gameSystem.setBattleBgm(null);
      }

    }; // Game_Player << processBattleBgm

  // NEW -------------------------------------------------------------------------------+
  // | [Method] processBgm
  // +----------------------------------------------------------------------------------+

    _fnc.processBgm = function(audio) {

      if (ossConfig.fade.bgm.enable) {
        _fnc.scheduleFadeEvent('bgm', 'out');
        _fnc.scheduleFadeEvent('bgm', 'in', audio);
      } else {
        AudioManager.playBgm(audio.bgm, audio.bgm.pos);
      }

    }; // Game_Player << processBgm

  // NEW -------------------------------------------------------------------------------+
  // | [Method] processBgs
  // +----------------------------------------------------------------------------------+

    _fnc.processBgs = function(audio) {

      if (ossConfig.fade.bgs.enable) {
        _fnc.scheduleFadeEvent('bgs', 'out');
        _fnc.scheduleFadeEvent('bgs', 'in', audio);
      } else {
        AudioManager.playBgs(audio.bgs, audio.bgs.pos);
      }

    }; // Game_Player << processBgs

  // NEW -------------------------------------------------------------------------------+
  // | [Method] audioFadeIn
  // +----------------------------------------------------------------------------------+

    _fnc.audioFadeIn = function(type, audio) {

      var upType = type.charAt(0).toUpperCase() + type.slice(1);
      var play   = 'play' + upType;
      var fade   = 'fadeIn' + upType;
      var data   = ossConfig.fade[type];

      AudioManager[play](audio[type]);
      AudioManager[fade](data.duration);

    }; // Game_Player << audioFadeIn

  // NEW -------------------------------------------------------------------------------+
  // | [Method] scheduleFadeEvent
  // +----------------------------------------------------------------------------------+

    _fnc.scheduleFadeEvent = function(type, direction, audio) {

      var upType      = type.charAt(0).toUpperCase() + type.slice(1);
      var upDirection = direction.charAt(0).toUpperCase() + direction.slice(1);

      var event = {
        'type': type,
        'audio': audio,
        'method': 'fade' + upDirection + upType,
        'wait': ossConfig.fade[type].duration * 60,
        'duration': ossConfig.fade[type].duration,
        'started': false
      };

      ossData.schedule[type][direction] = event;

    }; // Game_Player << scheduleFadeEvent

  // NEW -------------------------------------------------------------------------------+
  // | [Method] updateSchedule
  // +----------------------------------------------------------------------------------+

    _fnc.updateSchedule = function() {

      _fnc.doUpdate('bgm');
      _fnc.doUpdate('bgs');

    }; // Game_Player << updateSchedule

  // NEW -------------------------------------------------------------------------------+
  // | [Method] updateFade
  // +----------------------------------------------------------------------------------+

    _fnc.updateFade = function(data, type, direction) {

      if (data.started) {
        if (data.wait > 0) {
          data.wait--;
        } else if (data.wait === 0) {
          ossData.schedule[type][direction] = null;
        }
      } else {
        data.started = true;

        if (direction === 'out') {
          AudioManager[data.method](data.duration);
        } else if (direction === 'in') {
          _fnc.audioFadeIn(data.type, data.audio);
        }
      }

    }; // Game_Player << updateFade

  // NEW -------------------------------------------------------------------------------+
  // | [Method] doUpdate
  // +----------------------------------------------------------------------------------+

    _fnc.doUpdate = function(type) {

      var fadeOut = ossData.schedule[type]['out'];

      if (fadeOut) {
        _fnc.updateFade(fadeOut, type, 'out');
      } else {
        var fadeIn = ossData.schedule[type]['in'];

        if (fadeIn) {
          _fnc.updateFade(fadeIn, type, 'in');
        }
      }

    }; // Game_Player << doUpdate

  })(Game_Player);                                                                   // }



})('Map.OnRegionMusic', 1.00);                                                       // }



// |///////////////////////////////////| End of File |//////////////////////////////////|