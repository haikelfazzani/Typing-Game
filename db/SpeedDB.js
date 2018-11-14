export class SpeedDB {
    
    constructor() {

        this.speedDb = localStorage;
        if(localStorage.getItem("speed") !== null) {
            this.speeds = JSON.parse(localStorage.getItem("speed"));
        }else {
            this.speeds = [];
        }

        this.isInserted = false;
    }

    insertData(speed) {
        this.speeds.push(speed);            
        this.speedDb.setItem('speed',JSON.stringify(this.speeds));
        let speedArray = JSON.parse(localStorage.getItem("speed"));
        this.speeds = speedArray;        
    }

    getAllData() {
        return this.speeds;
    }

    remove() {
        this.speedDb.removeItem('speed');
    }

    setIsInserted(value) {
        this.isInserted = value;
    }

}