import { connect } from 'react-redux';
import {createTransaction} from '../../actions/transaction_actions'
import { fetchCoinInfo } from '../../actions/gecko_api_actions';
import { fetchUserDetails, fetchPortfolio } from '../../actions/user_actions'
import BuySellBox from './buy_sell_box';
import { clearErrors } from '../../actions/transaction_actions';

const msp = (state,ownProps) => {
    return({
        currentUser: state.session.id,
        id: ownProps.id,
        coinInfo: state.entities.coinInfo,
        errors: state.errors,
        userBuyingPower: state.entities.users.userDetails.buyingPower,
        portfolio: state.entities.users.portfolio,
    })
}

const mdp = dispatch => ({
    createTransaction: (transaction) => dispatch(createTransaction(transaction)),
    fetchCoinInfo: (id) => dispatch(fetchCoinInfo(id)),
    clearErrors: () => dispatch(clearErrors()),
    fetchUserDetails: (id) => dispatch(fetchUserDetails(id)),
    fetchPortfolio: () => dispatch(fetchPortfolio()),
    clearErrors: () => dispatch(clearErrors())
})

export default connect(msp,mdp)(BuySellBox)