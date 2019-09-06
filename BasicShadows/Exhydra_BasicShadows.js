// ╒══════════════════════════════════════════════════════════════════════════════════╕
// █▐▐  Basic Shadows
// ╞══════════════════════════════════════════════════════════════════════════════════╡
/*:
 *  @plugindesc [1.04] Adds basic shadows to characters, events, and vehicles.
 *  @author Exhydra
 *
 *  @param ─ Shadow Options
 *  @desc
 *  @default ───────────────
 *
 *  @param Basic Shadow
 *  @desc Use a generic shadow instead of a dynamic shadow.
 *  @default false
 *
 *  @param Scale Shadow
 *  @desc Adjust the scale of the shadow in relation to the distance from the source.
 *  @default true
 *
 *  @param Blur Shadow
 *  @desc Apply a blur filter on each shadow. May degrade performance when enabled.
 *  @default false
 *
 *  @param Blur Strength
 *  @desc The strength of the blur filter.
 *  @default 1.5
 *
 *  @param Blur Quality
 *  @desc The quality of the blur filter. Higher values may degrade performance.
 *  @default 1.5
 *
 *  @param Default Intensity
 *  @desc The default intensity of each shadow source. Value is in percentage.
 *  @default 100
 *
 *  @param Default Radius
 *  @desc The default radius of each shadow source. Value is in pixels.
 *  @default 240
 *
 *  @param Default Color
 *  @desc The default RGB color of each shadow source.
 *  @default 0,0,0
 *
 *  @param Ignore Leader
 *  @desc Do not generate a shadow for the party leader.
 *  @default false
 *
 *  @param Ignore Followers
 *  @desc Do not generate a shadow for any follower.
 *  @default false
 *
 *  @param Ignore Events
 *  @desc Do not generate a shadow for any event.
 *  @default false
 *
 *  @param Ignore Vehicles
 *  @desc Do not generate a shadow for any vehicle.
 *  @default true
 *
 *  @param ─ Vehicle Options
 *  @desc
 *  @default ───────────────
 *
 *  @param Boat Shadow Entity
 *  @desc Generate a shadow for the boat vehicle.
 *  @default false
 *
 *  @param Boat Shadow Offset
 *  @desc The x and y offset of the vehicle shadow.
 *  @default 0,0
 *
 *  @param Boat Shadow Anchor
 *  @desc The x and y anchor of the vehicle shadow.
 *  @default 0.5,1
 *
 *  @param Boat Shadow Source
 *  @desc Set the boat vehicle as a shadow source.
 *  @default false
 *
 *  @param Boat Shadow Intensity
 *  @desc The intensity the vehicle shadow. Value is in percentage.
 *  @default 100
 *
 *  @param Boat Shadow Radius
 *  @desc The radius around the vehicle in which to display a shadow.
 *  @default 240
 *
 *  @param Boat Shadow Flicker
 *  @desc The strength and delay of the vehicle shadow flicker.
 *  @default 0,0
 *
 *  @param Boat Shadow Color
 *  @desc The RGB color of the shadow cast by the vehicle, or other entities if vehicle is a source.
 *  @default 0,0,0
 *
 *  @param Ship Shadow Entity
 *  @desc Generate a shadow for the ship vehicle.
 *  @default false
 *
 *  @param Ship Shadow Offset
 *  @desc The x and y offset of the vehicle shadow.
 *  @default 0,0
 *
 *  @param Ship Shadow Anchor
 *  @desc The x and y anchor of the vehicle shadow.
 *  @default 0.5,1
 *
 *  @param Ship Shadow Source
 *  @desc Set the ship vehicle as a shadow source.
 *  @default false
 *
 *  @param Ship Shadow Intensity
 *  @desc The intensity the vehicle shadow. Value is in percentage.
 *  @default 100
 *
 *  @param Ship Shadow Radius
 *  @desc The radius around the vehicle in which to display a shadow.
 *  @default 240
 *
 *  @param Ship Shadow Flicker
 *  @desc The strength and delay of the vehicle shadow flicker.
 *  @default 0,0
 *
 *  @param Ship Shadow Color
 *  @desc The RGB color of the shadow cast by the vehicle, or other entities if vehicle is a source.
 *  @default 0,0,0
 *
 *  @param Airship Shadow Entity
 *  @desc Generate a shadow for the airship vehicle.
 *  @default false
 *
 *  @param Airship Shadow Offset
 *  @desc The x and y offset of the vehicle shadow.
 *  @default 0,0
 *
 *  @param Airship Shadow Anchor
 *  @desc The x and y anchor of the vehicle shadow.
 *  @default 0.5,1
 *
 *  @param Airship Shadow Source
 *  @desc Set the airship vehicle as a shadow source.
 *  @default false
 *
 *  @param Airship Shadow Intensity
 *  @desc The intensity the vehicle shadow. Value is in percentage.
 *  @default 100
 *
 *  @param Airship Shadow Radius
 *  @desc The radius around the vehicle in which to display a shadow.
 *  @default 240
 *
 *  @param Airship Shadow Flicker
 *  @desc The strength and delay of the vehicle shadow flicker.
 *  @default 0,0
 *
 *  @param Airship Shadow Color
 *  @desc The RGB color of the shadow cast by the vehicle, or other entities if vehicle is a source.
 *  @default 0,0,0
 *
 *  @param ─ Plugin
 *  @desc
 *  @default ───────────────
 *
 *  @param Plugin GID
 *  @desc Global identification tag for internal use only. Do not change.
 *  @default eXa-fwfDADghNfTcKRH
 *
 *  @help
 * ▄ Plugin                  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ ▄ ▄
 *
 *   ┌─ Version : 1.04
 *   ├─ Release : 27rd August 2016
 *   ├─ Updated : 7th  September 2016
 *   └─ License : Free for Commercial and Non-Commercial Usage
 *
 * ▄ Comment/Note Tags       ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ ▄ ▄
 *
 *        Place the following tag(s) into a comment or the 'note' box of an
 *   event or actor.
 *
 *   ▪ <bsNoShadow>
 *   │
 *   └     Disables the creation of a shadow for the actor or event.
 *
 *   <bsShadowOffset:xOffset,yOffset>
 *   │
 *   │     Set the x and y offset of the shadow.
 *   │
 *   ├─<required> xOffset
 *   ├ Value(s) ► Integer
 *   │
 *   ├─<required> yOffset
 *   └ Value(s) ► Integer
 *
 *   <bsShadowAnchor:xAnchor,yAnchor>
 *   │
 *   │     Set the x and y anchor of the shadow.
 *   │
 *   ├─<required> xAnchor
 *   ├ Value(s) ► Integer
 *   │
 *   ├─<required> yAnchor
 *   └ Value(s) ► Integer
 *
 *   ▪ <bsShadowSource>
 *   ▪ <bsShadowSource:intensity,radius,flickerStr,flickerDelay,red,green,blue>
 *   │
 *   │     Creates a shadow source using the actor or event.
 *   │
 *   ├─<optional> intensity
 *   ├ Value(s) ► 0 to 100
 *   ├ Note     ► Sets the opacity of the shadows created by the source.
 *   │
 *   ├─<optional> radius
 *   ├ Value(s) ► Integer
 *   ├ Note     ► The radius around the source in which to display a shadow.
 *   │            Value is in pixels.
 *   │
 *   ├─<optional> flickerStr
 *   ├ Value(s) ► Integer
 *   ├ Note     ► Sets the strength of the flicker.
 *   │
 *   ├─<optional> flickerDelay
 *   │ Value(s) ► Integer
 *   ├ Note     ► Sets the delay between flickering. Value is in frames.
 *   │
 *   ├─<optional> red,green,blue
 *   ├ Value(s) ► 0 to 255
 *   └ Note     ► Sets the RGB color of the shadows created by the source.
 *
 *   <bsShadowIntensity:intensity>
 *   │
 *   │     Set the intensity of the of the shadows created by the source.
 *   │
 *   ├─<required> intensity
 *   └ Value(s) ► 0 to 100
 *
 *   <bsShadowRadius:radius>
 *   │
 *   │     Set the radius around the source in which to display a shadow.
 *   │
 *   ├─<required> radius
 *   └ Value(s) ► Integer
 *
 *   <bsShadowFlicker:strength,delay>
 *   │
 *   │     Set the flicker of the of the shadows created by the source.
 *   │
 *   ├─<required> strength
 *   ├ Value(s) ► Integer
 *   │
 *   ├─<required> delay
 *   ├ Value(s) ► Integer
 *   └ Note     ► Sets the delay between flickering. Value is in frames.
 *
 *   <bsShadowColor:red,green,blue>
 *   │
 *   │     Set the RGB color of the of the shadows created by the source.
 *   │
 *   ├─<required> red
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─<required> green
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─<required> blue
 *   └ Value(s) ► 0 to 255
 *
 *   <bsShadowRotation:angle>
 *   │
 *   │     Set the angle of the of the shadows created by the source.
 *   │
 *   ├─<required> angle
 *   ├ Value(s) ► 0 to 360
 *
 * ▄ Plugin Commands         ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ ▄ ▄
 *
 *   ▪ exaBasicShadows showSource targetId boolean
 *   │
 *   │     Set visibility of all shadows managed by the source.
 *   │
 *   ├─<required> targetId
 *   ├ Value(s) ► -1 (player), 1 and above (event), exaP (entire party),
 *   │            exaF:id (follower), exaV:id (vehicle)
 *   │
 *   ├─<required> boolean
 *   └ Value(s) ► true, false
 *
 *   ▪ exaBasicShadows addSource targetId intensity radius flickerStr,flickerDelay red,green,blue
 *   │
 *   │     Create a shadow source.
 *   │
 *   ├─<required> targetId
 *   ├ Value(s) ► -1 (player), 1 and above (event), exaP (entire party),
 *   │            exaF:id (follower), exaV:id (vehicle)
 *   │
 *   ├─<required> intensity
 *   ├ Value(s) ► 0 to 100
 *   │
 *   ├─<required> flickerStr
 *   ├ Value(s) ► Integer
 *   │
 *   ├─<required> flickerDelay
 *   ├ Value(s) ► Integer
 *   ├ Note     ► Sets the delay between flickering. Value is in frames.
 *   │
 *   ├─<required> red
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─<required> green
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─<required> blue
 *   └ Value(s) ► 0 to 255
 *
 *   ▪ exaBasicShadows removeSource targetId
 *   │
 *   │     Remove a shadow source.
 *   │
 *   ├─<required> targetId
 *   ├ Value(s) ► -1 (player), 1 and above (event), exaP (entire party),
 *   └            exaF:id (follower), exaV:id (vehicle)
 *
 *   ▪ exaBasicShadows setSource intensity targetId intensity
 *   │
 *   │     Set the intensity of the of the shadows created by the source.
 *   │
 *   ├─<required> targetId
 *   ├ Value(s) ► -1 (player), 1 and above (event), exaP (entire party),
 *   │            exaF:id (follower), exaV:id (vehicle)
 *   │
 *   ├─<required> intensity
 *   └ Value(s) ► 0 to 100
 *
 *   ▪ exaBasicShadows setSource radius targetId radius
 *   │
 *   │     Set the radius around the source in which to display a shadow.
 *   │
 *   ├─<required> targetId
 *   ├ Value(s) ► -1 (player), 1 and above (event), exaP (entire party),
 *   │            exaF:id (follower), exaV:id (vehicle)
 *   │
 *   ├─<required> radius
 *   └ Value(s) ► Integer
 *
 *   ▪ exaBasicShadows setSource flicker targetId strength,delay
 *   │
 *   │     Set the flicker of the of the shadows created by the source.
 *   │
 *   ├─<required> targetId
 *   ├ Value(s) ► -1 (player), 1 and above (event), exaP (entire party),
 *   │            exaF:id (follower), exaV:id (vehicle)
 *   │
 *   ├─<required> strength
 *   ├ Value(s) ► Integer
 *   │
 *   ├─<required> delay
 *   ├ Value(s) ► Integer
 *   └ Note     ► Sets the delay between flickering. Value is in frames.
 *
 *   ▪ exaBasicShadows setSource color targetId red,green,blue
 *   │
 *   │     Set the RGB color of the of the shadows created by the source.
 *   │
 *   ├─<required> targetId
 *   ├ Value(s) ► -1 (player), 1 and above (event), exaP (entire party),
 *   │            exaF:id (follower), exaV:id (vehicle)
 *   │
 *   ├─<required> red
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─<required> green
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─<required> blue
 *   └ Value(s) ► 0 to 255
 *
 *   ▪ exaBasicShadows showShadow targetId boolean
 *   │
 *   │     Set visibility of the target's shadow.
 *   │
 *   ├─<required> targetId
 *   ├ Value(s) ► -1 (player), 1 and above (event), exaP (entire party),
 *   │            exaF:id (follower), exaV:id (vehicle)
 *   │
 *   ├─<required> boolean
 *   └ Value(s) ► true, false
 *
 *   ▪ exaBasicShadows addShadow targetId xOffset,yOffset xAnchor,yAnchor red,green,blue
 *   │
 *   │     Create and display a shadow for the target.
 *   │
 *   ├─<required> targetId
 *   ├ Value(s) ► -1 (player), 1 and above (event), exaP (entire party),
 *   │            exaF:id (follower), exaV:id (vehicle)
 *   │
 *   ├─<required> xOffset
 *   ├ Value(s) ► Integer
 *   │
 *   ├─<required> yOffset
 *   ├ Value(s) ► Integer
 *   │
 *   ├─<required> xAnchor
 *   ├ Value(s) ► Integer
 *   │
 *   ├─<required> yAnchor
 *   ├ Value(s) ► Integer
 *   │
 *   ├─<required> red
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─<required> green
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─<required> blue
 *   └ Value(s) ► 0 to 255
 *
 *   ▪ exaBasicShadows removeShadow targetId
 *   │
 *   │     Remove the shadow of the target.
 *   │
 *   ├─<required> targetId
 *   ├ Value(s) ► -1 (player), 1 and above (event), exaP (entire party),
 *   └            exaF:id (follower), exaV:id (vehicle)
 *
 *   ▪ exaBasicShadows setShadow offset targetId xOffset,yOffset
 *   │
 *   │     Set the shadow offset of the target.
 *   │
 *   ├─<required> targetId
 *   ├ Value(s) ► -1 (player), 1 and above (event), exaP (entire party),
 *   │            exaF:id (follower), exaV:id (vehicle)
 *   │
 *   ├─<required> xOffset
 *   ├ Value(s) ► Integer
 *   │
 *   ├─<required> yOffset
 *   └ Value(s) ► Integer
 *
 *   ▪ exaBasicShadows setShadow anchor targetId xAnchor,yAnchor
 *   │
 *   │     Set the shadow anchor of the target.
 *   │
 *   ├─<required> targetId
 *   ├ Value(s) ► -1 (player), 1 and above (event), exaP (entire party),
 *   │            exaF:id (follower), exaV:id (vehicle)
 *   │
 *   ├─<required> xAnchor
 *   ├ Value(s) ► Integer
 *   │
 *   ├─<required> yAnchor
 *   └ Value(s) ► Integer
 *
 *   ▪ exaBasicShadows setShadow color targetId red,green,blue
 *   │
 *   │     Set the shadow color of the target.
 *   │
 *   ├─<required> targetId
 *   ├ Value(s) ► -1 (player), 1 and above (event), exaP (entire party),
 *   │            exaF:id (follower), exaV:id (vehicle)
 *   │
 *   ├─<required> red
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─<required> green
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─<required> blue
 *   └ Value(s) ► 0 to 255
 *
 */
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Plugin
// ╘══════════════════════════════════════════════════════════════════════════════════╛

