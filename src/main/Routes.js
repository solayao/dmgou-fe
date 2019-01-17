import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import createAsyncComponent from '../components/DizzyComponents/AsyncComponent';
import RouteConfig from './RouteConfig';
import LoadingComponent from '@dizzy/LoadingComponent';
import ErrorBoundary from '@dizzy/ErrorBoundary';

/** 异步控件 */
const AsyncNotFound = createAsyncComponent('NotFound');

/**
 *  对外抛出路由跳转方法
 **/
export default ({ childProps }) => (
    <ErrorBoundary>
        <Suspense fallback={<LoadingComponent></LoadingComponent>}>
            <Switch>
                {
                Object.values(RouteConfig).map(obj => {
                    const { C, isAuth, noAuthTo, ...rest } = obj;
                    const cProp = {
                        isAuth: isAuth && isAuth(childProps.location),
                        noAuthTo,
                        isPhone: childProps.isPhone,
                    };
                    return <C {...rest} props={cProp} key={rest.path} />;
                })
                }

                {/* Finally, catch all unmatched routes */}
                <Route component={() => <AsyncNotFound />} />
            </Switch>
        </Suspense>
    </ErrorBoundary>
);
