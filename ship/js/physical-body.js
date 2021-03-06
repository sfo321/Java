function createPhysicalBody(options) {

    'use strict';

    function move() {
        // var lastCoordinates = JSON.parse(JSON.stringify(this.coordinates));

        var self = this,
            lastCoordinates = { x: self.coordinates.x, y: self.coordinates.y };

        if(self.coordinates.x + self.speed.x > 1120){
            self.coordinates.x = 1120;
        }
        else if(self.coordinates.x + self.speed.x < 0){
            self.coordinates.x = 0;
        }
        else if(self.coordinates.y + self.speed.y < 0){
            self.coordinates.y = 0;
        }
        else if(self.coordinates.y + self.speed.y > 560){
            self.coordinates.y = 560;
        }
        else {
            self.coordinates.x += self.speed.x;
            self.coordinates.y += self.speed.y;
        }
        return lastCoordinates;
    }

    function collidesWith(otherPhysicalBody) {
        // radiuses 
        var self = this,
            x1 = self.coordinates.x + self.width / 2,
            y1 = self.coordinates.y + self.height / 2,
            x2 = otherPhysicalBody.coordinates.x + otherPhysicalBody.width / 2,
            y2 = otherPhysicalBody.coordinates.y + otherPhysicalBody.height / 2,
            distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

        return distance <= (self.radius + otherPhysicalBody.radius);
    }

    var physicalBody = {
        coordinates: options.coordinates,
        defaultAcceleration: options.defaultAcceleration,
        speed: options.speed || { x: 0, y: 0 },
        height: options.height,
        width: options.width,
        radius: (options.width + options.height) / 4,
        accelerate: function (axis, dir) {

            this.speed[axis] += this.defaultAcceleration[axis] * dir;
        },
        move: move,
        collidesWith: collidesWith
    };

    return physicalBody;
}