var Imported = Imported || {};
Imported.exaBasicShadows = 1.04;

var EXA = EXA     || {};
EXA.BS  = EXA.BS  || {};

(function() {

  'use strict';

  var exaParams = $plugins.filter(function(plugin) {
    return plugin.parameters['Plugin GID'] == 'eXa-fwfDADghNfTcKRH';
  })[0].parameters;

  EXA.BS._useBasicShadow      = exaParams['Basic Shadow']     === 'true';
  EXA.BS._useScaleShadow      = exaParams['Scale Shadow']     === 'true';
  EXA.BS._useBlurShadow       = exaParams['Blur Shadow']      === 'true';
  EXA.BS._useBlurStrength     = exaParams['Blur Strength']               || 1.5;
  EXA.BS._useBlurQuality      = exaParams['Blur Quality']                || 1.5;
  EXA.BS._useDefaultIntensity = exaParams['Default Intensity'] * 0.01    || 1.0;
  EXA.BS._useDefaultRadius    = exaParams['Default Radius']              || 240;
  var tmpDefaultColor         = exaParams['Default Color']               || '0,0,0';
  EXA.BS._useDefaultColor     = tmpDefaultColor.concat(',255').split(',').map(Number);
  EXA.BS._overrideRotation    = exaParams['Override Rotation'] === 'true';
  EXA.BS._useFixedRotation    = Number(exaParams['Shadow Rotation']) * Math.PI / 180;
  EXA.BS._ignoreLeader        = exaParams['Ignore Leader']     === 'true';
  EXA.BS._ignoreFollowers     = exaParams['Ignore Followers']  === 'true';
  EXA.BS._ignoreEvents        = exaParams['Ignore Events']     === 'true';
  EXA.BS._ignoreVehicles      = exaParams['Ignore Vehicles']   === 'true';

  EXA.BS._vehicles = [{}, {}, {}];

  Object.keys(exaParams).forEach(function(key) {
    if ((/(boat|ship|airship)\s(\w*)\s?(\w*)/i).test(key)) {
      var tmpVehicleId = ['Boat', 'Ship', 'Airship'].indexOf(RegExp.$1);
      var tmpPropName  = '_bs' + RegExp.$2 + RegExp.$3;
      var tmpPropCheck = (/^(-?\d*\.?\d*)\,?\s?(-?\d*\.?\d*)$/i).test(exaParams[key]);

      if (isNaN(exaParams[key])) {
        if (tmpPropName.includes('Flicker')) {
          var tmpData = exaParams[key].trim().split(',').map(Number);
          var tmpPropValue = { enabled: tmpData[0] > 0, strength: tmpData[0], delay: tmpData[1] };
        } else if (tmpPropName.includes('Color')) {
          var tmpPropValue = exaParams[key].concat(',255').trim().split(',').map(Number);
        } else if (tmpPropCheck) {
          var tmpPropValue = new Point(Number(RegExp.$1), Number(RegExp.$2));
        } else {
          var tmpPropValue = exaParams[key] === 'true';
        }
      } else {
        if (tmpPropName.includes('Intensity')) {
          var tmpPropValue = Number(exaParams[key]) * 0.01;
        } else {
          var tmpPropValue = Number(exaParams[key]);
        }

      }

      EXA.BS._vehicles[tmpVehicleId][tmpPropName] = tmpPropValue;
    }
  });

})();

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Number
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] between
// └──────────────────────────────────────────────────────────────────────────────────┘

