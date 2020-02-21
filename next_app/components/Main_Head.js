import Head from "next/head";
import {connect} from 'react-redux'


import React from 'react';
class Main_Head extends React.Component{
  constructor(props) {
    super(props);
    this.state={}
  }

  componentDidMount(){

  
  }
  render(){

    return(
      <Head>

    
   <link rel="icon" href="/static/img/favicon.png" type="image/x-icon" />
   <meta charSet="utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
   <meta name="description" content="" />
   <meta name="author" content="" />
 
   <title>Next App</title>

   <link rel="stylesheet" href="/static/css/bootstrap.css" />

   <link href="/static/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />

   <link rel='stylesheet' type='text/css' href='/static/css/nprogress.css' />


   <link rel="stylesheet" href="/static/css/css.css" />
 

 
 
   </Head>
    )
  }
}
function mapStateToProps (state) {
  const { locals } = state
  return {...locals}
}
export default connect(mapStateToProps)(Main_Head)


