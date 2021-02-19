import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HandleMeme'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { fetchMemes, postMemes, updateMemes, deleteMemes } from "../redux/ActionCreators";
import { connect } from "react-redux";

//mapping the state from combine reducers
const mapStateToProps = state => {
    return {
        memes: state.memes
    }
}
//dispatch comments from ActionCreators
const mapDispatchToProps = (dispatch) => ({
    postMemes: (name, caption, url) => dispatch(postMemes(name, caption, url)),
    fetchMemes: () => dispatch(fetchMemes()),
    updateMemes: (memeID, name, caption, url) => (dispatch(updateMemes(memeID, name, caption, url))),
    deleteMemes: (memeID) => (dispatch(deleteMemes(memeID)))
});
class Main extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchMemes();
    }
    render() {
        const HomePage = () => {
            return (
                <Home errMess={this.props.memes.errMess} memes={this.props.memes.memes} deleteMemes={this.props.deleteMemes}
                    postMemes={this.props.postMemes} fetchMemes={this.props.fetchMemes} updateMemes={this.props.updateMemes} />
            );
        }
        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/' component={HomePage} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}
//for connecting the dispatch functions and state from combine reducers with state
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));