if (typeof Number.prototype.between !== 'function') {
  Number.prototype.between = function(a, b) {

    var min = Math.min(a, b),
        max = Math.max(a, b);

    return this > min && this < max;

  };
};

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_Interpreter
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] pluginCommand
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.BS.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args) {

	EXA.BS.Game_Interpreter_pluginCommand.call(this, command, args);

	if (command === 'exaBasicShadows') {

    // Show/Hide Source
    if (args[0] === 'showSource') {
      var target = this.character(args[1]);
      var toggle = (args[2] === 'true');

      $gameMap.shadowData().controlShadowSet(target, '_visible', toggle);
    }

    // Add Source
    if (args[0] === 'addSource') {
      var target = this.character(args[1]);

      if (args[2]) {
        var intensity = Number(args[2]) * 0.01;

        target._bsShadowIntensity = intensity;
      }
      if (args[3]) {
        var radius = Number(args[3]);

        target._bsShadowRadius = radius;
      }
      if (args[4]) {
        var flicker = args[4].split(',').map(Number);

        target._bsShadowFlicker = { enabled: flicker[0] > 0, strength: flicker[0], delay: flicker[1] };
      }
      if (args[5]) {
        var color = args[5].split(',').map(Number);
        color.push(255);

        target._bsShadowColor = color.length == 4 ? color : null;
      }

      target._bsShadowSource = true;
      $gameMap.shadowData().setupEntity(target);
    }

    // Remove Source
    if (args[0] === 'removeSource') {
      var target = this.character(args[1]);

      target._bsShadowSource = false;
      $gameMap.shadowData().setupEntity(target);
      target.clearShadowSettings();
    }

    if (args[0] === 'setSource') {
      // Set Source Intensity
      if (args[1] === 'intensity') {
        var target    = this.character(args[2]);
        var intensity = Number(args[3]) * 0.01;

        target._bsShadowIntensity = intensity;
      // Set Source Radius
      } else if (args[1] === 'radius') {
        var target = this.character(args[2]);
        var radius = Number(args[3]);

        target._bsShadowRadius = radius;
      // Set Source Flicker
      } else if (args[1] === 'flicker') {
        var target  = this.character(args[2]);
        var flicker = args[3].split(',').map(Number);

        target._bsShadowFlicker = { enabled: flicker[0] > 0, strength: flicker[0], delay: flicker[1] };
      // Set Source Color
      } else if (args[1] === 'color') {
        var target = this.character(args[2]);
        var color  = args[3].split(',').map(Number);
        color.push(255);

        target._bsShadowColor = color.length == 4 ? color : null;
      }
    }

    // Show/Hide Shadow
    if (args[0] === 'showShadow') {
      var target = this.character(args[1]);
      var toggle = (args[2] === 'true');

      target._bsShadowVisible = toggle;
    }

    // Add Shadow
    if (args[0] === 'addShadow') {
      var target = this.character(args[1]);

      if (args[2]) {
        var offset = args[3].split(',').map(Number);

        target._bsShadowOffset = new Point(offset[0], offset[1]);
      }
      if (args[3]) {
        var anchor = args[4].split(',').map(Number);

        target._bsShadowAnchor = new Point(anchor[0], anchor[1]);
      }
      if (args[4]) {
        var color = args[2].split(',').map(Number);
        color.push(255);

        target._bsShadowColor = color.length == 4 ? color : null;
      }

      target._bsShadowEntity = true;
      $gameMap.shadowData().setupEntity(target);
    }

    // Remove Shadow
    if (args[0] === 'removeShadow') {
      var target = this.character(args[1]);

      target._bsShadowEntity = false;
      $gameMap.shadowData().setupEntity(target);
      target.clearShadowSettings();
    }

    if (args[0] === 'setShadow') {
      // Set Shadow Offset
      if (args[1] === 'offset') {
        var target = this.character(args[2]);
        var offset = args[3].split(',').map(Number);

        target._bsShadowOffset = new Point(offset[0], offset[1]);
      // Set Shadow Anchor
      } else if (args[1] === 'anchor') {
        var target = this.character(args[2]);
        var anchor = args[3].split(',').map(Number);

        target._bsShadowAnchor = new Point(anchor[0], anchor[1]);
      // Set Shadow Color
      } else if (args[1] === 'color') {
        var target = this.character(args[2]);
        var color  = args[3].split(',').map(Number);
        color.push(255);

        target._bsShadowColor = color.length == 4 ? color : null;
      }
    }

	}

}; // Game_Interpreter ‹‹ pluginCommand

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] character
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.BS.Game_Interpreter_character = Game_Interpreter.prototype.character;

