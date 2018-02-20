/**
 * Created by kathy on 20/02/2018.
 */
import React from 'react';

const ShardFuns = {
    createDateId (year, month, date){
        var id = year.toString().concat('_').concat(month.toString()).concat('_').concat(date.toString());
        return id;
    },
    splitDateId (dateIdString){
    if(!dateIdString) return {year:'',month:'',date:''};
    var arr = dateIdString.split('_');
    var dateSplited = {year: arr[0], month: arr[1],date:arr[2]};
    return dateSplited;
},

}


export default ShardFuns;