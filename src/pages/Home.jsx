import React from 'react'

const Home = () => {

    return (
        <section className="page-header container">
        <div className="page-header__inner">
            <div className="page-header__column page-header__column--1">
                <div className="page-header__title">
                    <h1>Välkommen till<br></br>Budget appen!</h1>
                </div>
                <div className="page-header__text">
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                </div>
            </div>

            <div className="page-header__column page-header__column--2">
                <img src="https://twentyfivesquares.com/wp-content/uploads/2020/09/best-money-and-budget-apps.jpg" />
            </div>
        </div>
        </section>
    )
}

export default Home
