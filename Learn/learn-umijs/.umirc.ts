import { defineConfig } from 'umi';

// export default defineConfig({
//     title: '管理平台业务模版',
//     nodeModulesTransform: { type: 'none', },
//     layout: { name: '数据管理菜单', locale: false, },
//     routes: [{ path: '/', component: '@/pages/index' },
//     {
//         path: '/dashboard', name: '数据统计', icon: 'dashboard',
//         routes: [
//             { path: '/dashboard/analysis', icon: 'AreaChartOutlined', name: '分析页', component: '@/pages/Dashboard/Analysis' },
//             { path: '/dashboard/monitor', icon: 'DesktopOutlined', name: '控制页', component: '@/pages/Dashboard/Monitor' },],
//     },
//     {
//         path: '/func', name: '功能页', icon: 'AppstoreAddOutlined',
//         routes: [
//             { path: '/func/draggable', icon: 'BuildOutlined', name: '拖拽功能', component: '@/pages/Func/draggable' },],
//     }, { component: '@/pages/404' },
//     ],
// });
export default defineConfig({
    layout: {  navTheme: "light" },
    nodeModulesTransform: {
        type: 'none',
    },
    fastRefresh: {},
    // 引入antd
    antd: {
        dark: false,
        compact: true,
    },
    // 配置代理
    proxy: {
        '/api': {
            'target': 'http://82.156.36.178:8085',
            'changeOrigin': true,
            'pathRewrite': { '^/api': '' },
        },
    },
    // 引入dva
    dva: {
        immer: true,
        hmr: true,
    },
});
