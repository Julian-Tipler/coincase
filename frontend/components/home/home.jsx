import React from 'react';
import CoinGraph from '../coin_graph/coin_graph';
import PortfolioIndex from '../portfolio/portfolio_index';
import WatchListContainer from '../portfolio/watchlist_container';
import TransactionsIndex from '../portfolio/transactions_index';
import DoMoreWithCrypto from'../extra_boxes/do_more_with_crypto';
import Footer from '../footer/footer'
import {Link} from 'react-router-dom';

class Home extends React.Component {
    componentDidMount() {
        this.props.fetchPortfolio()
        this.props.fetchTransactions()
        this.props.fetchUserDetails(this.props.currentUser)
    }

    componentWillUnmount() {
        this.props.resetPortfolio()
    }

    render() {
        return(
            <div className='home-content'>
                {/* <div className='portfolio-graph'>Portfolio Graph</div> */}
                <div className='watch-list-box'>
                    <div className='watchlist-title'>Watchlist</div>
                    <WatchListContainer/>
                </div>

                <div className='do-more-with-crypto-box'>
                    <DoMoreWithCrypto/>
                </div>

               <div className='portfolio-assets-and-transactions'>
                    <div className='portfolio-index-box' id='portfolio-index-box-home'>
                        <div className='portfolio-index-title title'>
                            Your assets:
                        </div>
                        <div>
                            <PortfolioIndex portfolio={this.props.portfolio} userCoinPrices={this.props.userCoinPrices} userBuyingPower={this.props.userBuyingPower}/>
                        </div>
                    </div>
                    <div className='recent-transactions-box' id='recent-transactions-box-home'>
                        <div className='transactions-title title'>
                            Recent Transactions
                        </div>
                        <div>
                            <TransactionsIndex transactions={this.props.transactionsIndex}/>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Home