Game_Interpreter.prototype.character = function(param) {

	if (isNaN(param)) {
    var tmpMatch = param.match(/(exaP|exaF|exaV):*(\d*)/i);
    if (tmpMatch) {
      var tmpFunct = function(value) { return (isNaN(value) ? value : Number(value)) };
      tmpMatch = tmpMatch.map(tmpFunct);
			switch (tmpMatch[1]) {
			case 'exaP':
        var tmpParty = $gamePlayer._followers._data.clone();
        tmpParty.push($gamePlayer);

        return tmpParty;
				break;
			case 'exaF':
        var tmpFollower = $gamePlayer._followers.follower(tmpMatch[2]);

        return tmpFollower;
				break;
			case 'exaV':
        var tmpVehicle = $gameMap.vehicles()[tmpMatch[2]];

        return tmpVehicle;
				break;
			}
    }
  }

	return EXA.BS.Game_Interpreter_character.call(this, param);

}; // Game_Interpreter ‹‹ character

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_ShadowBase
// ╘══════════════════════════════════════════════════════════════════════════════════╛

function Game_ShadowBase() {

  this.initialize.apply(this, arguments);

}; // Object ‹‹ Game_ShadowBase

Game_ShadowBase.prototype = Object.create(Object.prototype);
Game_ShadowBase.prototype.constructor = Game_ShadowBase;

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] initialize
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowBase.prototype.initialize = function() {

  this._queue        = [];
  this._refresh      = false;

}; // Game_ShadowBase ‹‹ initialize

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] getIdByName
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowBase.prototype.getIdByEntity = function(entity) {

  var tmpConstructName = entity.constructor.name;

  // Player
  if (tmpConstructName == 'Game_Player') {
    return -100;
  // Followers
  } else if (tmpConstructName == 'Game_Follower') {
    return -Math.abs(200 + (entity._memberIndex - 1));
  // Events
  } else if (tmpConstructName == 'Game_Event') {
    return entity._eventId;
  // Vehicles
  } else if (tmpConstructName == 'Game_Vehicle') {
    if (entity.isBoat()) {
      return -300;
    } else if (entity.isShip()) {
      return -301;
    } else if (entity.isAirship()) {
      return -302;
    }
  }
  return null;

}; // Game_ShadowBase ‹‹ getIdByName

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] getEntityById
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowBase.prototype.getEntityById = function(id) {

  // Player
  if (id == -100) {
    return $gamePlayer;
  // Followers
  } else if (id.between(-199, -251)) {
    return $gamePlayer.followers()._data[Math.abs(id) - 200];
  // Events
  } else if (id.between(0, 1000)) {
    return $gameMap.event(id);
  // Vehicles
  } else if (id.between(-299, -303)) {
    return $gameMap.vehicles()[[Math.abs(id) - 300]];
  }
  return null;

}; // Game_ShadowBase ‹‹ getEntityById

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] addToQueue
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowBase.prototype.addToQueue = function(data) {

  if (this._queue.indexOf(data) == -1) {
    this._queue.push(data);
    this._refresh = true;
  }

}; // Game_ShadowBase ‹‹ addToQueue

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] resetQueue
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowBase.prototype.resetQueue = function(data) {

  this._queue   = [];
  this._refresh = false;

}; // Game_ShadowBase ‹‹ resetQueue

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_ShadowSet
// ╘══════════════════════════════════════════════════════════════════════════════════╛

function Game_ShadowSet() {

  this.initialize.apply(this, arguments);

}; // Object ‹‹ Game_ShadowSet

Game_ShadowSet.prototype = Object.create(Game_ShadowBase.prototype);
Game_ShadowSet.prototype.constructor = Game_ShadowSet;

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] initialize
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowSet.prototype.initialize = function(source) {

  Game_ShadowBase.prototype.initialize.call(this);

  this._shadowSource   = source;
  this._shadowEntities = [];

  this._destroy        = false;
  this._visible        = true;

}; // Game_ShadowSet ‹‹ initialize

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] entities
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowSet.prototype.entities = function() {

  var tmpEntities = [];

  this._shadowEntities.forEach(function(entity) {
    tmpEntities.push(this.getEntityById(entity));
  }, this);

  return tmpEntities;

}; // Game_ShadowSet ‹‹ entities

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] source
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowSet.prototype.source = function() {

  return this.getEntityById(this._shadowSource);

}; // Game_ShadowSet ‹‹ source

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_ShadowData
// ╘══════════════════════════════════════════════════════════════════════════════════╛

function Game_ShadowData() {

  this.initialize.apply(this, arguments);

} // Object ‹‹ Game_ShadowData

