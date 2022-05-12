import React from 'react'

const Home = () => {

    return (
        <div className='wrapper'>
        <section className="page-header container">
        <div className="page-header__inner">
            <div className="page-header__column page-header__column--1">
                <div className="page-header__title">
                    <h1>Welcome to <br></br>BudgetApp!</h1>
                </div>
                <div className="page-header__text">
                    <p>Do you find it difficult to keep track of your personal finances? Would you like to easily read the status of your personal finances, and get a simple and fast overview of your income, expenses and remaining budget? Then BudgetApp is just the right application for you! </p>
                    <p>BudgetApp has the ability to track your remaining budget, and keep track on savings for one (or several) objectives. Longing for a vacation to Bahamas, or to by a car? Get motivated with BudgetApp!</p>
                </div>
            </div>

            <div className="page-header__column page-header__column--2">
                {/* <img src="https://twentyfivesquares.com/wp-content/uploads/2020/09/best-money-and-budget-apps.jpg" /> */}
            </div>
        </div>
        </section>
        </div>
    )
}

export default Home
