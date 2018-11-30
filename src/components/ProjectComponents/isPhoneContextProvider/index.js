import React from 'react';
import {isPhoneContext} from '@/store/context';
import SystemMess from 'dizzyl-util/lib/system/systemMess';
import {ISPHONEWIDTH} from '@/overrides/const';

class IsPhoneContextProvider extends React.PureComponent {
    constructor(props) {
        super(props);
        this.defaultSystem = new SystemMess();
        this.state = {
            isPhone: this.defaultSystem.isPhone,
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResizeWindow);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResizeWindow);
        this.defaultSystem = null;
    }

    handleResizeWindow = () => {
        let windowWidth = document.getElementsByClassName('App')[0].clientWidth;
        let currentSystem = new SystemMess();
        this.setState({
            isPhone: currentSystem.isPhone || windowWidth <= ISPHONEWIDTH,
        }, () => {
            currentSystem = windowWidth = null;
        })
    }

    render() {
        const {isPhone} = this.state;
        return (
            <isPhoneContext.Provider value={isPhone}>
                {this.props.children}
            </isPhoneContext.Provider>
        )
    }
}

export default IsPhoneContextProvider;