Game_ShadowData.prototype = Object.create(Game_ShadowBase.prototype);
Game_ShadowData.prototype.constructor = Game_ShadowData;

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] initialize
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowData.prototype.initialize = function() {

  Game_ShadowBase.prototype.initialize.call(this);

  this._registeredSources  = [];
  this._registeredEntities = [];
  this._shadowSets         = [];

  this._mapId = -1;

}; // Game_ShadowData ‹‹ initialize

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] registerEntities
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowData.prototype.setup = function(mapId) {

  this.setMapId(mapId);
  this.clearEntities();
  this.registerEntities();
  this.createShadowSets();

}; // Game_ShadowData ‹‹ registerEntities

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] setMapId
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowData.prototype.setMapId = function(mapId) {

  this._mapId = mapId;

}; // Game_ShadowData ‹‹ setMapId

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] clearEntities
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowData.prototype.clearEntities = function() {

  this._registeredEntities = [];
  this._registeredSources  = [];
  this._shadowSets         = [];

  this.resetQueue();

}; // Game_ShadowData ‹‹ clearEntities

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] registerEntities
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowData.prototype.registerEntities = function(entities) {

  var tmpEntities = this.allMapEntities();

  for (var i = 0; i < tmpEntities.length; i++) {
    var tmpEntityId = this.getIdByEntity(tmpEntities[i]);

    if (tmpEntityId) {
      tmpEntities[i].setupShadowSettings();

      if (tmpEntities[i]._bsShadowSource) {
        this._registeredSources.push(tmpEntityId);
      }

      if (tmpEntities[i]._bsShadowEntity) {
        this._registeredEntities.push(tmpEntityId);
      }
    }
  }

}; // Game_ShadowData ‹‹ registerEntities

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] createShadowSets
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowData.prototype.createShadowSets = function() {

  this._registeredSources.forEach(function(source) {
    var tmpShadowSet = new Game_ShadowSet(source);
    tmpShadowSet._shadowEntities = this._registeredEntities.clone();

    this._shadowSets.push(tmpShadowSet);
  }, this);

}; // Game_ShadowData ‹‹ createShadowSets

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] setupEntity
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowData.prototype.setupEntity = function(entity) {

  var tmpEntityId = this.getIdByEntity(entity);
  var tmpSourceIn = this._registeredSources.indexOf(tmpEntityId);
  var tmpEntityIn = this._registeredEntities.indexOf(tmpEntityId);

  if (tmpEntityId) {
    // Add Source
    if (entity._bsShadowSource && tmpSourceIn == -1) {
      this._registeredSources.push(tmpEntityId);

      var tmpShadowSet = new Game_ShadowSet(tmpEntityId);
      tmpShadowSet._shadowEntities = this._registeredEntities.clone();

      this.addToQueue(tmpShadowSet);
      this._shadowSets.push(tmpShadowSet);
    // Remove Source
    } else if (!entity._bsShadowSource && tmpSourceIn > -1) {
      this._registeredSources.splice(tmpSourceIn, 1);

      this._shadowSets.forEach(function(shadowSet) {
        if (shadowSet._shadowSource == tmpEntityId) shadowSet._destroy = true;
      });

      this._shadowSets = this._shadowSets.filter(function(shadowSet) {
        return shadowSet._shadowSource != tmpEntityId;
      });
    }

    // Add Entity
    if (entity._bsShadowEntity && tmpEntityIn == -1) {
      this._registeredEntities.push(tmpEntityId);

      this._shadowSets.forEach(function(shadowSet) {
        shadowSet._shadowEntities.push(tmpEntityId);

        shadowSet.addToQueue(tmpEntityId);
      });
    // Remove Entity
    } else if (!entity._bsShadowEntity && tmpEntityIn > -1) {
      this._registeredEntities.splice(tmpEntityIn, 1);

      this._shadowSets.forEach(function(shadowSet) {
        tmpEntityIn = shadowSet._shadowEntities.indexOf(tmpEntityId);

        shadowSet._shadowEntities.splice(tmpEntityIn, 1);
      });
    }
  }

}; // Game_ShadowData ‹‹ setupEntity

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] allMapEntities
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowData.prototype.allMapEntities = function() {

  var tmpEntities = new Array();

  if (!EXA.BS._ignoreLeader) {
    tmpEntities.push($gamePlayer);
  }

  if (!EXA.BS._ignoreFollowers) {
    $gamePlayer.followers().forEach(function(e) { if (e) tmpEntities.push(e) });
  }

  if (!EXA.BS._ignoreEvents) {
    $gameMap.events().forEach(function(e)       { if (e) tmpEntities.push(e) });
  }

  if (!EXA.BS._ignoreVehicles) {
    $gameMap.vehicles().forEach(function(e)     { if (e) tmpEntities.push(e) });
  }

  return tmpEntities;

}; // Game_ShadowData ‹‹ allMapEntities

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] showShadowSet
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowData.prototype.controlShadowSet = function(entity, prop, value) {

  var tmpEntityId = this.getIdByEntity(entity);
  var tmpSourceIn = this._registeredSources.indexOf(tmpEntityId);

  var tmpShadowSets = this._shadowSets.forEach(function(shadowSet) {
    if (shadowSet._shadowSource == tmpEntityId) {
      shadowSet[prop] = value;
    }
  });

}; // Game_ShadowData ‹‹ showShadowSet

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] isReady
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_ShadowData.prototype.isReady = function() {

  return this._mapId == $gameMap.mapId();

}; // Game_ShadowData ‹‹ isReady

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_Map
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] initialize
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.BS.Game_Map_initialize = Game_Map.prototype.initialize;

Game_Map.prototype.initialize = function() {

  this._bsShadowData = new Game_ShadowData();

  EXA.BS.Game_Map_initialize.call(this);

}; // Game_Map ‹‹ initialize

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] setup
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.BS.Game_Map_setup = Game_Map.prototype.setup;

Game_Map.prototype.setup = function(mapId) {

  EXA.BS.Game_Map_setup.call(this, mapId);

  if (!this.shadowData().isReady()) {
    this.shadowData().setup(mapId);
  }

}; // Game_Map ‹‹ setup

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] shadowData
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Map.prototype.shadowData = function() {

  return this._bsShadowData;

}; // Game_Map ‹‹ shadowData

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_CharacterBase
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] initMembers
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.BS.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;

