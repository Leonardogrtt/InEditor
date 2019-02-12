/**
* @author suheeeee<lalune1120@hotmail.com>
*/
define([], function() {
  'use strict';

  /**
  * @class CellGeometry
  */
  function CellGeometry(_id, _points) {

    /**
    * @memberof CellGeometry
    */
    this.id = _id;

    /**
    * @memberof CellGeometry
    */
    this.points = _points;


    /**
     * @memberof Cell
     * @desc null, down, up
     */
    this.slant = null;
  }

  /**
  * @memberof CellGeometry
  */
  CellGeometry.prototype.load = function(values){
    this.id = values.id;
    this.points = values.points;
    this.slant = values.slant;
  }

  /**
  * @memberof CellGeometry
  */
  CellGeometry.prototype.updatePoints = function(newPoints){
    this.points = newPoints;
  }



  return CellGeometry;
});
