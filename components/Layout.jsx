import React, {Fragment} from 'react'
import HeaderApp from "./header";
import Head from "next/head";

const Layout = ({title, children}) => {
    return(
        <Fragment>
            <Head>
                <title>{`${title}`}</title>
            </Head>
            <HeaderApp/>
            {children}
        </Fragment>
    );
};

export default Layout