Game_CharacterBase.prototype.initMembers = function() {

  EXA.BS.Game_CharacterBase_initMembers.call(this);

  this.clearShadowSettings();

}; // Game_CharacterBase ‹‹ initMembers

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] clearShadowSettings
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_CharacterBase.prototype.clearShadowSettings = function() {

  this._bsShadowEntity     = false;
  this._bsShadowSource     = false;
  this._bsShadowVisible    = true;
  this._bsShadowIntensity  = EXA.BS._useDefaultIntensity;
  this._bsShadowRadius     = EXA.BS._useDefaultRadius;
  this._bsShadowFlicker    = { enabled: false, strength: 0, delay: 0 };
  this._bsShadowOffset     = new Point();
  this._bsShadowAnchor     = new Point(0.5, 1);
  this._bsShadowColor      = null;
  this._bsOverrideRotation = false;
  this._bsShadowRotation   = 0;

}; // Game_CharacterBase ‹‹ clearShadowSettings

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] setupShadowSettings
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_CharacterBase.prototype.setupShadowSettings = function() {

  this.clearShadowSettings();
  this.parseShadowSettings();

}; // Game_CharacterBase ‹‹ setupShadowSettings

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] parseShadowSettings
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_CharacterBase.prototype.parseShadowSettings = function(data) {

  switch (this.constructor.name) {
    case 'Game_Player':
      if ($gameParty.leader()) {
        var tmpSettings = $gameParty.leader().actor().note;
      }
      break;
    case 'Game_Follower':
      if ($gameParty.members()[this._memberIndex]) {
        var tmpSettings = $gameParty.members()[this._memberIndex].actor().note;
      }
      break;
    case 'Game_Event':
      if (this.event()) {
        var notes    = this.event().note;
        var comments = new String();

        if (this.page()) {
          var comments = this.page().list.filter(function(list) {
            return list.code === 108 || list.code === 408;
          });
          comments = comments.map(function(list) {
            return list.parameters;
          });
        }

        var tmpSettings = comments.toString().concat(notes);
      }
      break;
    case 'Game_Vehicle':
      if (this.isBoat()) {
        Object.keys(EXA.BS._vehicles[0]).forEach(function(key) {
          this[key] = EXA.BS._vehicles[0][key];
        }, this);
      } else if (this.isShip()) {
        Object.keys(EXA.BS._vehicles[1]).forEach(function(key) {
          this[key] = EXA.BS._vehicles[1][key];
        }, this);
      } else if (this.isAirship()) {
        Object.keys(EXA.BS._vehicles[2]).forEach(function(key) {
          this[key] = EXA.BS._vehicles[2][key];
        }, this);
      }
      return;
      break;
    default:
      var tmpSettings = '';
      break;
  }

  this._bsShadowSource = (/<bsShadowSource:?([0-9,]*?)>/i).test(tmpSettings);

  if (this._bsShadowSource) {
    if (RegExp.$1) {
      var tmpShadow = RegExp.$1.split(',').map(Number);
      var tmpLength = tmpShadow.length;

      if (tmpLength > 0) this._bsShadowIntensity = tmpShadow[0] * 0.01;
      if (tmpLength > 1) this._bsShadowRadius    = tmpShadow[1];
      if (tmpLength > 2) {
        this._bsShadowFlicker.strength = tmpShadow[2];
        this._bsShadowFlicker.enabled  = tmpShadow[2] > 0;
      }
      if (tmpLength > 3) this._bsShadowFlicker.delay = tmpShadow[3];
      if (tmpLength > 6) {
        this._bsShadowColor = [tmpShadow[4], tmpShadow[5], tmpShadow[6]];
        this._bsShadowColor.push(255);
      }
    }

    if ((/<bsShadowIntensity:(\d+)>/i).test(tmpSettings)) {
      this._bsShadowIntensity = Number(RegExp.$1) * 0.01;
    }

    if ((/<bsShadowRadius:(\d+)>/i).test(tmpSettings)) {
      this._bsShadowRadius = Number(RegExp.$1);
    }

    if ((/<bsShadowFlicker:(\d+(?:,\d+)*)>/i).test(tmpSettings)) {
      var tmpFlicker = RegExp.$1.split(',').map(Number);

      this._bsShadowFlicker.strength = tmpFlicker[0];
      this._bsShadowFlicker.delay    = tmpFlicker[1];
      this._bsShadowFlicker.enabled  = tmpFlicker[0] > 0;
    }

    if ((/<bsShadowColor:(\d+(?:,\d+)*)>/i).test(tmpSettings)) {
      this._bsShadowColor = RegExp.$1.split(',').map(Number);
      this._bsShadowColor.push(255);
    }

    if ((/<bsShadowRotation:(\d+)>/i).test(tmpSettings)) {
      this._bsShadowRotation   = Number(RegExp.$1) * Math.PI / 180
      this._bsOverrideRotation = true;
    }
  }

  this._bsShadowEntity = this._bsShadowSource ? false : !(/<bsNoShadow>/i).test(tmpSettings);

  if (this._bsShadowEntity) {
    if ((/<bsShadowOffset:(-?\d*\.?\d*)\,?\s?(-?\d*\.?\d*)>/i).test(tmpSettings)) {
      this._bsShadowOffset.x = Number(RegExp.$1) || 0;
      this._bsShadowOffset.y = Number(RegExp.$2) || 0;
    }

    if ((/<bsShadowAnchor:(-?\d*\.?\d*)\,?\s?(-?\d*\.?\d*)>/i).test(tmpSettings)) {
      this._bsShadowAnchor.x = Number(RegExp.$1) || 0.5;
      this._bsShadowAnchor.y = Number(RegExp.$2) || 1;
    }

    if ((/<bsShadowColor:(\d+(?:,\d+)*)>/i).test(tmpSettings)) {
      this._bsShadowColor = RegExp.$1.split(',').map(Number);
      this._bsShadowColor.push(255);
    }
  }

}; // Game_CharacterBase ‹‹ parseShadowSettings

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] setupShadowEntity
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_CharacterBase.prototype.setupShadowEntity = function() {

  $gameMap.shadowData().setupEntity(this);

}; // Game_CharacterBase ‹‹ setupShadowEntity

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_Player
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] refresh
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.BS.Game_Player_refresh = Game_Player.prototype.refresh;

Game_Player.prototype.refresh = function() {

  EXA.BS.Game_Player_refresh.call(this);

  if ($gameMap.shadowData().isReady()) {
    this.setupShadowSettings();
    this.setupShadowEntity();
  }

}; // Game_Player ‹‹ refresh

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_Follower
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] refresh
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.BS.Game_Follower_refresh = Game_Follower.prototype.refresh;

Game_Follower.prototype.refresh = function() {

  EXA.BS.Game_Follower_refresh.call(this);

    if ($gameMap.shadowData().isReady()) {
      this.setupShadowSettings();
      this.setupShadowEntity();
    }

}; // Game_Follower ‹‹ refresh

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_Vehicle
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] refresh
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.BS.Game_Vehicle_refresh = Game_Vehicle.prototype.refresh;

Game_Vehicle.prototype.refresh = function() {

  EXA.BS.Game_Vehicle_refresh.call(this);

  if ($gameMap.shadowData().isReady()) {
    this.setupShadowSettings();
    this.setupShadowEntity();
  }

}; // Game_Vehicle ‹‹ refresh

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_Event
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] setupPageSettings
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.BS.Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;

Game_Event.prototype.setupPageSettings = function() {

  EXA.BS.Game_Event_setupPageSettings.call(this);

  if ($gameMap.shadowData().isReady()) {
    this.setupShadowSettings();
    this.setupShadowEntity();
  }

}; // Game_Event ‹‹ setupPageSettings

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Spriteset_Shadows
// ╘══════════════════════════════════════════════════════════════════════════════════╛

function Spriteset_Shadows() {
    this.initialize.apply(this, arguments);
}

Spriteset_Shadows.prototype = Object.create(Sprite.prototype);
Spriteset_Shadows.prototype.constructor = Spriteset_Shadows;

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] initialize
// └──────────────────────────────────────────────────────────────────────────────────┘

Spriteset_Shadows.prototype.initialize = function() {

  Sprite.prototype.initialize.call(this);

  this.z = 0;
  this.setFrame(0, 0, Graphics.width, Graphics.height);
  this.shadowData = $gameMap.shadowData();

}; // Spriteset_Shadows ‹‹ initialize

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] update
// └──────────────────────────────────────────────────────────────────────────────────┘

Spriteset_Shadows.prototype.update = function() {

  Sprite.prototype.update.call(this);

  this.updateSetQueue();

}; // Spriteset_Shadows ‹‹ update

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateSetQueue
// └──────────────────────────────────────────────────────────────────────────────────┘

Spriteset_Shadows.prototype.updateSetQueue = function() {

  if (this.shadowData._refresh) {
    this.shadowData._queue.forEach(function(shadowSet) {
      var tmpSetSprite = new Spriteset_ShadowSet(shadowSet);

      shadowSet.entities().forEach(function(entity) {
        tmpSetSprite.addChild(new Sprite_EntityShadow(entity, shadowSet.source()));
      }, this);

      this.addChild(tmpSetSprite);
    }, this);
    this.shadowData.resetQueue();
  }

}; // Spriteset_Shadows ‹‹ updateSetQueue

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Spriteset_ShadowSet
// ╘══════════════════════════════════════════════════════════════════════════════════╛

