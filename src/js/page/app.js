    import { bindActionCreators } from 'redux';
    import { connect } from 'react-redux';
    import * as actionCreators from '../actions/action-creators';

    import Main from './main';

    function mapStateToProps(state) {
      return {
        colorCode: state.inputReducer.colorCode,
        opacity: state.inputReducer.opacity
      }
    }

    function mapDispatchToProps(dispatch){
      return bindActionCreators(actionCreators, dispatch);
    }

    const app = connect(mapStateToProps, mapDispatchToProps)(Main);

    export default app;

