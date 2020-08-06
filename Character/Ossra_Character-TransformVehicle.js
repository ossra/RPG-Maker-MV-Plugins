// +====================================================================================+
// |||  Character | Transform Vehicle
// +====================================================================================+
/*:
 * @plugindesc [1.00] Changes the graphic of a vehicle when driving.
 * @author Ossra
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.00 | RPG Maker MB 1.6.2
 *   - Release : 5th August 2020
 *   - Updated : 5th August 2020
 *   - License : MIT [https://opensource.org/licenses/MIT]
 *
 * @param listTransformation
 * @text Transformation List
 * @type text
 * @default ------------------------------------
 *
 * @param boat__object
 * @parent listTransformation
 * @text Boat
 * @desc The graphic properties of the boat vehicle.
 * @type struct<transformOptions>
 *
 * @param ship__object
 * @parent listTransformation
 * @text Ship
 * @desc The graphic properties of the ship vehicle.
 * @type struct<transformOptions>
 *
 * @param airship__object
 * @parent listTransformation
 * @text Airship
 * @desc The graphic properties of the airship vehicle.
 * @type struct<transformOptions>
 *
 * @param pluginProperties
 * @text Plugin Properties
 * @type text
 * @default ------------------------------------
 *
 * @param gid
 * @parent pluginProperties
 * @text Global Identifier
 * @desc Global identification tag for internal use only. Do not change.
 * @default ossra-T27PNBvmQvf9GLsxqlYmOYIjx8GTsP
 */
// +===================================================|                        Structs |
// | [Plugin] Structs
// +====================================================================================+
 /*~struct~transformOptions:
 * @param file__string
 * @parent propertiesGraphics
 * @text File
 * @desc The graphic file used when driving the vehicle.
 * @type file
 * @dir img/characters/
 *
 * @param index__number
 * @parent propertiesGraphics
 * @text Index
 * @desc The character index of the graphic file.
 * @type number
 */
// +====================================================================================+



// +===================================================|                      Namespace |
// | [Global] Namespace
// +====================================================================================+

var Imported   = Imported       || {};
Imported.Ossra = Imported.Ossra || {};

var Ossra      = Ossra          || {};
Ossra.Plugin   = Ossra.Plugin   || {};



(function (pluginName, pluginVersion) {                                              // {

  'use strict';

  // +=================================================|                      Functions |
  // | [Plugin] Functions
  // +==================================================================================+

  // +----------------------------------------------------------------------------------+
  // | [Method] setNamespace
  // +----------------------------------------------------------------------------------+

  function setNamespace (namespace, namestring, value) {

    return namestring.split('.').reduce((parent, child, index, array) => {
      if (typeof parent[child] === 'undefined') {
        const length = index + 1 === array.length;
        const result = typeof value !== 'undefined';

        parent[child] = length && result ? value : { };
      }

      return parent[child];
    }, namespace);

  }; // Functions << setNamespace



  // +=================================================|                      Namespace |
  // | [Plugin] Namespace
  // +==================================================================================+

  // [Namespace] Imported
  setNamespace(Imported.Ossra, pluginName, pluginVersion);

  // [Namespace] Plugin
  const ossPlugin  = setNamespace(Ossra.Plugin, pluginName);

  const ossCode    = setNamespace(ossPlugin, 'Code');
  const ossData    = setNamespace(ossPlugin, 'Data');

  const ossDefault = setNamespace(ossData, 'Default');
  const ossConfig  = setNamespace(ossData, 'Config');



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
          let [_key, _type, _fnc] = key.split('__');
          let _def = defaults[_key];
          let _val = value === '' ? _def : value;

          if (_key && _type) {
            switch (_type) {
              case 'function':
                _val = ossFunc[_fnc].call(this, _val);
                break;
              case 'array':
                _val = value === '' ? [] : JSON.parse(_val);

                for (let i = 0; i < _val.length; i++) {
                  _val[i] = parseParameters(_val[i], _def[0]);
                }
              case 'string':
                break;
              default:
                _val = parseParameters(_val, _def);
                break;
            };

            this[_key] = _val;
            return;
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

      let parameters = getParameters(gid);
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

    ossDefault.plugin = {

      'boat':
      {
        'file': '',
        'index': 0
      },
      'ship':
      {
        'file': '',
        'index': 0
      },
      'airship':
      {
        'file': '',
        'index': 0
      },

    };

  // +----------------------------------------------------------------------------------+
  // | [Setup] Set Configuration
  // +----------------------------------------------------------------------------------+

    createConfig('ossra-T27PNBvmQvf9GLsxqlYmOYIjx8GTsP', ossDefault.plugin);

  })();                                                                              // }



  (function (_) {                                                                    // {

  // +=================================================|                   Game_Vehicle |
  // | [Plugin] Game_Vehicle
  // +==================================================================================+

    const _alias = setNamespace(ossCode, 'Alias.Game_Vehicle');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] getOn
  // +----------------------------------------------------------------------------------+

    _alias.getOn = _.prototype.getOn;

    _.prototype.getOn = function () {

      if (ossConfig.hasOwnProperty(this._type)) {
        var transform = ossConfig[this._type];

        if (transform.file !== '') {
          this.setImage(transform.file, transform.index);
        }
      }

      _alias.getOn.call(this);

    }; // Game_Vehicle << getOn

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] getOff
  // +----------------------------------------------------------------------------------+

    _alias.getOff = _.prototype.getOff;

    _.prototype.getOff = function () {

      var vehicle = this.vehicle();

      this.setImage(vehicle.characterName, vehicle.characterIndex);

      _alias.getOff.call(this);

    }; // Game_Vehicle << getOff

  })(Game_Vehicle);                                                                  // }



})('Character.TransformVehicle', 1.00);                                              // }



// |///////////////////////////////////| End of File |//////////////////////////////////|