function Spriteset_ShadowSet() {

    this.initialize.apply(this, arguments);

}

Spriteset_ShadowSet.prototype = Object.create(Sprite.prototype);
Spriteset_ShadowSet.prototype.constructor = Spriteset_ShadowSet;

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] initialize
// └──────────────────────────────────────────────────────────────────────────────────┘

Spriteset_ShadowSet.prototype.initialize = function(shadowSet) {

  Sprite.prototype.initialize.call(this);

  this.z = 0;
  this.setFrame(0, 0, Graphics.width, Graphics.height);
  this.shadowSet = shadowSet;

}; // Spriteset_ShadowSet ‹‹ initialize

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] update
// └──────────────────────────────────────────────────────────────────────────────────┘

Spriteset_ShadowSet.prototype.update = function() {

  Sprite.prototype.update.call(this);

  this.updateVisibility();
  this.updateQueue();
  this.updateExistence();

}; // Spriteset_ShadowSet ‹‹ update

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateExistence
// └──────────────────────────────────────────────────────────────────────────────────┘

Spriteset_ShadowSet.prototype.updateExistence = function() {

  if (this.shadowSet._destroy) {
    this.children.forEach(function(child) {
      child.destroy();
    }, this);

    this.removeChildren();

    this.parent.removeChild(this);
    this.destroy();
  }

}; // Spriteset_ShadowSet ‹‹ updateExistence

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateVisibility
// └──────────────────────────────────────────────────────────────────────────────────┘

Spriteset_ShadowSet.prototype.updateVisibility = function() {

  this.visible = this.shadowSet._visible;

}; // Spriteset_ShadowSet ‹‹ updateVisibility

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateQueue
// └──────────────────────────────────────────────────────────────────────────────────┘

Spriteset_ShadowSet.prototype.updateQueue = function() {

  if (this.shadowSet._refresh) {
    this.shadowSet._queue.forEach(function(entityId) {
      var tmpEntity = this.shadowSet.getEntityById(entityId);

      var tmpChild = this.children.filter(function(child) {
        return tmpEntity == child._character;
      });

      if (!tmpChild.length) {
        var tmpSprite = new Sprite_EntityShadow(tmpEntity, this.shadowSet.source());
        this.addChild(tmpSprite);
      }
    }, this);
    this.shadowSet.resetQueue();
  }

}; // Spriteset_ShadowSet ‹‹ updateQueue

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Sprite_EntityShadow
// ╘══════════════════════════════════════════════════════════════════════════════════╛

function Sprite_EntityShadow() {

  this.initialize.apply(this, arguments);

}

Sprite_EntityShadow.prototype = Object.create(Sprite_Character.prototype);
Sprite_EntityShadow.prototype.constructor = Sprite_EntityShadow;

// SUPER ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] initialize
// └──────────────────────────────────────────────────────────────────────────────────┘

Sprite_EntityShadow.prototype.initialize = function(character, source) {

  Sprite_Character.prototype.initialize.call(this, character);

  this.anchor.x = character._bsShadowAnchor.x;
  this.anchor.y = character._bsShadowAnchor.y;
  this.ox       = character._bsShadowOffset.x;
  this.oy       = character._bsShadowOffset.y;

  this._bsShadowSource = source;

  this.initFilters();

}; // Sprite_EntityShadow ‹‹ initialize

// SUPER ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] initMembers
// └──────────────────────────────────────────────────────────────────────────────────┘

Sprite_EntityShadow.prototype.initMembers = function() {

  Sprite_Character.prototype.initMembers.call(this);

  this._bsFlickerDelay = 0;

}; // Sprite_EntityShadow ‹‹ initMembers

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] initFilters
// └──────────────────────────────────────────────────────────────────────────────────┘

Sprite_EntityShadow.prototype.initFilters = function() {

  if (EXA.BS._useBlurShadow) {
    var tmpBlur     = new PIXI.filters.BlurFilter();
    tmpBlur.blur    = EXA.BS._useBlurStrength;
    tmpBlur.quality = EXA.BS._useBlurQuality;
    tmpBlur.padding = (5 / EXA.BS._useBlurQuality) * 5;
    this.filters    = [tmpBlur];
  }

}; // Sprite_EntityShadow ‹‹ initFilters

// SUPER ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] update
// └──────────────────────────────────────────────────────────────────────────────────┘

Sprite_EntityShadow.prototype.update = function() {

  Sprite_Base.prototype.update.call(this);

  this.updateVisibility();
  this.updateBitmap();
  this.updateShadowProperties();
  this.updateFrame();
  this.updatePosition();
  this.updateScaleOpacity();
  this.updateRotation();
  this.updateFlicker();
  this.updateOther();
  this.updateExistence();

}; // Sprite_EntityShadow ‹‹ update

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateExistence
// └──────────────────────────────────────────────────────────────────────────────────┘

Sprite_EntityShadow.prototype.updateExistence = function() {

  if (!this._character._bsShadowEntity) {
    this.parent.removeChild(this);
    this.destroy();
  }

}; // Sprite_EntityShadow ‹‹ updateExistence

// OVERWRITE ─────────────────────────────────────────────────────────────────────────┐
// □ [Function] updatePosition
// └──────────────────────────────────────────────────────────────────────────────────┘

Sprite_EntityShadow.prototype.updatePosition = function() {

  this.x = this._character.screenX() + this.ox;
  this.y = this._character.screenY() - 10 + this.oy;
  this.z = this._character.screenZ() - 1;

};// Sprite_EntityShadow ‹‹ updatePosition

// OVERWRITE ─────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateVisibility
// └──────────────────────────────────────────────────────────────────────────────────┘

Sprite_EntityShadow.prototype.updateVisibility = function() {

  Sprite_Base.prototype.updateVisibility.call(this);

  if (this._character.isTransparent()) {
    this.visible = false;
  } else if (!this.parent.visible) {
    this.visible = false;
  } else if (this._bsSize <= 0) {
    this.visible = false;
  } else if (this._character._bushDepth > 0) {
    this.visible = false;
  } else {
    this.visible = this._character._bsShadowVisible;
  }

}; // Sprite_EntityShadow ‹‹ updateVisibility

// OVERWRITE ─────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateCharacterFrame
// └──────────────────────────────────────────────────────────────────────────────────┘

Sprite_EntityShadow.prototype.updateCharacterFrame = function() {

  var pw = this.patternWidth();
  var ph = this.patternHeight();
  var sx = (this.characterBlockX() + this.characterPatternX()) * pw;
  var sy = (this.characterBlockY() + this.characterPatternY()) * ph;
  this.setFrame(sx, sy, pw, ph);

}; // Sprite_EntityShadow ‹‹ updateCharacterFrame

// OVERWRITE ─────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateOther
// └──────────────────────────────────────────────────────────────────────────────────┘

Sprite_EntityShadow.prototype.updateOther = function() {

  if (this._character._bsShadowColor) {
    this.setBlendColor(this._character._bsShadowColor);
  } else if (this._bsShadowSource._bsShadowColor) {
    this.setBlendColor(this._bsShadowSource._bsShadowColor);
  } else {
    this.setBlendColor(EXA.BS._useDefaultColor);
  }

}; // Sprite_EntityShadow ‹‹ updateOther

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateShadowProperties
// └──────────────────────────────────────────────────────────────────────────────────┘

