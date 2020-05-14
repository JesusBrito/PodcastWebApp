import React, {Fragment} from 'react'
import Link from "next/link";


const HeaderApp = () => {
    return (
        <Fragment>
            <header> <Link href="/"><a className='title'>Podcasts</a></Link></header>
            <style jsx>{`
              header {
                color: #fff;
                background: #8756ca;
                padding: 15px;
                text-align: center;
              }
              
              .title{
                color: #fff;
                text-decoration: none;
              }
              
        `}</style>

            <style jsx global>{`
                body {
                  margin: 0;
                  font-family: system-ui;
                  background: #eeeeee;
                }
              `}</style>
        </Fragment>
    );
};


export default HeaderApp