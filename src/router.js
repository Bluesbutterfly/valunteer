import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: './service'
  },
  {
    name: 'login',
    component: () => import('./view/login'),
    meta: {
      title: '用户登录'
    },
    children:[
        {
            path: './view/',
            component: () => import('./view/register')
        }
    ]
  },
    {
        name: 'logins',
        component: () => import('./view/logins'),
        meta: {
            title: '商户登录'
        }
    },
    {
        name: 'loginss',
        component: () => import('./view/loginss'),
        meta: {
            title: '服务站登录'
        },
        children:[
            {
                path: './view/',
                component: () => import('./view/registers')
            }
        ]
    },
  {
    name: 'register',
    component: () => import('./view/register'),
    meta: {
      title: '注册用户'
    }
  },
    {
        name: 'registers',
        component: () => import('./view/registers'),
        meta: {
            title: '注册服务站'
        }
    },
  {
      name: 'personal',
      component: () => import('./view/personal'),
      meta: {
          title: '志愿者中心',
          requireAuth: true
      }
  },
    {
        name: 'sign',
        component: () => import('./view/sign'),
        meta: {
            title: '志愿者登记'
        }
    },
    {
        name: 'station',
        component: () => import('./view/station'),
        meta: {
            title: '服务站'
        }
    },
    {
        name: 'servelist',
        component: () => import('./view/servelist'),
        meta: {
            title: '活动列表'
        }
    },
    {
        name: 'commodity',
        component: () => import('./view/commodityList'),
        meta: {
            title: '商品兑换'
        }
    },
    {
        name: 'commodityDetails',
        component: () => import('./view/commDetails'),
        meta: {
            title: '商品详情'
        }
    },
    {
        name: 'suc',
        component: () => import('./view/success'),
        meta: {
            title: '订单成功'
        }
    },
    {
        name: 'qr',
        component: () => import('./view/qrCode'),
        meta: {
            title: '订单二维码'
        }
    },
    {
        name: 'smenu',
        component: () => import('./view/confirmation'),
        meta: {
            title: '确认订单'
        }
    },
    {
        name: 'service',
        component: () => import('./view/cusServe'),
        meta: {
            title: '商户中心'
        }
    },
    {
        name: 'merchat',
        component: () => import('./view/merchat'),
        meta: {
            title: '商户详情'
        }
    },
    {
        name: 'find',
        component: () => import('./view/inquiries'),
        meta: {
            title: '兑换查询'
        }
    },
    {
        name: 'release',
        component: () => import('./view/release'),
        meta: {
            title: '发布活动'
        }
    },
    {
        name: 'act',
        component: () => import('./view/actdetails'),
        meta: {
            title: '活动详情'
        }
    },
    {
        name: 'rank',
        component: () => import('./view/ranking'),
        meta: {
            title: '积分排行榜'
        }
    },
    {
        name: 'map',
        component: () => import('./view/map'),
        meta: {
            title: '爱心商户'
        }
    },
    {
        name: 'order',
        component: () => import('./view/order'),
        meta: {
            title: '我的订单'
        }
    },
    {
        name: 'set',
        component: () => import('./view/setmsg'),
        meta: {
            title: '设置'
        }
    },
    {
        name: 'setout',
        component: () => import('./view/personalCenter'),
        meta: {
            title: '个人资料'
        }
    },
    {
        name: 'change',
        component: () => import('./view/change'),
        meta: {
            title: '确认修改'
        }
    },
    {
        name: 'about',
        component: () => import('./view/about'),
        meta: {
            title: '关于我们'
        }
    },
    {
        name: 'loginsuc',
        component: () => import('./view/loginSuc'),
        meta: {
            title: '成功弹窗'
        }
    },
    {
        name: 'scsave',
        component: () => import('./view/scavenging/'),
        meta: {
            title: '确认兑换'
        }
    },
    {
        name: 'nav',
        component: () => import('./view/nav/'),
        meta: {
            title: '商户导航'
        }
    }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({
    // mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
    /*拦截器
    *如果页面需要登录那么进入本次判断
    * 如果不需要登录则不进入逻辑
     */
    // if(to.matched.some(res=> res.meta.requireAuth)){
    //     /*如果判断有登录那么就继续执行没有登录则进入登录页面*/
    //     if (localStorage.getItem('token')){
    //         next()
    //     }else {
    //         next({
    //             path: '/login',
    //             name:'login',
    //             query: {redirect: to.fullPath}
    //         })
    //     }
    // }else {
    //     next()
    // }
});

export {
  router
};
