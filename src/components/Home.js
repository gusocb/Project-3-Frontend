import React, { Fragment } from 'react'

const Home = props => {
    return(
        <Fragment>
        <div className='hero is-link is-medium'>
            <div className="hero-body is-medium" id='home-hero-body'>
                <div className="container has-text-centered">
                    <h1 className="title">
                        Grow your retail faster with Kwik-E POS software
                    </h1>
                    <h2 className="subtitle">
                        Kwik-E POS is a leading retail POS software in the cloud with everything you need to run & grow your business.
                    </h2>
                </div>
            </div>
        </div>

        <div className='hero' id='hero-home-body'>
        <div class="box cta">
            <p class="has-text-centered">
                <span class="tag is-primary">Feature</span> User roles for differents tasks.
            </p>
        </div>
        
        <section className='container'>
            <div className="columns features">
                <div className="column is-4">
                    <div className="card is-shady" id='home-card'>
                        <div className="card-image has-text-centered" id='home-card-image'>
                            <img src='https://images.ctfassets.net/txhaodyqr481/IZHRO10qVci6pUdKOm31A/99ed7d74c8f7221becf37e016071ca39/shutterstock_687139360.jpg?fm=jpg&fl=progressive' id='home-card-img'/>
                        </div>
                        <div className="card-content">
                            <div className="content">
                                <h4>Controll your sales</h4>
                                <p> Barcode implementation, organizing your products have never been easier.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-4">
                    <div className="card is-shady" id='home-card'>
                        <div className="card-image has-text-centered" id='home-card-image'>
                            <img src='https://h7f7z2r7.stackpathcdn.com/sites/default/files/images/articles/blakcstonemain.jpg' id='home-card-img'/>
                        </div>
                        <div className="card-content">
                            <div className="content">
                                <h4> Manage your inventory </h4>
                                <p>Mantain your stock updated in real time.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-4">
                    <div className="card is-shady" id='home-card'>
                        <div className="card-image has-text-centered" id='home-card-image'>
                            <img src='https://cdn.aarp.net/content/dam/aarp/home-and-family/family-and-friends/2015-04/1140-Personal-Finance-101-esp.imgcache.revb75b936630f806a6f5a20e0e781f9873.jpg' id='home-card-img'/>
                        </div>
                        <div className="card-content">
                            <div className="content">
                                <h4> Keep track of your income </h4>
                                <p>Generate daily reports of all your sales.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="intro column is-8 is-offset-2" id='cfr'>
                    <h2 className="title">Perfect POS software for most retail stores</h2><br/>
                    <p className="subtitle">Kwik-E POS is perfect for .</p>
                </div>
        </section>
        </div>
        </Fragment>
    )
}

export default Home;