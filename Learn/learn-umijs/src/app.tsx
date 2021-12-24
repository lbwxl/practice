export const layout = () => {
    return {
      menuDataRender:() =>[ //此功能可以实现动态路由，用来渲染访问路由
        {
          path: '/',
          name: 'Home',
        },
        {
          path: '/login',
          name: '登录页',
        },
        {
            path: '/dashboard',
            name: '数据管理',
            children: [
                {path:'/dashboard/article',name:'文章页面'}
            ]
        },
        {
            path:'/*',
            name: '404页面'
        }
      ],
    }
  };