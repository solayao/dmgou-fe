import { observable, action, configure } from 'mobx';
import { trim } from 'dizzyl-util/lib/string';

/** 使用严格模式 */
configure({ enforceActions: 'observed' });

/**
 * mobX的状态集合
 * @export
 * @class Store
 */
class Store {
    @observable showDrawler = false;
    @action changeDrawlerState = state => {
        this.showDrawler = state !== undefined ? state : !this.showDrawler;
    }

    @observable searchInputVal = '';
    @action changeSearchInputVal = (state) => {
        this.searchInputVal = trim(state);
    }
    
    @observable phoneToolbars = [];
    @action setToolbarsForPhone = (state) => {
        this.phoneToolbars = state;
    }
};

export default new Store();