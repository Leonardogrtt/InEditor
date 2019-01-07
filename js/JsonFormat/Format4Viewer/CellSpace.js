/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(["./Feature"], function(Feature) {
  'user strict';

  /**
   * @class CellSpace
   * @augments Feature
   */
  function CellSpace() {

    Feature.apply(this, arguments);

    this.type = "CellSpace";

    this.attributes = {
      'name': "",
      'description': "",
      'partialboundedBy': [],
      'externalReference': [],
      'duality': ""
    };

    this.geometry = {
      'type': 'Solid',
      'coordinates': [],
      'properties': {
        'id': "",
        'height': "",
        'extrude': "true"
      }
    };

  }

  CellSpace.prototype = Object.create(Feature.prototype);

  /**
   * @memberof CellSpace
   *
   */
  CellSpace.prototype.setPartialboundedBy = function(partialboundedBy) {

    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    if (!isArray(partialboundedBy)) {

      log.warn("The given parameter is not an Array type.");

    } else {

      this.attributes.partialboundedBy = partialboundedBy;

    }

  }

  /**
   * @memberof CellSpace
   *
   */
  CellSpace.prototype.setExternalReference = function(externalReference) {

    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    if (this.attributes == null || this.attributes.externalReference == null) {

      log.warn("The given conditions said you don't need to need to set externalReference of Cell.");

    } else {

      if (!isArray(externalReference)) {

        log.warn("The given parameter is not an Array type.");

      } else {

        this.attributes.externalReference = externalReference;

      }

    }

  }

  /**
   * @memberof CellSpace
   */
  CellSpace.prototype.pushCoordinatesFromDots = function(dots, transDots) {

    var polygon = [];

    if (transDots == undefined) {
      var len = dots.length;

      for (var i = 0; i < len; i++) {

        polygon.push([dots[i].point.x, dots[i].point.y, 0]);

      }

      polygon.push([dots[0].point.x, dots[0].point.y, 0]);


    } else {
      var len = dots.length;

      for (var i = 0; i < len; i++) {

        var transDot = transDots[dots[i].uuid];
        polygon.push([transDot.point.x, transDot.point.y, transDot.point.z]);

      }

      var transDot = transDots[dots[0].uuid];
      polygon.push([transDot.point.x, transDot.point.y, transDot.point.z]);
    }

    this.geometry.coordinates.push(polygon);
  }

  /**
   * @memberof CellSpace
   */
  CellSpace.prototype.updateCoordinates = function(index, position, value) {

    if (position == 'x') {

      this.geometry.coordinates[index][0] = value;

    } else if (position == 'y') {

      this.geometry.coordinates[index][1] = value;

    } else if (position == 'z') {

      this.geometry.coordinates[index][2] = value;

    }

  }

  /**
   * @memberof CellSpace
   * @return coordinates array
   */
  CellSpace.prototype.getCoordinates = function() {

    return this.geometry.coordinates;

  }

  /**
   * @memberof CellSpace
   * @return coordinates array
   */
  CellSpace.prototype.getCoordinate = function(i) {

    if (this.geometry.coordinates.length > i) {
      return this.geometry.coordinates[i];
    }

  }

  /**
   * @memberof CellSpace
   */
  CellSpace.prototype.setHeight = function(height) {

    this.geometry.properties.height = height;

  }

  /**
   * @memberof CellSpace
   */
  CellSpace.prototype.addHole = function(coors) {

    this.geometry.coordinates.push(coors);

  }


  return CellSpace;

});
