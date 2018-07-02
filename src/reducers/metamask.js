import { createReducer } from "../utils/redux";
import { getMetamaskNetworkName, web3SetHttpProvider } from "../handlers/web3";

// Constants ----------------------------------------------

const UPDATE_ACCOUNT = "metamask/UPDATE_ACCOUNT";
const UPDATE_NETWORK = "metamask/UPDATE_NETWORK";
const CONNECT_REQUEST = "metamask/CONNECT_REQUEST";
const CONNECT_SUCCESS = "metamask/CONNECT_SUCCESS";
const CONNECT_FAILURE = "metamask/CONNECT_FAILURE";
const NOT_AVAILABLE = "metamask/NOT_AVAILABLE";

// Actions ------------------------------------------------

export const updateMetamaskAccount = () => (dispatch, getState) => {
  if (window.web3.eth.defaultAccount !== getState().metamask.accountAddress) {
    const accountAddress = window.web3.eth.defaultAccount;
    dispatch({
      type: UPDATE_ACCOUNT,
      payload: { address: accountAddress }
    });
  }
  setTimeout(() => dispatch(updateMetamaskAccount()), 100);
};

export const updateMetamaskNetwork = () => (dispatch, getState) => {
  getMetamaskNetworkName()
    .then(network => {
      if (network !== getState().metamask.network) {
        web3SetHttpProvider(`https://${network}.infura.io/`);
        dispatch({ type: UPDATE_NETWORK, payload: { network } });
      }
      setTimeout(() => dispatch(updateMetamaskNetwork()), 2500);
    })
    .catch(error => {
      console.error(error);
      dispatch({ type: CONNECT_FAILURE });
    });
};

export const metamaskConnectInit = () => dispatch => {
  dispatch({ type: CONNECT_REQUEST });
  if (typeof window.web3 !== "undefined") {
    getMetamaskNetworkName()
      .then(network => {
        console.log(network, "network");
        dispatch({ type: CONNECT_SUCCESS, payload: { network } });
        // web3SetHttpProvider(`https://${network}.infura.io/`);
        dispatch(updateMetamaskAccount());
        dispatch(updateMetamaskNetwork());
      })
      .catch(error => {
        // TODO: notify user or throw to a fallback component
        console.error(error);
        dispatch({ type: CONNECT_FAILURE });
      });
  } else {
    dispatch({ type: NOT_AVAILABLE });
  }
};

// Reducer ------------------------------------------------

const initialState = {
  fetching: false,
  accountAddress: "",
  web3Available: false,
  network: "main"
};

const metamask = createReducer(initialState, {
  [CONNECT_REQUEST]: state => ({
    ...state,
    fetching: true,
    web3Available: false
  }),
  [CONNECT_SUCCESS]: (state, { payload }) => ({
    ...state,
    fetching: false,
    web3Available: true,
    network: payload.network
  }),
  [CONNECT_FAILURE]: () => ({
    ...initialState,
    web3Available: true
  }),
  [NOT_AVAILABLE]: () => ({
    ...initialState
  }),
  [UPDATE_ACCOUNT]: (state, { payload }) => ({
    ...state,
    accountAddress: payload.address
  }),
  [UPDATE_NETWORK]: (state, { payload }) => ({
    ...state,
    network: payload.network
  })
});

export default metamask;
