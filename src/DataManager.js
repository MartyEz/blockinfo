import React, {Component} from 'react'
import ApiCaller from "./ApiCaller";
import Collapsible from 'react-collapsible';


class DataManager extends Component {

    constructor(props) {
        super(props);
        // this.api = new ApiCaller();
        // this.ws = new WebSocket("wss://ws.blockchain.info/inv");
        this.ws = new WebSocket('ws://127.0.0.1:3001');
        this.state = {
            lastHash:"",
            data: []
        };


    }

    sortByHeight =(a,b) => {
        if(a.height >= b.height)
            return -1;
        if(a.height < b.height)
            return 1;
        return 0
    };

    transformDate = (time) =>{
        return new Date(time*1000).toUTCString()
    };

    // getLastHash = () => { ApiCaller.getLastHashBlock().then(  (rsl) => { return ApiCaller.apiCall(rsl)  }).then( (newData) => { console.log(newData);this.setState( (prev) => {if( prev.lastHash !== newData.hash){return { lastHash : newData.hash,data : [...prev.data,newData]}}}) }  )}

    componentDidMount() {

        this.ws.onmessage = (msg) =>{
            console.log("onmessage : ",msg);
            console.log("json : ",JSON.parse(msg.data));
            const json = JSON.parse(msg.data);
            if(typeof json.x !== "undefined"){
                const hash = json.x.hash;
                this.setState( (prev) => {if( prev.lastHash !== hash){return { lastHash : hash,data : [...prev.data,json.x]}}})
            }
        };


        // this.ws.onopen = () => {
        //     console.log("connected");
        //     this.ws.send('{"op":"ping"}');
        //     this.ws.send('{"op":"blocks_sub"}');
        // };

        ApiCaller.getLastBlocks().then((docs) => {
            let arr = [];
            docs.forEach(item => {
                if( typeof item.x !== 'undefined')
                    arr.push(item.x)
            });
            this.setState((prev =>{
                return{
                    data : prev.data.concat(arr)
                }
            }))
        })

        // this.getLastHash();
        // setInterval(this.getLastHash,300000);
    }


    render() {
        return(
            <div>
                {this.state.data.sort(this.sortByHeight).map(item => (
                    <Collapsible key={item.blockIndex} trigger={`${item.height} -- ${item.hash} -- ${item.foundBy.description}`}>
                        <p>Height : {item.height}<br/>
                        estimatedBTCSent : {item.estimatedBTCSent/100000000}<br/>
                        Nonce : {item.nonce}<br/>
                        Time : {this.transformDate(item.time)}
                        </p>
                        <a href={`block/${item.hash}`}>View Transactions of this block</a>
                    </Collapsible>
                ))}

            </div>

        )
    }
}


export default DataManager;