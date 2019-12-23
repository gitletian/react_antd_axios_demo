
// 用 mockjs 模拟生成数据
const Mock = require('mockjs');

// 导出数据
module.exports = () => {
    console.log("mock data fetch 预生成 json: =====");
    return {
        data: [
            {   // 避免不了缓存
                "key": 100,
                "name": "长胖周",
                "gender": "男",
            },
            {
                "key": 101,
                "name": "aaa",
                "gender": "女",
            },
        ]
    };
};
