import { observable, action, configure } from 'mobx';
import SystemMess from 'dizzyl-util/lib/system/systemMess';

/** 使用严格模式 */
configure({ enforceActions: 'observed' });

/**
 * mobX的状态集合
 * @export
 * @class Store
 */
class Store {
    @observable isPhone = new SystemMess().isPhone;
};

export default new Store();