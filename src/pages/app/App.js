import React from 'react';
import { Button, Table } from 'antd';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import axios from 'axios';

import './App.css';
import AAA from '../trouter/aaa';
import BBB from '../trouter/bbb';



// 1、定义初始状态
const initialState = {
    columns: [{ //定义姓名、性别两列
        title: '姓名',
        dataIndex: 'name',
    }, {
        title: '性别',
        dataIndex: 'gender',
    }],

    data: [
        {
            "key": "3",
            "name": "长胖周",
            "gender": "男",
        },
        {
            "key": "4",
            "name": "aaa",
            "gender": "女",
        },
    ]
};

// 2、创建 reducer 方法， 先原封不动返回 state，
// 在 reducer 中状态只能通过 store 的 dispatch 来改变
const myReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'CHANGE_DATA':
            console.log("reducer pre data = ", action.payload);
            console.log("state.data = ", state.data);
            const data = {
                ...state,
                data: state.data.concat(action.payload)
            };
            console.log("reducer after data = ", data);
            return data;
        default:
            return state;
    }
};

// 3、创建 store 存储区， 它只能通过 reducer 作为参数来构造
const store = createStore(myReducer);
console.log("initial state: ", store.getState());


// 4、创建 action，Action 是一个带属性的对象，其属性用type来定义，type是必填项，其他的还可以有附带数据，一般写在用payload里。
const myAction = {
    type: 'CHANGE_DATA',
    payload: [{
        "key": "100",
        "name": "张胖卓",
        "gender": "男"
    }]
};


// 5、修改state的唯一方法就是dispatch(action)，那么现在我们就把这个action触发一下。
// store.dispatch(myAction);


function random() {
    return Math.floor(Math.random() * 10000).toString();
}


// 通过 proto 进行深度拷贝，此拷贝 只能 copy 对象
// const deepClone = (obj) => {
//     let proto = Object.getPrototypeOf(obj);
//     return Object.assign({}, Object.create(proto), obj);
// };

// 通过 json copy, 此 copy 只能 copy json
const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: []
        }
    }

    readData = () => {
        axios.get("http://localhost:53000/data").then(res => {
            res.data.forEach(x=>{x.key=random()});
            // 状态只能通过 dispatch 来修改
            store.dispatch({
                type: 'CHANGE_DATA',
                payload: res.data
            });
        }).catch(error => {
            console.log(error);
        })
    };

    changeData = () => {
        // 需进行深度 copy， 否则会改变原来 obj 的值
        const action = deepClone(myAction);
        action.payload.forEach(x=> {x.key=random()});
        // 状态只能通过 dispatch 来修改
        store.dispatch(action);
    };

    // tore跟view层并没有连起来，如果不手动重新render，页面是不会变化的，为此我们需要一个监听函数，监听store中值的变化，当发生变化时重新渲染view。
    // 这个监听由store.subscribe实现。（如果你用了react-redux的话，它里面的connect让我们不需要自己手动去subscribe全局state的变化，它会在内部自动监听并更新。）
    listerner = () => {
        // 获取当前 store 的状态
        let newState = store.getState();
        this.setState(newState);
    };

    // 当 store 有改变， 他会调用 listerner 方法,
    // 即：listerner 订阅了 store， 当 store 有变化时， 会通知 listerner，通过listerner来同步 stroe 到 state 的同步
    componentDidMount() {
        // 通过 subscribe 来实现，当状态改变时需要出发的操作
        store.subscribe(this.listerner);
    }

    componentWillUnmount() {
        store.unsubscribe(this.listerner);
    }


    render() {
        console.log("render data = ", this.state.data);
        return(
            <BrowserRouter>
                <div className="App">
                    <div>
                        <Button type="primary" onClick={this.changeData}>
                            <Link to="/aaa">修改数据</Link>
                        </Button>

                        <Button type="primary" onClick={this.readData}>
                            <Link to="/bbb">从 axios 读取数据</Link>
                        </Button>
                        <Switch>
                            <Route path="/aaa" exact component={AAA} />
                            <Route path="/bbb" exact component={BBB} />
                        </Switch>

                        <Table columns={this.state.columns} dataSource={this.state.data} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
