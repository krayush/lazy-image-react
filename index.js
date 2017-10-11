import React from 'react';
import defaultLoading from './assets/images/loading.gif';
import defaultNotFound from './assets/images/404.jpeg';

class LazyImage extends React.Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            alt: props.alt || 'image not loaded',
            src: props.src || 'forced404',
            onClick: props.onClick || function () {},
            onError: props.onError || function () {},
            className: props.className || "",
            // Next properties are for internal component working
            loadingStatus: "init",
            defaultLoading: props.defaultLoading || defaultLoading,
            defaultNotFound: props.defaultNotFound || defaultNotFound
        };
        this.state.visibleSrc = this.state.defaultLoading;
        this.state.className += " lazy-image";
        this.syntheticImage = new Image();
    }
    render () {
        return (
            <img src={this.state.visibleSrc}
                 className={this.state.className}
                 onClick={this.state.onClick}/>
        );
    }
    componentWillReceiveProps(props) {
        var newProps = Object.assign({}, this.props, props);
        this.setState(newProps, this.loadImage);
    }
    loadImage() {
        if(this.state.src === this.state.visibleSrc) {
            if (this.state.loadingStatus === "loaded") {
                return;
            }
        }
        this.setState({
            visibleSrc: this.state.defaultLoading,
            loadingStatus: "loading"
        });
        this.syntheticImage.src = this.state.src;
        this.syntheticImage.onload =  ((currentRequestSrc) => {
            return () => {
                if(currentRequestSrc === this.syntheticImage.src) {
                    this.setState({
                        visibleSrc: currentRequestSrc,
                        loadingStatus: "loaded"
                    });
                }
            };
        })(this.syntheticImage.src);
        this.syntheticImage.onerror =  ((currentRequestSrc) => {
            return () => {
                if(currentRequestSrc === this.syntheticImage.src) {
                    this.setState({
                        visibleSrc: this.state.defaultNotFound,
                        loadingStatus: "error"
                    }, () => {
                        this.state.onError(this, arguments);
                    });
                }
            };
        })(this.syntheticImage.src);
    }
    componentDidMount () {
        this.loadImage();
    }
}

export default LazyImage;