Sprite_EntityShadow.prototype.updateShadowProperties = function() {

  this._bsCrX = this._character._realX * $gameMap.tileWidth();
  this._bsSrX = this._bsShadowSource._realX * $gameMap.tileWidth();
  this._bsCrY = this._character._realY * $gameMap.tileHeight();
  this._bsSrY = this._bsShadowSource._realY * $gameMap.tileHeight();

  var tmpDstX = this._bsSrX - this._bsCrX;
  var tmpDstY = this._bsSrY - this._bsCrY;

  this._bsSourceRadius  = this._bsShadowSource._bsShadowRadius;
  this._bsSourceFlicker = this._bsShadowSource._bsShadowFlicker;

  this._bsDistance = Math.sqrt(tmpDstX * tmpDstX + tmpDstY * tmpDstY);
  this._bsSize     = this._bsSourceRadius - this._bsDistance;

}; // Sprite_EntityShadow ‹‹ updateShadowProperties

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateRotation
// └──────────────────────────────────────────────────────────────────────────────────┘

Sprite_EntityShadow.prototype.updateRotation = function() {

  if (this._bsShadowSource._bsOverrideRotation) {
    this.rotation = this._bsShadowSource._bsShadowRotation;
  } else {
    var tmpCrX    = this._character._realX;
    var tmpSrX    = this._bsShadowSource._realX;
    var tmpCrY    = this._character._realY;
    var tmpSrY    = this._bsShadowSource._realY;
    var radian    = Math.atan2(tmpCrY - tmpSrY, tmpCrX - tmpSrX)

    this.rotation = radian + Math.PI / 2;
  }

}; // Sprite_EntityShadow ‹‹ updateRotation

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateScaleOpacity
// └──────────────────────────────────────────────────────────────────────────────────┘

Sprite_EntityShadow.prototype.updateScaleOpacity = function() {

  var tmpTileHeight = $gameMap.tileHeight();

  if (this._bsDistance >= tmpTileHeight) {
    if (this._bsShadowSource._bsShadowIntensity < 1.0) {
      var maxIntensity = this._bsShadowSource._bsShadowIntensity;
      this.alpha = ((this._bsSourceRadius - this._bsDistance) * maxIntensity) / this._bsSourceRadius;
    } else {
      this.alpha = this._bsSize / this._bsSourceRadius;
    }
    if (EXA.BS._useScaleShadow) {
      if (this._bsCrY > this._bsSrY) {
        this.scale.y = (this._bsSize + tmpTileHeight) / this._bsSourceRadius;
        this.scale.x = -Math.abs((this._bsSize + tmpTileHeight) / this._bsSourceRadius);
      } else {
        this.scale.y = (this._bsSize + tmpTileHeight) / this._bsSourceRadius;
        this.scale.x = (this._bsSize + tmpTileHeight) / this._bsSourceRadius;
      }
    } else {
      if (this._bsCrY > this._bsSrY) {
        this.scale.y = 1.0;
        this.scale.x = -1.0;
      } else {
        this.scale.y = 1.0;
        this.scale.x = 1.0;
      }
    }
  } else {
    var tmpDistanceMod = this._bsDistance / tmpTileHeight;

    if (this._bsShadowSource._bsShadowIntensity < 1.0) {
      var maxIntensity = this._bsShadowSource._bsShadowIntensity;
      this.alpha = ((this._bsSourceRadius * tmpDistanceMod) * maxIntensity) / this._bsSourceRadius;
    } else {
      this.alpha = (this._bsSize * tmpDistanceMod) / this._bsSourceRadius;
    }
    if (EXA.BS._useScaleShadow) {
      if (this._bsCrY > this._bsSrY) {
        this.scale.y = (this._bsSize * tmpDistanceMod) / this._bsSourceRadius;
        this.scale.x = -Math.abs((this._bsSize * tmpDistanceMod) / this._bsSourceRadius);
      } else {
        this.scale.y = (this._bsSize * tmpDistanceMod) / this._bsSourceRadius;
        this.scale.x = (this._bsSize * tmpDistanceMod) / this._bsSourceRadius;
      }
    } else {
      if (this._bsCrY > this._bsSrY) {
        this.scale.y = 1.0;
        this.scale.x = -1.0;
      } else {
        this.scale.y = 1.0;
        this.scale.x = 1.0;
      }
    }
  }

}; // Sprite_EntityShadow ‹‹ updateScaleOpacity

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateFlicker
// └──────────────────────────────────────────────────────────────────────────────────┘

Sprite_EntityShadow.prototype.updateFlicker = function() {

  if (this._bsSourceFlicker.enabled) {

    if (this._bsFlickerDelay == 0) {
      this._bsFlickerDelay = Math.randomInt(this._bsSourceFlicker.delay) + 1;
      var tmpFlickerStrength = this._bsSourceFlicker.strength;
      var tmpFlicker         = ((Math.random() * tmpFlickerStrength) - (tmpFlickerStrength / 2)) / 100;

      this.alpha   -= tmpFlicker;
      this.scale.y += tmpFlicker;
    }

    this._bsFlickerDelay--;
  }

}; // Sprite_EntityShadow ‹‹ updateFlicker

// SUPER ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] characterPatternX
// └──────────────────────────────────────────────────────────────────────────────────┘

Sprite_EntityShadow.prototype.characterPatternX = function() {

  if (EXA.BS._useBasicShadow) return 0;

  return Sprite_Character.prototype.characterPatternX.call(this);

}; // Sprite_CharacterShadow ‹‹ characterPatternX

// SUPER ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] characterPatternX
// └──────────────────────────────────────────────────────────────────────────────────┘

Sprite_EntityShadow.prototype.characterPatternY = function() {

  if (EXA.BS._useBasicShadow) return 0;

  if (this._bsCrY == this._bsSrY) return 0;

  return Sprite_Character.prototype.characterPatternY.call(this);

}; // Sprite_CharacterShadow ‹‹ characterPatternX

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Spriteset_Map
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] createLowerLayer
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.BS.Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;

Spriteset_Map.prototype.createLowerLayer = function() {

  EXA.BS.Spriteset_Map_createLowerLayer.call(this);

  this.createEntityShadows();

}; // Spriteset_Map ‹‹ createLowerLayer

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] createEntityShadows
// └──────────────────────────────────────────────────────────────────────────────────┘

Spriteset_Map.prototype.createEntityShadows = function() {

  this._bsShadowBase = new Spriteset_Shadows();

  $gameMap.shadowData()._shadowSets.forEach(function(shadowSet) {
    var tmpSprite = new Spriteset_ShadowSet(shadowSet);

    shadowSet.entities().forEach(function(entity) {
      tmpSprite.addChild(new Sprite_EntityShadow(entity, shadowSet.source()));
    }, this);

    this._bsShadowBase.addChild(tmpSprite);
  }, this);

  this._tilemap.addChild(this._bsShadowBase);

}; // Spriteset_Map ‹‹ createEntityShadows

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] hideCharacters
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.BS.Spriteset_Map_hideCharacters = Spriteset_Map.prototype.hideCharacters;

Spriteset_Map.prototype.hideCharacters = function() {

  EXA.BS.Spriteset_Map_hideCharacters.call(this);

  this._bsShadowBase.visible = false;

}; // Spriteset_Map ‹‹ hideCharacters

// ▌▌██████████████████████████████████████ EOF █████████████████████████████████████▐▐