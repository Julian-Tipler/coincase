import React from 'react';
import Chart from 'chart.js'
import { Line } from "react-chartjs-2";

import {
    Route,
    Redirect,
    Switch,
    Link,
    withRouter,
} from 'react-router-dom';


class CoinGraph extends React.Component{

    xAxis() {
        // console.log(this.props)
        const prices = this.props.targetCoin.prices
        // console.log(prices)
        var times=[]
        if (!!prices) {
            prices.forEach(el=> {
                const d = new Date(el[0])
                times.push(d.toLocaleTimeString())
            })
        }
        // console.log(times)
        return times
    }

    yAxis() {
        // console.log(this.props)
        const prices = this.props.targetCoin.prices
        // console.log(prices)
        var values = []
        if (!!prices) {
            prices.forEach(el => values.push(el[1]))
        }
        // console.log(values)
        return values
    }
    
    graphData() {
        const data = {
            labels: this.xAxis(),
            datasets: [
                {
                    label: '',
                    fill: false,
                    lineTension: 0.01,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(44, 130, 201, 1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(44, 130, 201, 1)',
                    pointBackgroundColor: 'rgba(44, 130, 201, 1)',
                    pointBorderWidth: 1,
                    pointHoverRadius: 1,
                    pointHoverBackgroundColor: 'rgba(44, 130, 201, 1)',
                    pointHoverBorderColor: 'rgba(44, 130, 201, 1)',
                    pointHoverBorderWidth:1,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.yAxis(),
                },
            ],
            
        };
        return data
    }

    graphOptions() {
        const options = {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 6
                    }
                }]
            }
            }
        

        return options
    }


   render() {
       

       return (
        <div>
            <Line data={this.graphData()} options={this.graphOptions()}/>
        </div>
       )
   }
}


export default withRouter(CoinGraph)