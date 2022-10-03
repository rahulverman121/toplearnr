import data from '../assets/data.json';
import "./Schedular.css";

function Scheduler() {
    var timeslots = [] ;
    var newdata = [];
    data.map( dat => {
        var status = "Accepted";
    for (let i=0;i<timeslots.length;i++) {
        if (dat.startTime === timeslots[i][0] || dat.endTime === timeslots[i][1] ) {
            status = "Rejected";
        }
    }
    dat["status"]=status;
    newdata.push(dat);

    if (status === "Accepted") {
        timeslots.push([dat.startTime,dat.endTime]);
    }
        return 1;
    } );
    newdata.sort(function(a,b) {
        return a.startTime - b.startTime;
    });

    var tabledata = newdata.map( datn => {
        var stime = new Date(datn.startTime * 1000) ;
        var shours = stime.getHours();
        var phase = "AM";
        if (shours > 11) {
            shours -= 12;
            phase = "PM"
        }
        if (shours === 0) {
            shours = 12;
        }  
        var etime = new Date(datn.endTime * 1000) ;
        var ehours = etime.getHours();
        var ephase = "AM";
        if (ehours > 11) {
            ehours -= 12;
            ephase = "PM"
        }
        if (ehours === 0) {
            ehours = 12;
        }   
        
        return (
            <tr>
                <td>{datn.name}</td>
                <td>{datn.phone}</td>
                <td>{shours+":"+stime.getMinutes()+phase}</td>
                <td>{ehours+":"+etime.getMinutes()+ephase}</td>
                <td class={datn.status}>{datn.status}</td>
            </tr>
        );
    })
    
    
    return (
        <section id="schedular">
            <table id="slottable">
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Slot Status</th>
                </tr>
            {tabledata}
            </table>
            
        </section>
    )
}
export default Scheduler;
