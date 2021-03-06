import React from 'react';
import CoinGraphContainer from '../coin_graph/coin_graph_container'
import WatchListCoinGraph from '../coin_graph/watch_list_coin_graph'
import * as APIUtil from '../../util/gecko_api_util'

class WatchList extends React.Component {
    constructor(props) {  
        super(props)
        this.topSix = this.topSix.bind(this)
    }

    componentDidMount(){
        APIUtil.fetchTopCoins()
        .then(coins=> {
            coins.slice(0,6).forEach((coin,idx)=> {
            this.props.fetchTopSixHistoricalData(coin.id, idx, coin.image, coin.current_price)
            })
        })
    }

    topSix() {
        return Object.values(this.props.topCoins).slice(0, 6)
    }

    render() {
        if (Object.values(this.props.topSixCoinsHistoricalData).some(el=> el===null)) {
            return <div>watchlist loading...</div>
        }
        return(
            <div className='top-six-graphs'>
                    {Object.values(this.props.topSixCoinsHistoricalData).slice(0,6).map((coin, i) => (
                        <div className='top-six-graph' key={i}>
                            <WatchListCoinGraph 
                            coin={coin[1]}
                            id={coin[0]}
                            index={i}
                            image={coin[2]}
                            current_price={coin[3]}
                            />
                        </div>      
                    ))}
            </div>
        )
    }
}

export default WatchList
